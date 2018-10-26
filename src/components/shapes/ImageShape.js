import React from 'react';
import ComponentShape from "./ComponentShape";


class ImageShape extends ComponentShape{
    init(){
        
        this.defineProperty("图片路径","img_src","Image","hello");
        super.init();
    }

    renderShape(){
        return <img src={this.propertys.img_src} style={{ width: '100%' }} />;
    }
}

export default ImageShape;