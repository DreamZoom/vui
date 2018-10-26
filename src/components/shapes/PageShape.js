import React from 'react';
import Shape from './Shape';

class PageShape extends Shape {
	init() {
		this.defineProperty('背景色', 'backgroundColor', 'Color', '#fff');
		this.defineProperty('背景图片', 'backgroundImage', 'Image', '');
	}

	render() {
		return (
			<div className="ui-shape-page" style={{ ...this.propertys }}>
				{this.components.map((item,i) => {
					item.key=i;
					return item.render();
				})}
			</div>
		);
	}
}

export default PageShape;
