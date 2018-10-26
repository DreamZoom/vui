import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Tree, Button, Modal, message } from 'antd';

import UIGrid from './components/UIGrid';
import DragBox from './components/DragBox';

import ShapeCreator from "../src/components/shapes/ShapeCreator";

import './UIEditor.css';
import './Shape.css';

class UIEditor extends React.Component {
	state = {
		count: 0,
		showgrid: false
	};

	getActivePage() {
		var page = this.props.page;
		return page;
	}

	getActiveComponent() {
		var active_page = this.getActivePage();
		if (!active_page) return;

		var components = active_page.components || [];
		var index =active_page.active_component_index= active_page.active_component_index || 0;
		if (index >= components.length) {
			console.warn('数组越界');
			return;
		}

		return components[index];
	}

	getSelectedComponents(){
		const selecteds = [];
		var active_page = this.getActivePage();
		if (!active_page) return selecteds;

		var components = active_page.components || [];
		components.map((item)=>{ if(item.selected) return selecteds.push(item); });
		
		return selecteds;
	}

	onSizeChange(e,component) {
		var active_page = this.getActivePage();

		if (!component) return;
		component.propertys = {
			...component.propertys,
			...e
		};

		if (this.props.onChange) {
			this.props.onChange(active_page);
		}
	}

	onComponentAppend(type) {
		var page = this.getActivePage();

		if (!page) return;
		var shape =ShapeCreator.create(type);

        console.log(shape);
		page.components.push(shape);


		if (this.props.onChange) {
			this.props.onChange(page);
		}
	}

	onPageRefresh(){
		var page = this.getActivePage();
		if (!page) return;
		if (this.props.onChange) {
			this.props.onChange(page);
		}
	}

	onPageClick(page) {
		if (!page) return;
		page.active_component_index = -1;

		const components =page.components||[];
		console.log(components);

		components.map((item)=>{item.selected=false;});

		if (this.props.onChange) {
			this.props.onChange(page);
		}
	}


	renderPage() {
		var page = this.getActivePage();
		if (!page) return <div style={{textAlign:"center",fontSize:24}}>请选择页面或添加页面</div>;
		var components = page.components || [];
		
		var active_component = this.getActiveComponent();

		var rect = { left: 0, top: 0, width: 0, height: 0 };
		if (active_component) {
			let { left, top, width, height } = active_component.propertys;
			rect = { ...rect, left, top, width, height };
		}

		var rects = components.map((c) => {
			let { left, top, width, height } = c.propertys;
			return { ...rect, left, top, width, height };
		});
		rects.push({
			left: 0,
			top: 0,
			width: 480,
			height: 729
		});


		return (
			<div
				className="vui-page"
				onMouseUp={()=>{this.onPageRefresh()}}

				onMouseDown={(e) => {
					console.log(2)
					this.onPageClick(page);
				}}
			>
				{this.state.showgrid ? <UIGrid rect={rect} rects={rects} /> : ''}

				{page.render()}
				
			</div>
		);
	}

	renderDragBox() {
		const components = this.getSelectedComponents();
		return components.map((component,i)=>{
			return (
				<DragBox key={i}
					onDragStart={() => {
						this.setState({ showgrid: true });
					}}
					onDragEnd={() => {
						this.setState({ showgrid: false });
					}}
					onChange={(e) => {
						this.onSizeChange(e,component);
					}}
					propertys={{ ...component.propertys }}
				/>
			);
		});
	}

	render() {
		
		return (
			<div className="editor-page ">
				<div className="editor-actions">
					<div
						className="editor-action-item"
						onClick={() => {
							this.onComponentAppend('Text');
						}}
					>
                        <Icon type="form" theme="outlined" style={{ fontSize: 18 }}/>
					</div>
                    <div
						className="editor-action-item"
						onClick={() => {
							this.onComponentAppend('Image');
						}}
					>
                        <Icon type="picture" theme="outlined" style={{ fontSize: 18 }}/>
					</div>

                    <div
						className="editor-action-item"
						onClick={() => {
							this.onComponentAppend('Chart');
						}}
					>
                        <Icon type="area-chart" theme="outlined" style={{ fontSize: 18 }}/>
					</div>

				</div>
				{this.renderPage()}
				{this.renderDragBox()}

				<div className="editor-tools">
					<div
						className="editor-tool-item"
						onClick={() => {
							this.onPreviewPageAnimation();
						}}
					>
						<Icon type="play-circle-o" style={{ fontSize: 18 }} />
					</div>
					<div
						className="editor-tool-item"
						onClick={() => {
							this.onPreviewPageAnimation();
						}}
					>
						<Icon type="rollback" style={{ fontSize: 18 }} />
					</div>
					<div
						className="editor-tool-item"
						onClick={() => {
							this.onPreviewPageAnimation();
						}}
					>
						<Icon type="retweet" style={{ fontSize: 18 }} />
					</div>
					<div
						className="editor-tool-item"
						onClick={() => {
							this.onPreviewPageAnimation();
						}}
					>
						<Icon type="reload" style={{ fontSize: 18 }} />
					</div>
					<div
						className="editor-tool-item"
						onClick={() => {
							this.onPreviewPageAnimation();
						}}
					>
						<Icon type="menu-unfold" style={{ fontSize: 18 }} />
					</div>
				</div>
			</div>
		);
	}
}
export default UIEditor;
