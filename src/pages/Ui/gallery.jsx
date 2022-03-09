import { useState } from 'react';
import { Card, Col, Row, Modal } from 'antd';
import "./../../style/card.less"

const Gallery = () => {
    let [visible, setVisible] = useState(false)
    let [imgsrc, setImgsrc] = useState("")
    const imgs = [
        ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
        ['7.png', '8.png', '9.png', '10.png', '11.png', '12.png'],
        ['13.png', '14.png', '15.png', '16.png', '17.png', '18.png'],
        ['19.png', '20.png', '21.png', '22.png', '23.png', '24.png'],
    ]
    // 点击打开图片详情
    function openPic(imgSrc) {
        setImgsrc(`/gallery/${imgSrc}`);
        setVisible(true)
    }
    const imgList = imgs.map(item => item.map((item, index) =>
        <Card
            key={index}
            cover={<img src={`/gallery/${item}`} alt="" />}
            style={{ marginBottom: 10 }}
            onClick={() => openPic(item)}
        >
            <Card.Meta
                title="爱豆 Ms"
                description="明天的你会感谢今天努力的自己"
            />
        </Card>
    ))
    return (
        <div className="wrap">
            <Row gutter={5}>
                {
                    imgList.map((item, index) =>
                        <Col span={6} key={index}>{item}</Col>
                    )
                }
            </Row>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={false}
                title="爱豆"
                width={300}
                height={500}
            >
                {<img src={imgsrc} alt="" style={{ width: "100%" }} />}
            </Modal>
        </div>
    );
}

export default Gallery;