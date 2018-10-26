import React from 'react';

class UIGrid extends React.Component {
	onChange = () => {};

	turnPoint(rect) {
		var x1 = rect.left;
		var x2 = rect.left + rect.width / 2;
		var x3 = rect.left + rect.width;

		var y1 = rect.top;
		var y2 = rect.top + rect.height / 2;
		var y3 = rect.top + rect.height;

		return { x: [ x1, x2, x3 ], y: [ y1, y2, y3 ] };
    }
    
    has(arr,x){
        
       for(var i=0;i<arr.length;i++){
        if(Math.abs(arr[i]-x)<=1){
            return true;
        }
       }

        return false;
    }

	pointLines(p1, p2) {

		let a = new Set(p1.x);
		let b = p2.x;
        let x = Array.from(new Set([ ...a ].filter((x) => this.has(b,x))));
   

		let c = new Set(p1.y);
		let d = p2.y;
		let y = Array.from(new Set([ ...c ].filter((x) => this.has(d,x))));

		return { x, y };
	}

	getLines(rect, rects) {
		var point = this.turnPoint(rect);
		var x = [];
		var y = [];
		rects.map((r) => {
			var p = this.turnPoint(r);
			var line = this.pointLines(point, p);
			x = x.concat(line.x);
			y = y.concat(line.y);
		});

		x = Array.from(new Set(x));
		y = Array.from(new Set(y));
		return { x, y };
	}

	render() {
		var rect = this.props.rect||{left:0,top:0,width:0,height:0};
        var rects = this.props.rects || [];

        var rect_list = [];
        rects.map((r)=>{
            if(!(r.left==rect.left&&r.top==rect.top&&r.width==rect.width&&r.height==rect.height)){
                rect_list.push(r);
            }
        })

       
		var lines = this.getLines(rect, rect_list);

		var size = this.props.size || { width: "100%", height: "100%" };

		return (
			<div style={{ ...size }} className="ui-grid">
				{lines.x.map((x,i) => {
                    console.log(x)
                    return (
                        <div key={i} className="grid-line-x" style={{left:x}}></div>
                    )
                })}

				{lines.y.map((y,i) => {
                    return (
                        <div key={i} className="grid-line-y" style={{top:y}}></div>
                    )
                })}
			</div>
		);
	}
}
export default UIGrid;
