import { useState } from "react";
import { Card, Modal, Button } from "antd";
import "./../../style/card.less"

const Modals = () => {
    let [open, setOpen] = useState(false)
    let [footer, setFooter] = useState(false)
    let [top, setTop] = useState(false)
    let [center, setCenter] = useState(false)
    // 打开模态框
    function handleModals(type) {
        if (type === "open") setOpen(true)
        if (type === "footer") setFooter(true)
        if (type === "top") setTop(true)
        if (type === "center") setCenter(true)
    }
    // 模态框确认
    function handleOk(type) {
        if (type === "open") setOpen(false)
        if (type === "footer") setFooter(false)
        if (type === "top") setTop(false)
        if (type === "center") setCenter(false)
    }
    // 模态框取消
    function handleCancel(type) {
        if (type === "open") setOpen(false)
        if (type === "footer") setFooter(false)
        if (type === "top") setTop(false)
        if (type === "center") setCenter(false)
    }
    // 信息确认框
    function handleMessage(type) {
        Modal[type]({
            title: "爱豆 Ms",
            content: "你学会 React 了吗"
        })
    }
    return (
        <div className="wrap">
            {/* 基础模态框 */}
            <Card title="基础模态框" className="wrap">
                <Button type="primary" onClick={() => handleModals("open")}>Open</Button>
                <Button type="primary" onClick={() => handleModals("footer")}>自定义页脚</Button>
                <Button type="primary" onClick={() => handleModals("top")}>顶部20px弹框</Button>
                <Button type="primary" onClick={() => handleModals("center")}>水平垂直居中</Button>
            </Card>

            {/* 信息确认框 */}
            <Card title="信息确认框" className="wrap">
                <Button type="primary" onClick={() => handleMessage("confirm")}>confirm</Button>
                <Button type="primary" onClick={() => handleMessage("info")}>info</Button>
                <Button type="primary" onClick={() => handleMessage("success")}>success</Button>
                <Button type="primary" onClick={() => handleMessage("warning")}>warning</Button>
                <Button type="primary" onClick={() => handleMessage("error")}>error</Button>
            </Card>
            <Modal
                title="爱豆 Ms"
                visible={open}
                onOk={() => handleOk("open")}
                onCancel={() => handleCancel("open")}
            >
                欢迎学习爱豆 Ms 后台管理系统
            </Modal>
            <Modal
                title="爱豆 Ms"
                visible={footer}
                okText="好的"
                cancelText="算了"
                onOk={() => handleOk("footer")}
                onCancel={() => handleCancel("footer")}
            >
                欢迎学习爱豆 Ms 后台管理系统
            </Modal>
            <Modal
                title="爱豆 Ms"
                visible={top}
                onOk={() => handleOk("top")}
                onCancel={() => handleCancel("top")}
                style={{ top: 20 }}
            >
                欢迎学习爱豆 Ms 后台管理系统
            </Modal>
            <Modal
                title="爱豆 Ms"
                visible={center}
                onOk={() => handleOk("center")}
                onCancel={() => handleCancel("center")}
                centered
            >
                欢迎学习爱豆 Ms 后台管理系统
            </Modal>
        </div>
    );
}

export default Modals;