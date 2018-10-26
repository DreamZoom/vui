import React from 'react';
import { Carousel } from 'antd';
import './UIViewer.css';

class UIViewer extends React.Component {
	renderPages() {
		const h5 = this.props.h5;

		const pages = h5.pages || [];

		return pages.map((page,i) => {
			return <div key={i} className="page">{page.render()}</div>;
		});
	}

	render() {
		return (
			<div className="viewer">
				<Carousel vertical>{this.renderPages()}</Carousel>
			</div>
		);
	}
}
export default UIViewer;
