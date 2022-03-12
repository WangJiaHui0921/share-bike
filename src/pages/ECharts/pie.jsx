import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import "./../../style/card.less";

const Pie = () => {
    let getOptions = () => {
        return {
            title: { text: "用户骑行订单", x: "center" },
            legend: {
                orient: "vertical",
                right: 20,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            tooltip: { trigger: "item", formatter: "{a}<br/>{b}:{c}({d}%)" },
            series: [
                {
                    name: "订单量", type: "pie", data: [
                        { value: 1000, name: "周一" },
                        { value: 1200, name: "周二" },
                        { value: 2000, name: "周三" },
                        { value: 4000, name: "周四" },
                        { value: 8000, name: "周五" },
                        { value: 2000, name: "周六" },
                        { value: 5000, name: "周日" }
                    ]
                }
            ]
        }
    }
    let getOptions2 = () => {
        return {
            title: { text: "用户骑行订单", x: "center" },
            legend: {
                orient: "vertical",
                right: 20,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            tooltip: { trigger: "item", formatter: "{a}<br/>{b}:{c}({d}%)" },
            series: [
                {
                    name: "订单量", type: "pie", radius: ['40%', '70%'], data: [
                        { value: 1000, name: "周一" },
                        { value: 1200, name: "周二" },
                        { value: 2000, name: "周三" },
                        { value: 4000, name: "周四" },
                        { value: 8000, name: "周五" },
                        { value: 2000, name: "周六" },
                        { value: 5000, name: "周日" }
                    ]
                }
            ]
        }
    }
    let getOptions3 = () => {
        return {
            legend: {
                orient: "vertical",
                right: 20,
                top: 40,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            tooltip: { trigger: "item", formatter: "{a}<br/>{b}:{c}({d}%)" },
            series: [
                {
                    name: "订单量",
                    type: "pie",
                    roseType: 'area',
                    center: ['50%', '50%'],
                    radius: [50, 250],
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 1500, name: "周一" },
                        { value: 3000, name: "周二" },
                        { value: 2000, name: "周三" },
                        { value: 1900, name: "周四" },
                        { value: 2000, name: "周五" },
                        { value: 1800, name: "周六" },
                        { value: 1300, name: "周日" }
                    ]
                }
            ]
        }
    }
    return (
        <div className="wrap">
            <Card title="饼形图-基本图" className="wrap">
                <ReactECharts option={getOptions()} style={{ height: 500 }} />
            </Card>
            <Card title="饼形图-环形图" className="wrap">
                <ReactECharts option={getOptions2()} style={{ height: 500 }} />
            </Card>
            <Card title="饼形图-南丁格尔图" className="wrap">
                <ReactECharts option={getOptions3()} style={{ height: 500 }} />
            </Card>
        </div>
    );
}

export default Pie;
