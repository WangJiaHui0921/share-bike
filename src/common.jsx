import React from 'react';
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/common.less";
const Common = (props) => {
    return (
        <div >
            <Row className="simple-page">
                <Col span={24} >
                    <Header meunType="second" />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {props.children}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Footer />
                </Col>
            </Row>
        </div>
    );
}

export default Common;