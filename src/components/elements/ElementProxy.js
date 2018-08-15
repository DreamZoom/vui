import React from 'react';
import ReactEcharts from 'echarts-for-react';

class ElementProxy extends React.Component {

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

	render() {
		if (this.props.type == 'text') {
			return <span>{this.props.propertys.body}</span>;
		}
		if (this.props.type == 'image') {
			return <img src={this.props.propertys.body} style={{ width: '100%' }} />;
		}
		if (this.props.type == 'chart') {
			return (
				<ReactEcharts
					option={this.getOption()}
					style={{ width: '100%', height: '100%' }}
				/>
			);
		}

		return <div />;
	}
}
export default ElementProxy;
