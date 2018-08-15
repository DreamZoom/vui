export default {
    getBasePropertys(type){


       if(type=="image"){
           return [{
            propertyName:"body",
            propertyText:"内容",
            propertyType:"image",
        },{
            propertyName:"textAlign",
            propertyText:"对齐方式",
            propertyType:"radios",
            propertyRange:["left","center","right"]
        }];
       }

        var baseAttributes=[{
            propertyName:"body",
            propertyText:"内容"
        },{
            propertyName:"textAlign",
            propertyText:"对齐方式",
            propertyType:"radios",
            propertyRange:["left","center","right"]
        }];
        return baseAttributes;
    }
}