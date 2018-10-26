import React from 'react';
import Editor from './Editor';
import { InputNumber   } from 'antd';

class NumberEditor extends Editor{
  
    renderEditor(value,attribute){
       return (<InputNumber min={0}  value={this.props.value} onChange={(v)=>{this.onChange(v)}} />);
    }
}
export default NumberEditor;