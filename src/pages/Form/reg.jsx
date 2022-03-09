import { useState } from "react";
import { Card, Button, Checkbox, message, Form, Upload, Modal, Input, Radio, Select, InputNumber, Switch, DatePicker, TimePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./../../style/card.less";

const Reg = () => {
    let [myForm, setMyForm] = useState("");
    let [previewVisible, setPreviewVisible] = useState(false);
    let [previewImage, setPreviewImage] = useState("");
    let [previewTitle, setPreviewTitle] = useState("");
    let [fileList, setFileList] = useState([]);
    // Form 表单样式
    let formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 }
    }
    let offsetLayout = {
        wrapperCol: { offset: 4, span: 12 }
    }
    // 上传按钮
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    // 注册按钮
    let handleSubmit = () => {
        let userInfo = myForm.getFieldValue();
        message.success(`恭喜你注册成功^_^ 用户名为：${userInfo.userName} 密码为：${userInfo.password}`);
        myForm.resetFields()
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    let handleCancel = () => setPreviewVisible(false);
    let handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    let handleChange = ({ fileList }) => setFileList(fileList);
    return (
        <div className="wrap">
            <Card title="注册表单" className="wrap">
                <Form ref={c => setMyForm(c)} {...formItemLayout}>
                    <Form.Item
                        name="userName"
                        label='用户名'
                        rules={[
                            { required: true, message: "用户名不能为空" },
                            { min: 6, max: 16, message: "用户名长度应为6-16个字符" }
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item name='password' label='密码' >
                        <Input placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item name="gender" label='性别' initialValue={`0`}>
                        <Radio.Group>
                            <Radio value="0">男</Radio>
                            <Radio value="1">女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name='age' label='年龄' initialValue={`18`}>
                        <InputNumber min={18} max={60} />
                    </Form.Item>
                    <Form.Item name="state" label='当前状态' initialValue={`1`}>
                        <Select>
                            <Select.Option value='1'>清华才子</Select.Option>
                            <Select.Option value='2'>北大才子</Select.Option>
                            <Select.Option value='3'>风华浪子</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="interest" label="爱好" initialValue={[`1`, `2`]}>
                        <Select mode='multiple'>
                            <Select.Option value='1'>唱歌</Select.Option>
                            <Select.Option value='2'>跳舞</Select.Option>
                            <Select.Option value='3'>健身</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="isMarried" label="是否已婚" valuePropName="checked">
                        <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item name="birthday" label="生日">
                        <DatePicker
                            placeholder="请选择生日"
                        />
                    </Form.Item>
                    <Form.Item name="address" label="地址" initialValue={`河北省秦皇岛市海港区`}>
                        <Input.TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.Item name="time" label="早起时间" >
                        <TimePicker placeholder="请选择时间" />
                    </Form.Item>
                    <Form.Item name="userImg" label="头像" >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        {...offsetLayout}
                        name="remember"
                        valuePropName="checked"
                        initialValue={`checked`}
                    >
                        <Checkbox >
                            我已阅读过
                            <a href="###">爱豆网协议</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...offsetLayout}>
                        <Button type='primary' onClick={handleSubmit} >注册</Button>
                    </Form.Item>

                </Form>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Card>
        </div>
    );
}

export default Reg;