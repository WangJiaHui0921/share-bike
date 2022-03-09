import { useEffect, useState } from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "./../../axios";
import Utils from "./../../utils"
import "./../../style/card.less";

const Basic = () => {

    useEffect(() => {
        requestList()
    }, [])

    let [dataSourceOne, setDataSourceOne] = useState([]);
    let [selectedRowKeys, setSelectedRowKeys] = useState([]);
    let [selectedItem, setSelectedItem] = useState({});
    let [pagination, setPagination] = useState([]);

    // 默认页码
    let params = {
        page: 1
    }

    // 基础表格数据
    const dataSource = [
        {
            id: 1,
            userName: "赵四",
            gender: 1,
            state: "1",
            hobby: "1",
            birthday: "1985-01-20",
            address: "秦皇岛市海港区",
            time: "05:20"
        },
        {
            id: 2,
            userName: "刘能",
            gender: 1,
            state: "2",
            hobby: "2",
            birthday: "1979-05-20",
            address: "秦皇岛市海港区",
            time: "05:20"
        },
        {
            id: 3,
            userName: "谢广坤",
            gender: 1,
            state: "3",
            hobby: "3",
            birthday: "1988-02-22",
            address: "秦皇岛市海港区",
            time: "05:20"
        }
    ]
    dataSource.map(item => {
        item.key = item.id;
        return item;
    })
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            align: "center"
        },
        {
            title: "用户名",
            dataIndex: "userName",
            align: "center"
        },
        {
            title: "性别",
            dataIndex: "gender",
            align: "center",
            render(gender) {
                return gender === 1 ? "男" : "女";
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
            dataIndex: "hobby",
            align: "center",
            render(hobby) {
                let config = {
                    "1": "唱歌",
                    "2": "跳舞",
                    "3": "健身"
                }
                return config[hobby]
            }
        },
        {
            title: "生日",
            dataIndex: "birthday",
            align: "center"
        },
        {
            title: "地址",
            dataIndex: "address",
            align: "center"
        },
        {
            title: "早起时间",
            dataIndex: "time",
            align: "center"
        }
    ]

    // 数据获取
    let requestList = () => {
        axios.ajax({
            url: "/table/list",
            data: {
                params: {
                    page: params.page
                }
            }
        }).then(res => {
            if (res.code === 0) {
                setDataSourceOne(res.result.list.map(item => {
                    item.key = item.id;
                    return item;
                }));
                setPagination(Utils.pagination(res, current => {
                    params.page = current;
                    requestList()
                }))
            }

        })
    }

    // 单击行
    let onRowClick = (record) => {
        let selectedKey = [record.id];
        setSelectedRowKeys(selectedKey);
        setSelectedItem(record)
        Modal.info({
            title: "信息",
            content: `用户名:${record.userName}   ID:${record.id} `
        })
    }

    // 删除事件
    let handleDelete = () => {
        let id = selectedRowKeys;
        if (id.length === 0) return Modal.error({ title: "提示信息", content: "请选择一条数据" });
        Modal.confirm({
            title: "提示信息",
            content: `你确定要删除 ID 为 ${id} 的数据吗？`,
            onOk: () => {
                message.success(`删除成功`)
                requestList()
                setSelectedRowKeys([])
            }
        })

    }
    return (
        <div className="wrap">
            <Card title="基础表格" className="wrap">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    pagination={false}
                />
            </Card>
            <Card title="动态 Mock 渲染表格" className="wrap">
                <Table
                    dataSource={dataSourceOne}
                    columns={columns}
                    bordered
                    pagination={false}
                />
            </Card>
            <Card title="动态 Mock 渲染表格 - 单选" className="wrap">
                <Table
                    dataSource={dataSourceOne}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowSelection={{ type: "radio", selectedRowKeys, selectedItem }}
                    onRow={record => {
                        return {
                            onClick: () => onRowClick(record)
                        }
                    }
                    }
                />
            </Card>
            <Card title="动态 Mock 渲染表格 - 复选" className="wrap">
                <div>
                    <Button onClick={handleDelete} style={{ marginBottom: 10 }}>删除</Button>
                </div>
                <Table
                    dataSource={dataSourceOne}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowSelection={{
                        type: "checkbox",
                        selectedRowKeys,
                        onChange: selectedRowKeys => {
                            setSelectedRowKeys(selectedRowKeys)
                        }
                    }}
                />
            </Card>
            <Card title="分页" className="wrap">
                <Table
                    dataSource={dataSourceOne}
                    columns={columns}
                    bordered
                    pagination={pagination}
                />
            </Card>
        </div>
    );
}

export default Basic;