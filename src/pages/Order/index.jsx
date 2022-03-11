import { useState, useEffect } from "react";
import { Card, Select, Form, Button, Modal, message, Table, DatePicker } from "antd";
import Axios from "./../../axios";
import Utils from "../../utils";
import "./../../style/card.less";


const Order = () => {
    // state 状态
    let [queryForm, setQueryForm] = useState({})
    let [dataSource, setDataSource] = useState([])
    let [pagination, setPagination] = useState([])
    let [selectedItem, setSelectedItem] = useState({})
    let [selectedRowKeys, setSelectedRowKeys] = useState("")
    let [visible, setVisible] = useState(false)
    let [orderInfo, setOrderInfo] = useState("")

    // Form 样式
    let formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
    }

    // 表格数据
    const columns = [{
        title: '订单编号',
        dataIndex: "order_sn",
        align: "center"
    }, {
        title: '车辆编号',
        dataIndex: "bike_sn",
        align: "center"
    }, {
        title: '用户名',
        dataIndex: "user_name",
        align: "center"
    }, {
        title: '手机号',
        dataIndex: "mobile",
        align: "center"
    }, {
        title: '里程',
        dataIndex: "distance",
        align: "center",
        render(distance) {
            return distance / 1000 + "KM"
        }
    }, {
        title: '行驶时长',
        dataIndex: "total_time",
        align: "center"
    }, {
        title: '状态',
        dataIndex: "status",
        align: "center",
        render(status) {
            return status === 1 ? "进行中" : "结束行程"
        }
    }, {
        title: '开始时间',
        dataIndex: "start_time",
        align: "center"
    }, {
        title: '结束时间',
        dataIndex: "end_time",
        align: "center"
    }, {
        title: '订单金额',
        dataIndex: "total_fee",
        align: "center"
    }, {
        title: '实付金额',
        dataIndex: "user_pay",
        align: "center"
    }]

    // 分页数据
    let params = {
        page: 1
    }

    // 副作用
    useEffect(() => {
        requestList()
    }, [])

    // 请求数据
    let requestList = () => {
        Axios.ajax({
            url: "/order/list",
            data: {
                params: {
                    page: params.page
                }
            }
        }).then(res => {
            setDataSource(res.result.item_list.map(item => {
                item.key = item.id;
                return item;
            }));
            setPagination(Utils.pagination(res, current => {
                params.page = current;
                requestList();
            }));
        })
    }

    // 查询功能

    let handleQuery = () => {
        let userInfo = queryForm.getFieldValue();
        Axios.ajax({
            url: "/city/query",
            data: {
                params: userInfo
            }
        }).then(res => {
            message.success(res.msg)
        })
    }

    // 重置功能
    let handleReset = () => {
        queryForm.resetFields()
    }

    // 单击行功能
    let onRowClick = record => {
        let selectedKey = [record.id];
        setSelectedItem(record);
        setSelectedRowKeys(selectedKey)
    }

    // 结束订单功能
    let handleFinish = () => {
        if (!selectedItem.id) return Modal.info({ title: "提示信息", content: "请选择一条信息" })
        Axios.ajax({
            url: "/order/ebike_info",
            data: {
                params: {
                    orderId: selectedItem.id
                }
            }
        }).then(res => {
            setOrderInfo(res.result)
        })
        setVisible(true)
    }


    // 结束订单提交
    let handleSubmit = () => {
        Axios.ajax({
            url: "/order/finish_order",
            data: {
                params: {
                    orderId: selectedItem.id
                }
            }
        }).then(res => {
            message.success(res.result);
            setVisible(false);
            requestList()
            setSelectedRowKeys([])
            setSelectedItem([])
        })
    }

    // 订单详情功能
    let handleOpenDetail = () => {
        if (!selectedItem.id) return Modal.info({ title: "提示信息", content: "请选择一条订单" })
        window.open(`/common/order/detail/${selectedItem.id}`)
    }

    return (
        <div className="wrap">
            <Card className="wrap">
                <Form layout="inline" ref={c => setQueryForm(c)}>
                    <Form.Item name="city" label="城市" initialValue={`1`} >
                        <Select style={{ width: 100 }}>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">北京市</Select.Option>
                            <Select.Option value="2">上海市</Select.Option>
                            <Select.Option value="3">天津市</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="start_time" label="订单时间">
                        <DatePicker placeholder="选择开始时间" />
                    </Form.Item>
                    <Form.Item name="end_time" >
                        <DatePicker placeholder="选择结束时间" />
                    </Form.Item>
                    <Form.Item name="state" label="订单状态" initialValue={`1`}>
                        <Select style={{ width: 120 }}>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">进行中</Select.Option>
                            <Select.Option value="2">结束行程</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" onClick={handleQuery}>查询</Button>
                    <Button onClick={handleReset}>重置</Button>
                </Form>
            </Card>
            <Card>
                <Button type="primary" onClick={handleOpenDetail}>订单详情</Button>
                <Button type="primary" onClick={handleFinish}>结束订单</Button>
            </Card>
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                rowSelection={{ type: "radio", selectedRowKeys }}
                onRow={record => {
                    return {
                        onClick: () => { onRowClick(record) }
                    }
                }}
            />
            <Modal
                title="结束订单"
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={handleSubmit}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="车辆编号">
                        {orderInfo.bike_sn}
                    </Form.Item>
                    <Form.Item label="剩余电量">
                        {orderInfo.battery}
                    </Form.Item>
                    <Form.Item label="行程开始时间">
                        {orderInfo.start_time}
                    </Form.Item>
                    <Form.Item label="当前位置">
                        {orderInfo.location}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Order;