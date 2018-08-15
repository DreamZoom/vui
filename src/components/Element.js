import React from 'react';
import animationController from "../utils/animation"
import ElementProxy from "./elements/ElementProxy";

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
            <div className="vui-component"  style={{...component.propertys}} data-preview-animation={animationJson} data-animation-list={animationListJson} onClick={this.onClick}>
                 <ElementProxy {...component} />
            </div>
        )
    }
}
export default Element;