import { useState } from "react";
import { Card, Form, Input, Button, message, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import "./../../style/card.less";

const Login = () => {
    let [myForm, setMyForm] = useState("")
    let [myFormOne, setMyFormOne] = useState("")
    // 表单登录
    let handleLogin = (type) => {
        if (type === "one") {
            let userInfo = myForm.getFieldValue();
            if (userInfo.userName === undefined || userInfo.password === undefined)
                return message.error(`用户名或密码不能为空`);
            message.success(`登录成功 ^_^ 用户名为：${userInfo.userName} 密码为：${userInfo.password}`)
        } else {
            let userInfo = myFormOne.getFieldValue();
            if (userInfo.userName === undefined || userInfo.password === undefined)
                return message.error(`用户名或密码不能为空`);
            message.success(`登录成功 ^_^ 用户名为：${userInfo.userName} 密码为：${userInfo.password}`)
        }
    }
    return (
        <div className="wrap">
            <Card title="登录行内表单" className="wrap">
                <Form layout="inline" ref={c => setMyForm(c)}>
                    <Form.Item name="userName">
                        <Input type="text" placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input type="password" placeholder="请输入密码" />
                    </Form.Item>
                    <Button type="primary" onClick={() => handleLogin("one")}>登录</Button>
                </Form>
            </Card>
            <Card title="水平表单登录" className="wrap">
                <Form style={{ width: 250 }} ref={c => setMyFormOne(c)}>
                    <Form.Item
                        name="userName"
                        rules={[
                            { required: true, message: '用户名不能为空!' },
                            { max: 10, min: 5, message: "长度不在范围内" }
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="请输入用户名"
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input
                            type="password"
                            placeholder="请输入密码"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember"
                            valuePropName="checked"
                            initialValue={`checked`}
                            noStyle
                        >
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>
                        <a href="###" style={{ marginLeft: 100 }}>
                            忘记密码
                        </a>
                    </Form.Item>
                    <Button type="primary" onClick={() => handleLogin("two")}>登录</Button>
                </Form>
            </Card>
        </div >
    );
}

export default Login;