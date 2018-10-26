import React from 'react';
import Shape from './Shape';
import Element from '../../components/Element';

class ComponentShape extends Shape {
	
    
    renderShape(){

    }

	render() {
		return (
			<div key={this.key} data-shape="component" data-key={this.key} onMouseDown={(e)=>{this.selected=true;e.stopPropagation();console.log(1)}} className="ui-shape-component" style={{ ...this.propertys }}>
				{this.renderShape()}
			</div>
		);
	}
}

export default ComponentShape;
