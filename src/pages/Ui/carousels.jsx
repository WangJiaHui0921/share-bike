
import { Carousel, Card } from "antd";
import "./../../style/card.less";

const Carousels = () => {
    // 轮播图样式
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const imgStyle = {
        width: '100%',
        height: '300px',
    };
    return (
        <div className="wrap">
            <Card title="文字轮播图" className="wrap">
                <Carousel >
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Card>
            <Card title="图片轮播图" className="wrap">
                <Carousel autoPlay>
                    <div >
                        <img style={imgStyle} src="/carousel-img/carousel-1.jpg" alt="" />
                    </div>
                    <div >
                        <img style={imgStyle} src="/carousel-img/carousel-2.jpg" alt="" />
                    </div>
                    <div>
                        <img style={imgStyle} src="/carousel-img/carousel-3.jpg" alt="" />
                    </div>
                </Carousel>

            </Card>
        </div>
    );
}

export default Carousels;