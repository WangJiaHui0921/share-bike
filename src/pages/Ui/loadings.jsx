import { Card, Spin, Space, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "./../../style/card.less";

const Loadings = () => {
    return (
        <div className="wrap">
            {/* Spin 用法 */}
            <Card title="Spin 用法" className="wrap">
                <Space size="middle">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={<LoadingOutlined />} />
                </Space>
            </Card>

            <Card title="内容遮罩" className="wrap">
                <Alert
                    message="爱豆 Ms "
                    description="欢迎来到爱豆 Ms 后台管理系统"
                />
                <Spin>
                    <Alert
                        message="爱豆 Ms "
                        description="欢迎来到爱豆 Ms 后台管理系统"
                    />
                </Spin>
                <Spin tip="Loading...">
                    <Alert
                        message="爱豆 Ms "
                        description="欢迎来到爱豆 Ms 后台管理系统"
                    />
                </Spin>
                <Spin indicator={<LoadingOutlined />}>
                    <Alert
                        message="爱豆 Ms "
                        description="欢迎来到爱豆 Ms 后台管理系统"
                    />
                </Spin>
            </Card>
        </div>
    );
}

export default Loadings;