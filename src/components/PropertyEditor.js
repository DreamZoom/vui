import React from 'react';
import { Input,InputNumber ,Radio,Select ,Popover,Button ,Upload,Icon   } from 'antd';
import { SketchPicker  } from 'react-color';


const RadioGroup = Radio.Group;
const Option = Select.Option;
class PropertyEditor extends React.Component{
    onChange=(v)=>{
        console.log(v);

        if(this.props.onPropertyChange){
            this.props.onPropertyChange(v,this.props.propertyName)
        }
        
    }


    renderRadios(ranges){
        if(!ranges) return;
        return (
            <RadioGroup onChange={(e)=>{this.onChange(e.target.value)}} value={this.props.value}>
                {
                    ranges.map((item,i)=>{
                        return(<Radio key={i} value={item}>{item}</Radio>
                            
                        );
                    })
                }
            </RadioGroup>
        );
    }

    renderSelects(ranges){
        if(!ranges) return;
        return (
            <Select style={{ width: 120 }}  onChange={(e)=>{this.onChange(e)}} value={this.props.value}>
                {
                    ranges.map((item,i)=>{
                        return(
                            <Option  key={i} value={item}>{item}</Option >
                        );
                    })
                }
            </Select >
        );
    }

    handleUpload(file){
        console.log(file)

        return new Promise(()=>{

        });
    }

    render(){

        var editor_jsx =(<Input placeholder={this.props.propertyName} value={this.props.value} onChange={(e)=>{this.onChange(e.target.value)}} />);

        if(this.props.propertyType=="selects"){
            editor_jsx=this.props.propertyRange?this.renderSelects(this.props.propertyRange):"";
            
        }

        if(this.props.propertyType=="radios"){
           editor_jsx=this.props.propertyRange?this.renderRadios(this.props.propertyRange):"";
        }

        if(this.props.propertyType=="color"){
            editor_jsx =(
                <Popover placement="topLeft" title={"颜色选择"} content={<SketchPicker  color={ this.props.value } onChangeComplete={ (color)=>{this.onChange(color.hex)} } />} trigger="click">
                    <div style={{backgroundColor:this.props.value,width:15,height:15,padding:"5px",border:"1px solid #888"}}></div>
                </Popover>
            );
           
        }


        if(this.props.propertyType=="number"){
            editor_jsx =<InputNumber min={0}  value={this.props.value} onChange={(v)=>{this.onChange(v)}} />;
        }

        if(this.props.propertyType=="image"){
            editor_jsx =(
                <Upload action={(file)=>{ this.handleUpload(file)}}>
                    <Button>
                        <Icon type="upload" /> 点击上传
                    </Button>
                </Upload>);
        }

        return(
            <div className="property-editor">
                <div className="property-editor-label">{this.props.propertyText}</div>
                <div className="property-editor-body">{editor_jsx}</div>               
            </div>
        )
    }
}
export default PropertyEditor;