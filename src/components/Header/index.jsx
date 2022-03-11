import React, { useState, useEffect } from 'react';
import { Row, Col } from "antd";
import moment from "moment";
import axios from 'axios';
import "./index.less"
const Header = (props) => {
    let [time, setTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
    let [name, setName] = useState("爱豆")
    let [weather, setWeather] = useState({})
    setTimeout(() => {
        setTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    }, 1000);

    // 副作用
    useEffect(() => {
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=62b40aa8f04f48f2bd1a227ece7af879").then((response) => {
            setWeather(response.data.now)
        })
    }, [])
    return (
        <div className="header">
            <Row className="header-top">
                {
                    props.meunType ? <Col span={6} className="logo">
                        <img src="/assets/logo-ant.svg" alt="" />
                        <span>爱豆 Ms</span>
                    </Col> : ""
                }

                <Col span={props.meunType ? 18 : 24}>
                    <span>你好,{name}</span>
                    <a href="###">退出</a>
                </Col>
            </Row>
            {
                props.meunType ? "" : <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="title">{time}</span>
                        < span className="weather-detail" >{weather.text} {weather.windDir}</span>
                    </Col>
                </Row>
            }
        </div>
    );
}

export default Header;