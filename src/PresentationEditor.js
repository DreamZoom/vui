import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Tabs, Button, Modal, message } from 'antd';

import ShapeCreator from '../src/components/shapes/ShapeCreator';
import PropertyPanel from './components/PropertyPanel';

import animationController from './utils/animation';
import UIEditor from './UIEditor';
import UIViewer from './UIViewer';

import './PresentationEditor.css';

const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;
class editor extends React.Component {
	state = {
		h5: {
			title: '未命名',
			pages: [],
			active_page_index: -1
		},
		preview:false
	};

	componentDidMount() {}

	renderPageList() {
		if (!this.state.h5) return;
		var pages = this.state.h5.pages || [];

		return pages.map((item, i) => {
			var activeClass = i == this.state.h5.active_page_index ? 'page-item-active' : '';
			return (
				<div
					key={i}
					className={'page-item ' + activeClass}
					onClick={() => {
						this.onPageActive(i, item);
					}}
				>
					<div className="page-item-index">
						<span>{i + 1}</span>
					</div>
					<div>
						<div className="page-item-thumbnail">
							<img src={item.thumbnail} style={{ width: '100%' }} />{' '}
						</div>
					</div>
					<div
						className="page-item-remove"
						onClick={() => {
							this.onPageRemove(i, item);
						}}
					>
						<span>
							<Icon type="close" />
						</span>
					</div>
				</div>
			);
		});
	}

	renderActivePage() {
		var page = this.getActivePage();
		return (
			<UIEditor
				page={page}
				onChange={() => {
					this.doRefresh();
				}}
			/>
		);
	}

	onPageAdd() {
		if (!this.state.h5) return;
		var pages = this.state.h5.pages || [];

		var page = ShapeCreator.create('Page');
		pages.push(page);

		this.state.h5.pages = pages;
		this.state.h5.active_page_index = pages.length - 1;
		this.setState({
			h5: { ...this.state.h5 }
		});
	}

	onPageRemove(i, page) {
		if (!this.state.h5) return;
		var pages = this.state.h5.pages || [];
		if (i >= pages.length) {
			console.warn('数组越界');
			return;
		}

		confirm({
			title: '警告',
			content: '确定要删除此页么？删除后不可恢复！',
			onOk: () => {
				pages.splice(i, 1);
				if (i <= this.state.h5.active_page_index) --this.state.h5.active_page_index;

				this.setState({
					h5: { ...this.state.h5 }
				});
			}
		});
	}

	onPageActive(i, page) {
		if (!this.state.h5) return;
		var pages = this.state.h5.pages || [];
		if (i >= pages.length) {
			console.warn('数组越界');
			return;
		}
		this.state.h5.active_page_index = i;
		this.setState({
			h5: { ...this.state.h5 }
		});
	}

	getActivePage() {
		if (!this.state.h5) return;
		var pages = this.state.h5.pages || [];
		var index = this.state.h5.active_page_index;
		if (index >= pages.length) {
			console.warn('数组越界');
			return;
		}

		return pages[index];
	}

	getActiveComponent() {
		var active_page = this.getActivePage();
		if (!active_page) return;

		var components = active_page.components || [];
		var index = active_page.active_component_index || 0;
		if (index >= components.length) {
			console.warn('数组越界');
			return;
		}

		return components[index];
	}

	onPropertyChange(component) {
		var active_component = this.getActiveComponent();
		if (!active_component) return;

		this.setState({
			h5: { ...this.state.h5 }
		});
	}

	onPageChang(page) {
		this.setState({
			h5: { ...this.state.h5 }
		});
	}

	onPreviewAnimation(animation) {
		console.log(animation);
		var active_component = this.getActiveComponent();
		if (!active_component) return;

		animationController.previewAnimation(animation);
	}

	onPreviewPageAnimation() {
		setTimeout(() => {
			animationController.previewPageAnimation();
		}, 10);
	}

	onH5Save() {
		var user = service.getUserInfo();
		var id = this.props.match.params.id;
		service.getH5(id).then((o) => {
			o.h5 = { ...this.state.h5 };
			service.saveH5(o).then((res) => {
				console.log(res);
				message.info('已保存');
			});
		});
	}

	doRefresh() {
		this.setState({
			h5: { ...this.state.h5 }
		});
	}

	render() {
		var page_list_render = this.renderPageList();

		var active_page_render = this.renderActivePage();

		var active_page = this.getActivePage();
		var active_component = this.getActiveComponent();

		return (
			<Layout className="layout-page">
				<Header className="header">
					<div className="header-logo">Presentation Builder</div>
					<div className="header-actions" />
					<div className="header-menu-right">
						<Button type="primary" onClick={()=>{this.setState({preview:true})}}>
							预览
						</Button>
						<Button
							type="primary"
							onClick={() => {
								
							}}
						>
							保存
						</Button>
					</div>
				</Header>
				<Content className="layout-main-wapper">
					<Layout className="layout-main">
						<Sider width={300} className="layout-sider">
							<div className="page-list">
								{page_list_render}
								<div
									className="page-item page-item-add"
									onClick={() => {
										this.onPageAdd();
									}}
								>
									<Icon type="plus" style={{ fontSize: 30, color: '#08c' }} />
								</div>
							</div>
						</Sider>
						<Content>
							<div className="editor-main">
								<div className="editor-page-wapper">{active_page_render}</div>
								<div className="editor-property-panel">
									<PropertyPanel
										page={active_page}
										onChange={() => {
											this.doRefresh();
										}}
									/>
								</div>
							</div>
						</Content>
					</Layout>

					<Modal
						title="预览"
						style={{ top: 20}}
						footer={null}
						width={480}
						bodyStyle={{padding:0}}
						visible={this.state.preview}
						onOk={()=>{this.setState({preview:false})}}
						onCancel={()=>{this.setState({preview:false})}}
					>
						<UIViewer h5={this.state.h5}></UIViewer>
					</Modal>
				</Content>
			</Layout>
		);
	}
}

export default editor;
