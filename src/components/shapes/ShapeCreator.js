import Text from "./TextShape";
import Image from "./ImageShape";
import Chart from "./ChartShape";
import Page from "./PageShape";

const shapes={
    Page,
    Text,
    Image,
    Chart
}


export default{
    create(type){
       return new shapes[type];
    }
}