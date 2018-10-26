import React from 'react';
import ComponentShape from "./ComponentShape";


class TextShape extends ComponentShape{
    init(){
        
        this.defineProperty("文本","text","String","hello");
        this.defineProperty("行高","lineHeight","Number","auto");
        super.init();
    }

    renderShape(){
        return (<span>{this.propertys.text}</span>);
    }
}

export default TextShape;