import React, { useEffect, useState } from 'react';
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import MenuConfig from "./../../config/menuConfig";
import "./index.less"

const NavLeft = () => {
    // 解构 Menu
    let { Item } = Menu;

    const [renderMenu, setRenderMenu] = useState([])

    useEffect(() => {
        let menuTreeNode = renderMenu(MenuConfig)
        setRenderMenu(menuTreeNode)
        // 菜单渲染
        function renderMenu(data) {
            return data.map(item => {
                if (item.children) {
                    return <Menu.SubMenu title={item.title} key={item.key}>
                        {renderMenu(item.children)}
                    </Menu.SubMenu>
                } else {
                    return <Item key={item.key}>
                        <NavLink to={item.key}>{item.title}</NavLink>
                    </Item>
                }
            })
        }
    }, [])

    return (
        <div>
            <div className="logo">
                <img src="/assets/logo-ant.svg" alt="" />
                <h1>爱豆 Ms</h1>
            </div>
            <Menu
                theme={`dark`}
            >
                {renderMenu}
            </Menu>
        </div >
    );
}

export default NavLeft;