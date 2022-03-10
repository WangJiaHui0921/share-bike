import { useEffect, useState } from "react";
import { Card, Table, Button, Form, Select, message, Modal } from "antd";
import Axios from "./../../axios";
import Utils from "./../../utils"
import "./../../style/card.less";

const City = () => {
    let [dataSource, setDataSource] = useState([])
    let [pagination, setPagination] = useState([])
    let [myForm, setMyForm] = useState({})
    let [myFormOpenCity, setMyFormOpenCity] = useState({})
    let [visible, setVisible] = useState(false)

    const columns = [{
        title: "城市ID",
        dataIndex: "id",
        align: "center"
    }, {
        title: "城市名称",
        dataIndex: "name",
        align: "center"
    }, {
        title: "用车模式",
        dataIndex: "mode",
        align: "center",
        render(mode) {
            return mode === 1 ? '指定停车点模式' : '禁停区模式'
        }
    }, {
        title: "营运模式",
        dataIndex: "op_mode",
        align: "center",
        render(op_mode) {
            return op_mode === 1 ? '自营' : '加盟'
        }
    }, {
        title: "授权加盟商",
        dataIndex: "franchisee_name",
        align: "center"
    }, {
        title: "城市管理员",
        dataIndex: "city_admins",
        align: "center",
        render(arr) {
            return arr.map(item => {
                return item.user_name
            }).join(',');
        }
    }, {
        title: "城市开通时间",
        dataIndex: "open_time",
        align: "center"
    }, {
        title: "操作时间",
        dataIndex: "update_time",
        align: "center"
    }, {
        title: "操作人",
        dataIndex: "sys_user_name",
        align: "center"
    }]
    let params = {
        page: 1
    }
    useEffect(() => {
        requestList()
    }, [])
    let requestList = () => {
        Axios.ajax({
            url: "/open_city",
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
                requestList()
            }))
        })
    }
    let formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 10
        }
    }
    // 查询功能
    let handleQuery = () => {
        let userInfo = myForm.getFieldValue()
        Axios.ajax({
            url: "/city/query",
            data: {
                params: userInfo
            }
        }).then(res => {
            message.success(`${res.msg}`)
        })
    }

    // 重置功能
    let handleReset = () => {
        myForm.resetFields()
    }

    // 开通城市按钮
    let handleOpenCity = () => {
        setVisible(true)
    }

    // 开通城市提交
    let handleSubmit = () => {
        let userInfo = myFormOpenCity.getFieldValue();
        Axios.ajax({
            url: "/city/open",
            data: {
                params: userInfo
            }
        }).then(res => {
            message.success(`${res.result}`);
            setVisible(false);
            requestList()
        })
    }
    return (
        <div className="wrap">
            <Card className="wrap">
                <Form layout="inline" ref={c => setMyForm(c)}>
                    <Form.Item name="city" label="城市" initialValue={`1`}>
                        <Select style={{ width: 100 }}>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">北京市</Select.Option>
                            <Select.Option value="2">上海市</Select.Option>
                            <Select.Option value="3">天津市</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="mode" label="用车模式" initialValue={`0`}>
                        <Select style={{ width: 150 }}>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">指定停车点模式</Select.Option>
                            <Select.Option value="2">禁停区模式</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="op_mode" label="营运模式" initialValue={`0`}>
                        <Select style={{ width: 100 }}>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">自营</Select.Option>
                            <Select.Option value="2">加盟</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="auth_status" label="加盟商授权状态" initialValue={`0`}>
                        <Select style={{ width: 100 }}>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">已授权</Select.Option>
                            <Select.Option value="2">未授权</Select.Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" onClick={handleQuery}>查询</Button>
                    <Button type="primary" onClick={handleReset}>重置</Button>
                </Form>
            </Card>
            <Card>
                <Button type="primary" onClick={handleOpenCity}>开通城市</Button>
            </Card>
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
            />
            <Modal
                title="开通城市"
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={handleSubmit}
            >
                <Form {...formItemLayout} ref={c => setMyFormOpenCity(c)}>
                    <Form.Item name="city_id" label="选择城市" initialValue={`1`}>
                        <Select>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">北京市</Select.Option>
                            <Select.Option value="2">上海市</Select.Option>
                            <Select.Option value="3">天津市</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="op_mode" label="营运模式" initialValue={`1`}>
                        <Select>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">自营</Select.Option>
                            <Select.Option value="2">加盟</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="use_mode" label="用车模式" initialValue={`1`}>
                        <Select>
                            <Select.Option value="0">全部</Select.Option>
                            <Select.Option value="1">指定停车点</Select.Option>
                            <Select.Option value="2">禁停区</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default City;