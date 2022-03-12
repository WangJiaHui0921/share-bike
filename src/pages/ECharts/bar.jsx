import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import "./../../style/card.less";

const Bar = () => {
    // 柱形图1
    let getOption = () => {
        return {
            title: { text: "用户骑行订单" },
            tooltip: { trigger: "axis" },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [1000, 1300, 800, 500, 1500, 1800, 1700],
                    type: 'bar'
                }
            ]
        };
    }
    let getOption2 = () => {
        return {
            title: { text: "用户骑行订单" },
            tooltip: { trigger: "axis" },
            legend: { data: ["OFO", "小蓝", "摩拜"] },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [1000, 1300, 800, 500, 1500, 1800, 1700],
                    type: 'bar',
                    name: "OFO"
                },
                {
                    data: [800, 1100, 500, 2000, 1500, 2500, 2300],
                    type: 'bar',
                    name: "小蓝"
                },
                {
                    data: [1200, 1300, 800, 1900, 1700, 2300, 2000],
                    type: 'bar',
                    name: "摩拜"
                }
            ]
        };
    }
    return (
        <div className="wrap">
            <Card title="柱形图" className="wrap" >
                <ReactECharts option={getOption()} style={{ height: 500 }} />
            </Card>
            <Card title="柱形图2" className="wrap">
                <ReactECharts option={getOption2()} style={{ height: 500 }} />
            </Card>
        </div>
    );
}

export default Bar;