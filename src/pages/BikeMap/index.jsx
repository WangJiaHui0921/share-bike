import { useEffect, useRef } from "react";
import { Card, Button, Select, DatePicker, Form } from "antd";
import "./../../style/card.less";

const BikeMap = () => {
    let myRef = useRef(null)


    // 副作用
    useEffect(() => {
        renderMap()
    })

    // 地图渲染
    let renderMap = () => {
        let map = new window.BMapGL.Map("container");          // 创建地图实例 
        let point = new window.BMapGL.Point(116.404, 39.915);  // 创建点坐标 
        map.centerAndZoom(point, 15);// 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    }

    // 查询功能
    let handleQuery = () => {
        console.log(myRef);
        renderMap()
    }
    return (
        <div className="wrap">
            <Card className="wrap">
                <Form layout="inline" ref={myRef}>
                    <Form.Item name="city" label="城市" initialValue={1}>
                        <Select>
                            <Select.Option value={0}>全部</Select.Option>
                            <Select.Option value={1}>北京市</Select.Option>
                            <Select.Option value={2}>上海市</Select.Option>
                            <Select.Option value={3}>天津市</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="start_time" label="订单时间">
                        <DatePicker placeholder="请选择开始时间" />
                    </Form.Item>
                    <Form.Item name="end_time">
                        <DatePicker placeholder="请选择结束时间" />
                    </Form.Item>
                    <Form.Item name="state" initialValue={1} label="状态">
                        <Select>
                            <Select.Option value={0}>全部</Select.Option>
                            <Select.Option value={1}>进行中</Select.Option>
                            <Select.Option value={2}>行程结束</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" onClick={handleQuery} >查询</Button>
                    <Button>重置</Button>
                </Form>
            </Card>
            <Card>
                <h4>共1314520辆</h4>
                <div id="container" style={{ height: 500 }}></div>
            </Card>
        </div>
    );
}

export default BikeMap;