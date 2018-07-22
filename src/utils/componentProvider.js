import React from 'react';
import Carousel from "../components/Carousel"
import Empty from "../components/Empty"


export default {

    getMapData(){
        return {
            "carousel":Carousel
        }
    },

    getComponent(type){
        var matedata=this.getMapData();
        if(matedata[type]){
            return matedata[type];
        }
        return Empty;
    }
}