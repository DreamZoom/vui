import React from 'react';
import { Tabs, Table } from 'antd';
import PropertyEditor from './PropertyEditor';
import AnimationEditor from './AnimationEditor';
import PropertysProvider from '../utils/PropertysProvider';

import EditorFactory from './editors/EditorFactory';
const TabPane = Tabs.TabPane;

class PropertyGrid extends React.Component {
	handleChange(value, name) {
		console.log(value);
		if (!this.props.propertys) {
			return;
		}
		this.props.propertys[name] = value;
		if (this.props.onChange) {
			this.props.onChange(this.props.propertys);
		}
	}

	render() {
		var attributes = this.props.attributes;

		var data = [];
		attributes.map((item, i) => {
			data.push({
				key: i,
				name: item.propertyText,
				value: this.props.propertys[item.propertyName],
				attribute: item
			});
		});

		const columns = [
			{
				title: '属性',
				dataIndex: 'name'
			},
			{
				title: '值',
				dataIndex: 'value',
				render: (value, record) => {
					var Editor = EditorFactory.create(record.attribute, value);
					return (
						<div>
							<Editor
								onChange={(v) => {
									this.handleChange(v, record.attribute.propertyName);
								}}
								value={value}
								attribute={record.attribute}
							/>
						</div>
					);
				}
			}
		];

		return <Table size={'small'} pagination={false} dataSource={data} columns={columns} />;
	}
}
export default PropertyGrid;
