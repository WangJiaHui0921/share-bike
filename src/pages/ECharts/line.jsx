import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import "./../../style/card.less";

const Line = () => {
    let getOptions = () => {
        return {
            title: { text: "用户骑行订单", x: "center" },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        }
    }
    let getOptions2 = () => {
        return {
            title: { text: "用户骑行订单", x: "center", marginBottom: 20 },
            tooltip: { trigger: "axis" },
            legend: { data: ["OFO订单量", "摩拜订单量"], top: 30 },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                    name: "OFO订单量"
                },
                {
                    data: [222, 333, 444, 555, 432, 349, 666],
                    type: 'line',
                    name: "摩拜订单量"
                }
            ]
        }
    }
    let getOptions3 = () => {
        return {
            title: { text: "用户骑行订单", x: "center", marginBottom: 20 },
            tooltip: { trigger: "axis" },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                boundaryGap: false,
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [222, 333, 444, 555, 432, 349, 666],
                    type: 'line',
                    areaStyle: {}
                }
            ]
        }
    }
    return (
        <div className="wrap">
            <Card title="折线图1" className="wrap">
                <ReactECharts option={getOptions()} style={{ height: 500 }} />
            </Card>
            <Card title="折线图2" className="wrap">
                <ReactECharts option={getOptions2()} style={{ height: 500 }} />
            </Card>
            <Card title="折线图3" className="wrap">
                <ReactECharts option={getOptions3()} style={{ height: 500 }} />
            </Card>
        </div>
    );
}

export default Line;