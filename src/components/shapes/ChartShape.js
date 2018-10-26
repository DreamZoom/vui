import React from 'react';
import ComponentShape from "./ComponentShape";
import ReactEcharts from "echarts-for-react";

class ChartShape extends ComponentShape{

    getOption(){
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    }

    init(){
        
        
        super.init();
    }

    renderShape(){
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{ width: '100%', height: '100%' }}
            />
        );
    }
}

export default ChartShape;