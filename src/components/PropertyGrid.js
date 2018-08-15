import React from 'react';
import { Tabs } from 'antd';
import PropertyEditor from './PropertyEditor';
import AnimationEditor from './AnimationEditor';
import PropertysProvider from '../utils/PropertysProvider';
const TabPane = Tabs.TabPane;

class PropertyGrid extends React.Component{
    onPropertyChange=(value,name)=>{
        if(this.props.component && this.props.component.propertys){
            this.props.component.propertys[name]=value;
            if(this.props.onChange){
                this.props.onChange(this.props.component);
            }
        }
    }

    onAnimationChange(animations){
        if(this.props.component && this.props.component.animations){
            this.props.component.animations=animations;
            if(this.props.onChange){
                this.props.onChange(this.props.component);
            }
        }
    }

    onPreviewAnimation(animation){
        if(this.props.onPreviewAnimation){
            this.props.onPreviewAnimation(animation);
        }
    }

    renderEditors(attributes){
        attributes = attributes||[];

        if(!(this.props.component && this.props.component.propertys)) return(<div>请选择元素编辑</div>);


        return attributes.map((item,i)=>{
            return(
                <div key={i}>
                    <PropertyEditor {...item} value={this.props.component.propertys[item.propertyName]} onPropertyChange={this.onPropertyChange} />
                </div>
            );
        });
    }

    renderAnimationsEditor(){
        if(!(this.props.component && this.props.component.animations)) return(<div>请选择元素编辑</div>);
        return(
            <AnimationEditor animations={this.props.component.animations} onChange={(a)=>{this.onAnimationChange(a)}} onPreviewAnimation={(e)=>{this.onPreviewAnimation(e)}} />
        );
    }

    render(){

        var baseAttributes=PropertysProvider.getBasePropertys(this.props.component.type);

        var styleAttributes=[{
            propertyName:"left",
            propertyText:"横坐标",
            propertyType:"number"
        },{
            propertyName:"top",
            propertyText:"纵坐标",
            propertyType:"number"
        },{
            propertyName:"width",
            propertyText:"宽度",
            propertyType:"number"
        },{
            propertyName:"height",
            propertyText:"高度",
            propertyType:"number"
        },{
            propertyName:"backgroundColor",
            propertyText:"背景色",
            propertyType:"color"
        },{
            propertyName:"padding",
            propertyText:"内边距",
            propertyType:"number"
        },{
            propertyName:"margin",
            propertyText:"外边距",
            propertyType:"number"
        }];
        

        return(
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="编辑" key="1"><div className="property-panel">{this.renderEditors(baseAttributes)}</div></TabPane>
                <TabPane tab="外观" key="2"><div className="property-panel">{this.renderEditors(styleAttributes)}</div></TabPane>
                <TabPane tab="动画" key="3"><div className="property-panel">{this.renderAnimationsEditor()}</div></TabPane>             
            </Tabs>
        )
    }
}
export default PropertyGrid;