import React from 'react';
import Editor from './Editor';
import { Popover } from 'antd';
import { SketchPicker } from 'react-color';

class ColorEditor extends Editor {
	renderEditor(value, attribute) {
		return (
			<Popover
				placement="topLeft"
				title={'颜色选择'}
				content={
					<SketchPicker
						color={this.props.value}
						onChangeComplete={(color) => {
							this.onChange(color.hex);
						}}
					/>
				}
				trigger="click"
			>
				<div
					style={{
						backgroundColor: this.props.value,
						width: 15,
						height: 15,
						padding: '5px',
						border: '1px solid #888'
					}}
				/>
			</Popover>
		);
	}
}
export default ColorEditor;
