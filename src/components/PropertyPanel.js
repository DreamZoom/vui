import React from 'react';
import { Tabs } from 'antd';
import PropertysProvider from '../utils/PropertysProvider';
import PropertyGrid from './PropertyGrid';
import AnimationEditor from './AnimationEditor';
const TabPane = Tabs.TabPane;
class PropertyPanel extends React.Component {
	onChange = () => {
		if (this.props.onChange) {
			this.props.onChange(this.props.page);
		}
	};

	getActivePage() {
		var page = this.props.page;
		return page;
	}

	getActiveComponent() {
		var active_page = this.getActivePage();
		if (!active_page) return;

		var components = active_page.components || [];
		var index = (active_page.active_component_index = active_page.active_component_index || 0);
		if (index >= components.length) {
			console.warn('数组越界');
			return;
		}

		return components[index];
	}

	render() {
		var pageAttributes = PropertysProvider.getPagePropertys();
		var styleAttributes = PropertysProvider.getElementPropertys();

		var page = this.getActivePage();
		if (page && !page.propertys) {
			page.propertys = {};
		}

		var element = this.getActiveComponent();

		return (
			<Tabs defaultActiveKey="1" type="card">
				<TabPane tab="页面" key="1">
					{page ? (
						<PropertyGrid propertys={page.propertys} attributes={page.attributes} onChange={this.onChange} />
					) : (
						''
					)}
				</TabPane>
				<TabPane tab="编辑" key="2">
					{element ? (
						<PropertyGrid
							propertys={element.propertys}
							attributes={element.attributes}
							onChange={this.onChange}
						/>
					) : (
						''
					)}
				</TabPane>
				<TabPane tab="动画" key="4">
					{element ? <AnimationEditor animations={element.animations} onChange={this.onChange} /> : ''}
				</TabPane>
			</Tabs>
		);
	}
}
export default PropertyPanel;
