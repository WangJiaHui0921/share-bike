import { Card, Button, notification } from 'antd';
import "./../../style/card.less";

const Notifications = () => {

    // 通知提醒框
    function handleNotification(type, position) {
        if (type) {
            notification[type]({
                message: '工资表',
                description:
                    '本月工资 18000 元',
            });
        }
        if (type && position) {
            notification.config({
                placement: position,
                bottom: 50,
                duration: 3,
                rtl: true,
            });
        }
    }
    return (
        <div className="wrap">
            {/* 通知提醒框 */}
            <Card title="通知提醒框" className="wrap">
                <Button type="primary" onClick={() => handleNotification("success")}>Succcess</Button>
                <Button type="primary" onClick={() => handleNotification("info")}>Info</Button>
                <Button type="primary" onClick={() => handleNotification("warning")}>Warning</Button>
                <Button type="primary" onClick={() => handleNotification("error")}>Error</Button>
            </Card>

            {/* 通知提醒框(修改弹出位置) */}
            <Card title="通知提醒框(修改位置)" className="wrap">
                <Button type="primary" onClick={() => handleNotification("success", "topLeft")}>topLeft</Button>
                <Button type="primary" onClick={() => handleNotification("info", "topRight")}>topRight</Button>
                <Button type="primary" onClick={() => handleNotification("warning", "bottomLeft")}>bottomLeft</Button>
                <Button type="primary" onClick={() => handleNotification("error", "bottomRight")}>bottomRight</Button>
            </Card>
        </div>
    );
}

export default Notifications;