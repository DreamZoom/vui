import React from 'react';
import Editor from './Editor';
import { Input   } from 'antd';

class TextEditor extends Editor{
  
    renderEditor(value,attribute){
       return (<Input placeholder={attribute.propertyName} value={value} onChange={(e)=>{this.onChange(e.target.value)}} />);
    }
}
export default TextEditor;