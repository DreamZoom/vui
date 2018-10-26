import React from 'react';
import animationController from "../utils/animation"

class Element extends React.Component{
    onClick=(e)=>{
        if(this.props.onClick){
            this.props.onClick(e);
        }
    }

    parseAnimationPropertys(animation){
        if(!animation) return;
        return {
            ...animation,
            animationDelay:animation.animationDelay+"s",
            animationDuration:animation.animationDuration+"s",
        }
    }

    render(){

        if(!this.props.component) return;
        
        var component = this.props.component;
        var animation = this.parseAnimationPropertys(component.previewAnimation);
        var animationJson = "";
        if(animation){
            animationJson =animationController.serialize(animation);
        }

        var animation_list = component.animations;
        var animationListJson = animationController.serialize(animation_list);

        return(
            <div className="vui-component" data-active={this.props.active} style={{...component.propertys}} data-preview-animation={animationJson} data-animation-list={animationListJson} onClick={this.onClick}>
                 {component.render()}
            </div>
        )
    }
}
export default Element;