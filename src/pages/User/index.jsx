import { useState, useEffect } from 'react';
import { Card, Button, Form, Input, DatePicker, Table, message, Modal, Radio, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import "./../../style/card.less";
import Axios from "./../../axios";
import Utils from "./../../utils";

const User = () => {
    // state 状态
    let [dataSource, setDataSource] = useState([])
    let [pagination, setPagination] = useState()
    let [queryForm, setQueryForm] = useState()
    let [selectedItem, setSelectedItem] = useState({})
    let [selectedRowKeys, setSelectedRowKeys] = useState("")
    let [visible, setVisible] = useState(false)
    let [myForm, setMyForm] = useState("")
    let [title, setTitle] = useState("")
    let [type, setType] = useState("")

    // 页码
    let params = { page: 1 }

    // 字典
    let getState = state => {
        return {
            "1": "清华才子",
            "2": "北大才子",
            "3": "风华浪子"
        }[state]
    }

    // Form 样式
    let formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
    }

    // Table Columns 数据
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center"
        },
        {
            title: "用户名",
            dataIndex: "username",
            align: "center"
        },
        {
            title: "性别",
            dataIndex: "sex",
            align: "center",
            render(sex) {
                return sex === 1 ? "男" : "女"
            }
        },
        {
            title: "状态",
            dataIndex: "state",
            align: "center",
            render(state) {
                let config = {
                    "1": "清华才子",
                    "2": "北大才子",
                    "3": "风华浪子"
                }
                return config[state]
            }
        },
        {
            title: "爱好",
            dataIndex: "interest",
            align: "center",
            render(interest) {
                let config = {
                    "1": "唱歌",
                    "2": "跳舞",
                    "3": "健身"
                }
                return config[interest]
            }
        },
        {
            title: "婚否",
            dataIndex: "isMarried",
            align: "center",
            render(isMarried) {
                return isMarried === 1 ? "未婚" : "已婚"
            }
        },
        {
            title: "生日",
            dataIndex: "birthday",
            align: "center"
        },
        {
            title: "联系地址",
            dataIndex: "address",
            align: "center"
        },
        {
            title: "早起时间",
            dataIndex: "time",
            align: "center"
        }
    ]

    // 副作用
    useEffect(() => {
        requestList()
    }, [])

    // 获取数据
    let requestList = () => {
        Axios.ajax({
            url: "/user/list",
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
            setPagination(Utils.pagination(res.result, current => {
                params.page = current;
                requestList()
            }))
        })
    }

    // 查询功能
    let handleQuery = () => {
        let userInfo = queryForm.getFieldValue();
        Axios.ajax({
            url: "/user/query",
            data: {
                params: userInfo
            }
        }).then(res => {
            message.success(res.result)
        })
    }

    // 重置功能
    let handleReset = () => {
        queryForm.resetFields();
    }

    // 单击行选中
    let onRowClick = record => {
        setSelectedItem(record);
        setSelectedRowKeys([record.id])
    }

    // 增删改查判断
    let handleClick = (type) => {
        switch (type) {
            case "create":
                setTitle("创建员工");
                setType("create");
                setVisible(true);
                break;
            case "edit":
                setTitle("编辑员工");
                setType("edit");
                if (!selectedItem.id) return Modal.info({ title: "提示信息", content: "请选择一条信息" });
                setVisible(true);
                break;
            case "detail":
                setTitle("员工详情");
                setType("detail");
                if (!selectedItem.id) return Modal.info({ title: "提示信息", content: "请选择一条信息" });
                setVisible(true);
                break;
            case "delete":
                if (!selectedItem.id) return Modal.info({ title: "提示信息", content: "请选择一条信息" });
                Modal.confirm({
                    title: "删除员工",
                    content: "是否要删除当前选中的员工",
                    onOk: () => handleDelete(selectedItem.id)
                })
            default: return;
        }
    }

    // Modal footer
    let footer = {}
    if (type === "detail") footer = { footer: null }

    // 删除员工提交
    let handleDelete = id => {
        Axios.ajax({
            url: "/user/delete",
            data: {
                params: {
                    orderId: id
                }
            }
        }).then(res => {
            message.success(res.msg)
            requestList()
            setSelectedRowKeys([])
            setSelectedItem({})
        })
    }

    // 创建员工提交
    let handleSubmit = (type) => {
        let userInfo = myForm.getFieldValue()
        if (type === "create") {
            Axios.ajax({
                url: "/user/add",
                data: {
                    params: userInfo
                }
            }).then(res => {
                message.success(res.msg);
                setVisible(false);
                myForm.resetFields();
            })
        } else {
            message.success(`编辑成功`)
            requestList()
            setVisible(false);
            setSelectedItem({});
            setSelectedRowKeys("")
        }
    }

    return (
        <div className="wrap">
            <Card className="wrap">
                <Form layout="inline" ref={c => setQueryForm(c)} >
                    <Form.Item name="userName" label="用户名">
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item name="mobile" >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item name="date" label="请选择入职时间">
                        <DatePicker placeholder='选择日期' />
                    </Form.Item>
                    <Button type="primary" onClick={handleQuery}>查询</Button>
                    <Button onClick={handleReset}>重置</Button>
                </Form>
            </Card>
            <Card>
                <Button type="primary" onClick={() => handleClick("create")}><PlusOutlined />创建员工</Button>
                <Button type="primary" onClick={() => handleClick("edit")}><EditOutlined />编辑员工</Button>
                <Button type="primary" onClick={() => handleClick("detail")}>员工详情</Button>
                <Button type="primary" onClick={() => handleClick("delete")}><DeleteOutlined />删除员工</Button>
            </Card>
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                rowSelection={{ type: "radio", selectedRowKeys }}
                onRow={record => {
                    return {
                        onClick: () => onRowClick(record)
                    }
                }}
            />
            <Modal
                title={title}
                visible={visible}
                onCancel={() => { setVisible(false); myForm.resetFields() }}
                onOk={() => handleSubmit(type)}
                {...footer}

            >
                <Form {...formItemLayout} ref={c => setMyForm(c)}>
                    <Form.Item name="userName" label="用户名" initialValue={type === "edit" ? selectedItem.username : ""}>
                        {type === "detail" ? selectedItem.username : <Input placeholder="请输入用户名" />}
                    </Form.Item>
                    <Form.Item name="sex" label="性别" initialValue={type === "edit" ? selectedItem.sex : 1}>
                        {
                            type === "detail" ? selectedItem.sex === 1 ? "男" : "女" :
                                < Radio.Group >
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>
                        }
                    </Form.Item>
                    <Form.Item name="state" label="状态" initialValue={type === "edit" ? selectedItem.state : 1}>
                        {
                            type === "detail" ? getState(selectedItem.state) :
                                <Select>
                                    <Select.Option value={1}>清华才子</Select.Option>
                                    <Select.Option value={2}>北大才子</Select.Option>
                                    <Select.Option value={3}>风华浪子</Select.Option>
                                </Select>
                        }
                    </Form.Item>
                    <Form.Item name="birthday" label="生日" >
                        {type === "detail" ? selectedItem.birthday : <DatePicker placeholder='请选择生日' />}
                    </Form.Item>
                    <Form.Item name="address" label="地址" initialValue={type === "edit" ? selectedItem.address : "河北省秦皇岛市"}>
                        {
                            type === "detail" ? selectedItem.address : <Input.TextArea
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </div >

    );
}

export default User;