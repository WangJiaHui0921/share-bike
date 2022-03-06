import { useState } from "react";
import { Card, Button, Radio } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    SearchOutlined,
    DeleteOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import "./../../style/card.less"
const Buttons = () => {
    let [loading, setLoading] = useState(true)
    let [size, setSize] = useState("default")
    // Loading 开关
    function handleLoading(type) {
        if (type === "open") setLoading(true)
        else setLoading(false)
    }
    // 改变按钮大小
    function handleSize(e) {
        setSize(e.target.value)
    }
    return (
        <div className="wrap">
            {/* 基础按钮 */}
            <Card title="基础按钮" className="wrap">
                <Button type="primary">爱豆 Ms</Button>
                <Button>爱豆 Ms</Button>
                <Button type="dashed">爱豆 Ms</Button>
                <Button type="primary" danger>爱豆 Ms</Button>
                <Button disabled>爱豆 Ms</Button>
            </Card>

            {/* 图标按钮 */}
            <Card title="图标按钮" className="wrap">
                <Button > <PlusOutlined />创建</Button>
                <Button><EditOutlined />编辑</Button>
                <Button><DeleteOutlined />删除</Button>
                <Button><SearchOutlined /></Button>
                <Button type="primary"><SearchOutlined />搜索</Button>
                <Button type="primary"><DownloadOutlined />下载</Button>
            </Card>

            {/* Loading 按钮 */}
            <Card title="Loading 按钮" className="wrap">
                <Button type="primary" loading={loading}>确定</Button>
                <Button type="primary" loading={loading} shape="circle"></Button>
                <Button loading={loading} onClick={() => handleLoading("open")}>点击加载</Button>
                <Button loading={loading} shape="circle"></Button>
                <Button type="primary" onClick={() => handleLoading("close")}>关闭</Button>
            </Card>

            {/* 按钮组 */}
            <Card title="按钮组" className="wrap">
                <Button.Group>
                    <Button type="primary" style={{ marginRight: 0 }}><LeftOutlined />返回</Button>
                    <Button type="primary">前进<RightOutlined /></Button>
                </Button.Group>
            </Card>

            {/* 按钮尺寸 */}
            <Card title="按钮尺寸" className="wrap">
                <Radio.Group value={size} onChange={handleSize}>
                    <Radio value="small">小</Radio>
                    <Radio value="default">中</Radio>
                    <Radio value="large">大</Radio>
                    <Button type="primary" size={size}>爱豆Ms</Button>
                    <Button size={size}>爱豆Ms</Button>
                    <Button type="dashed" size={size}>爱豆Ms</Button>
                    <Button type="primary" danger size={size}>爱豆Ms</Button>
                </Radio.Group>
            </Card>
        </div>

    );
}

export default Buttons;