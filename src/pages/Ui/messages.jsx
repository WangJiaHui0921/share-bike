import { Card, Button, message } from 'antd';
import "./../../style/card.less";

const Messages = () => {
    function handleMessages(type) {
        message[type]("4月16日毕业啦")
    }
    return (
        <div className="wrap">
            <Card title="全局 Messages" className="wrap">
                <Button type="primary" onClick={() => handleMessages("success")}>Success</Button>
                <Button type="primary" onClick={() => handleMessages("info")}>Info</Button>
                <Button type="primary" onClick={() => handleMessages("loading")}>Loading</Button>
                <Button type="primary" onClick={() => handleMessages("error")}>Error</Button>
                <Button type="primary" onClick={() => handleMessages("warning")}>Warning</Button>
            </Card>
        </div>
    );
}

export default Messages;