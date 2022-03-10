import { useState, useEffect } from "react";
import { Card, Table, Badge, Button, Modal, message } from "antd";
import Axios from "./../../axios"
import "./../../style/card.less";

const High = () => {
    let [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            align: "center",
            fixed: "left"
        },
        {
            title: "用户名",
            dataIndex: "userName",
            align: "center",
            fixed: "left"
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
            title: "年龄",
            dataIndex: "age",
            align: "center",
            sorter: (a, b) => {
                return a.age - b.age
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
                    "1": <Badge status="success" text='唱歌' />,
                    "2": <Badge status="warning" text='跳舞' />,
                    "3": <Badge status="error" text='健身 ' />
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
        },
        {
            title: "操作",
            align: "center",
            render(item) {
                return <Button onClick={() => handleDelete(item)}>删除</Button>
            }
        }
    ]
    let params = {
        page: 1
    }
    useEffect(() => {
        resquestList()
    }, [])
    let resquestList = () => {
        Axios.ajax({
            url: "/table/high/list",
            data: {
                params: {
                    page: params.page
                }
            }
        }).then(res => {
            setDataSource(res.result.list)
        })
    }
    // 删除按钮
    let handleDelete = (item) => {
        Modal.confirm({
            title: "删除提示",
            content: `确定要删除用户名为${item.userName} ID为${item.id} 的数据吗`,
            onOk: () => {
                message.success(`删除成功`)
                resquestList()
            }
        })
    }
    return (
        <div className="wrap">
            <Card title="头部固定" className="wrap">
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    scroll={{ y: 300 }}
                />
            </Card>
            <Card title="左侧固定" className="wrap">
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    scroll={{ x: 1300 }}
                />
            </Card>
            <Card title="按钮操作" className="wrap">
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />

            </Card>
        </div>
    );
}

export default High;