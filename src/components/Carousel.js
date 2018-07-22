import React from "react";
import { Carousel } from "antd";

class UICarousel extends React.Component {
  onChange = () => {};

  render() {
    var images = this.props.propertys.images || [];
    console.log(images);

    return (
      <Carousel afterChange={this.onChange} autoplay>
        {images.map((item, i) => {
          return (
            <div key={i}>
              <img style={{width:"100%"}} src={item.url} />
            </div>
          );
        })}
      </Carousel>
    );
  }
}
export default UICarousel;
