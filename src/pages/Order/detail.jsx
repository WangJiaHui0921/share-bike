import { useState, useEffect } from "react";
import { Card } from "antd";
import Axios from "./../../axios";
import "./../../style/card.less";
import "./detail.less";

const Detail = (props) => {

    // state 状态
    let [userInfo, setUserInfo] = useState({})

    // 副作用
    useEffect(() => {
        let orderId = props.match.params.orderId;
        getDetailInfo(orderId);
        renderMap();
    }, [])

    // 获取数据
    let getDetailInfo = (orderId) => {
        Axios.ajax({
            url: "/order/detail",
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then(res => {
            setUserInfo(res.result)
        })
    }

    // 地图初始化
    let renderMap = () => {
        let map = new window.BMapGL.Map("orderDetailMap");
        map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);
        map.enableScrollWheelZoom(true);
    }
    return (
        <div className="wrap">
            <div id="orderDetailMap" className="order-map"></div>
            <Card style={{ margin: 40 }}>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式</div>
                            <div className="detail-form-content">
                                {userInfo.mode === 1 ? "禁停区" : "服务区"}
                            </div>
                        </li>
                        <li>
                            <div className="detail-form-left">订单编号</div>
                            <div className="detail-form-content">{userInfo.order_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">车辆编号</div>
                            <div className="detail-form-content">{userInfo.bike_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">用户姓名</div>
                            <div className="detail-form-content">{userInfo.user_name}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">手机号码</div>
                            <div className="detail-form-content">{userInfo.mobile}</div>
                        </li>
                    </ul>
                </div>
            </Card>
            <Card style={{ margin: 40 }}>
                <div id="orderDetailMap"></div>
                <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">行驶起点</div>
                            <div className="detail-form-content">{userInfo.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶终点</div>
                            <div className="detail-form-content">{userInfo.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶里程</div>
                            <div className="detail-form-content">
                                {userInfo.distance / 1000 + "KM"}
                            </div>
                        </li>
                    </ul>
                </div>
            </Card>
        </div >
    );
}

export default Detail;