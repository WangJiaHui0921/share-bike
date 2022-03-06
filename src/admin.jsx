import React from 'react';
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import "./style/common.less";
const Admin = (props) => {
    console.log(props.children);
    return (
        <div>
            <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <Row className="content">
                        {props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        </div>
    );
}

export default Admin;