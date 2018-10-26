import React from 'react';

/*
*
*
**/

class Editor extends React.Component{


    onChange=(value)=>{
        if(this.props.onChange){
            this.props.onChange(value);
        }
    }

    renderEditor(value,attribute){
        return (<div></div>)
    }

    render(){
       var editor = this.renderEditor(this.props.value,this.props.attribute);
       return (<div>{editor}</div>);
    }
}
export default Editor;