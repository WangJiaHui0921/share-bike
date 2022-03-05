import React from 'react';
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import Home from "./pages/Home"
import "./style/common.less";
const admin = () => {
    return (
        <div>
            <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <Row className="content">
                        <Home />
                    </Row>
                    <Footer />
                </Col>
            </Row>
        </div>
    );
}

export default admin;