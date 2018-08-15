import React from "react";
import ReactDOM from "react-dom";
class DragBox extends React.Component {
  onMouseDown(e) {

    var context = this;
    e = e || event;
    var dragbx = ReactDOM.findDOMNode(this.refs.dragbox);

    var distanceX = e.clientX - dragbx.offsetLeft;
    var distanceY = e.clientY - dragbx.offsetTop;

    var left = distanceX;
    var top = distanceY;

    window.onmousemove = function (e1) {
      e1 = e1 || event;
      left = e1.clientX - distanceX;
      top = e1.clientY - distanceY;
      dragbx.style.left = left + "px";
      dragbx.style.top = top + "px";

      if (context.props.onChange) {
        context.props.onChange({
          left:dragbx.offsetLeft,
          top:dragbx.offsetTop,
          width:dragbx.offsetWidth,
          height:dragbx.offsetHeight
        });
      }
    };

    window.onmouseup = function () {
      window.onmousemove = null;
      window.onmouseup = null;
      if (context.props.onChange) {
        context.props.onChange({
          left:dragbx.offsetLeft,
          top:dragbx.offsetTop,
          width:dragbx.offsetWidth,
          height:dragbx.offsetHeight
        });
      }
    };

    return false;
  }

  onMouseResize(d, e) {
    e.stopPropagation();
    var context = this;
    e = e || event;
    var dragbx = ReactDOM.findDOMNode(this.refs.dragbox);
    var distanceX = e.clientX - dragbx.offsetLeft;
    var distanceY = e.clientY - dragbx.offsetTop;
    var h = dragbx.offsetHeight;
    var w = dragbx.offsetWidth;
    var left = distanceX;
    var top = distanceY;


    var startX = e.clientX;
    var startY = e.clientY;

    var width = w;
    var height = h;

    window.onmousemove = function (e1) {
      e1 = e1 || event;
      top = e1.clientY - distanceY;
      left = e1.clientX - distanceX;

      var offsetY = e1.clientY - startY;
      var offsetX = e1.clientX - startX;

      var containx = function (d, x) {
        return d.includes(x);
      }

      if (containx(d, "n")) {
        height = h - offsetY;
        dragbx.style.top = top + "px";
        dragbx.style.height = height + "px";
      }
      if (containx(d, "s")) {
        height = h + offsetY;
        dragbx.style.height = height + "px";
      }
      if (containx(d, "w")) {
        width = w - offsetX;
        dragbx.style.left = left + "px";
        dragbx.style.width = width + "px";
      }
      if (containx(d, "e")) {
        width = w + offsetX;
        dragbx.style.width = width + "px";
      }

    };

    window.onmouseup = function () {
      window.onmousemove = null;
      window.onmouseup = null;
      if (context.props.onChange) {
        context.props.onChange({
          left:dragbx.offsetLeft,
          top:dragbx.offsetTop,
          width:dragbx.offsetWidth,
          height:dragbx.offsetHeight
        });
      }
    };

    return false;

  }

  render() {
    let {
      left= 0,
      top= 0,
      width= 200,
      height= 100
    }=this.props.propertys;

    var postion ={left,top,width,height};

    return (
      <div
        className="vui-drag-box"
        style={{ ...postion }}
        onMouseDown={e => {
          this.onMouseDown(e);
        }}
        ref="dragbox"
      >
        <div className="vui-drag-n" onMouseDown={e => { return this.onMouseResize("n", e); }}><div className="vui-drag-point" /></div>
        <div className="vui-drag-s" onMouseDown={e => { return this.onMouseResize("s", e); }}>
          <div className="vui-drag-point" />
        </div>
        <div
          className="vui-drag-e"
          onMouseDown={e => {
            return this.onMouseResize("e", e);
          }}
        >
          <div className="vui-drag-point" />
        </div>
        <div
          className="vui-drag-w"
          onMouseDown={e => {
            return this.onMouseResize("w", e);
          }}
        >
          <div className="vui-drag-point" />
        </div>

        <div
          className="vui-drag-ne"
          onMouseDown={e => {
            return this.onMouseResize("ne", e);
          }}
        >
          <div className="vui-drag-point" />
        </div>
        <div
          className="vui-drag-nw"
          onMouseDown={e => {
            return this.onMouseResize("nw", e);
          }}
        >
          <div className="vui-drag-point" />
        </div>
        <div
          className="vui-drag-se"
          onMouseDown={e => {
            return this.onMouseResize("se", e);
          }}
        >
          <div className="vui-drag-point" />
        </div>
        <div
          className="vui-drag-sw"
          onMouseDown={e => {
            return this.onMouseResize("sw", e);
          }}
        >
          <div className="vui-drag-point" />
        </div>
      </div>
    );
  }
}
export default DragBox;
