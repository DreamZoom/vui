import React from 'react';
import { Button } from 'antd';
import PropertyEditor from './PropertyEditor';
class AnimationEditor extends React.Component{
    onChange=(animation,p,v)=>{
        if(!animation) return;
        animation[p]=v;
        if(!this.props.animations) return;
        var animations = this.props.animations||[];
        if(this.props.onChange){
            this.props.onChange(animations);
        }
    }

    onPreviewAnimation(animation){
        if(this.props.onPreviewAnimation){
            this.props.onPreviewAnimation(animation);
        }
    }

    onAddAnimation(){
        if(!this.props.animations) return;

        var animations = this.props.animations||[];

        animations.push({
            animationName:"",
            animationDuration:1,
            animationDelay:0,
            animationIterationCount:1,
            animationDirection:false
        });

        if(this.props.onChange){
            this.props.onChange(animations);
        }
    }

    onRemoveAnimation(animation,i){
        if(!this.props.animations) return;

        var animations = this.props.animations||[];
        animations.splice(i,1);
        if(this.props.onChange){
            this.props.onChange(animations);
        }
    }

    renderEditors(animation,attributes){
        attributes = attributes||[];

        if(!animation) return;

        return attributes.map((item,i)=>{
            return(
                <div key={i}>
                    <PropertyEditor {...item} value={animation[item.propertyName]} onPropertyChange={(v)=>{this.onChange(animation,item.propertyName,v)}} />
                </div>
            );
        });
    }


    renderAnimations(){
        var animations = this.props.animations||[];
        var animationAttributes=[{
            propertyName:"animationName",
            propertyText:"方案",
            propertyType:"selects",
            propertyRange:["fadeIn","fadeOut","bounce","flash","pulse"]
        },{
            propertyName:"animationDuration",
            propertyText:"时长",
            propertyType:"number"
        },{
            propertyName:"animationDelay",
            propertyText:"延时",
            propertyType:"number"
        },{
            propertyName:"animationIterationCount",
            propertyText:"重复",
            propertyType:"number"
        }];

        return animations.map((item,i)=>{

            return (
                <div key={i} className="animation-item">
                    <div className="animation-item-header">动画{i+1} <div className="animation-item-tool"> <Button icon="play-circle-o" onClick={()=>{this.onPreviewAnimation(item)}}></Button><Button icon="close" onClick={()=>{this.onRemoveAnimation(item,i)}}></Button></div></div>
                    <div>
                        {this.renderEditors(item,animationAttributes)}
                    </div>
                </div>
            );
        });
    }

    render(){
        return(
            <div>
                {this.renderAnimations()}
                <div className="animation-list-actions">
                    <Button type="primary" onClick={()=>{this.onAddAnimation()}}>添加动画</Button>
                </div>              
            </div>
        )
    }
}
export default AnimationEditor;