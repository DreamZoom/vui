class Shape {

    constructor(){
        this.init();
    }

    attributes=[];

    propertys={};

    animations=[];

    components=[];

    defineProperty(propertyText,propertyName,propertyType,defaultValue){
        this.attributes.push({
            propertyText,
            propertyName,
            propertyType,
            defaultValue
        });

        this.propertys[propertyName] =defaultValue;
    }

    init(){
        this.defineProperty("横坐标","left","Number",0);
        this.defineProperty("纵坐标","top","Number",0);
        this.defineProperty("宽度","width","Number",200);
        this.defineProperty("高度","height","Number",100);
        this.defineProperty("背景色","backgroundColor","Color","#fff");
        this.defineProperty("前景色","color","Color","#000");
        this.defineProperty("内边距","padding","Number",0);
        this.defineProperty("外边距","margin","Number",0);
    }


    render(){
        
    }

}

export default Shape;