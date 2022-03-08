import { useState } from 'react';
import { Card, Tabs, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./../../style/card.less";

const UiTabs = () => {

    const { TabPane } = Tabs;

    // 初始化页签数据
    const initialPanes = [
        { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
        { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
        {
            title: 'Tab 3',
            content: 'Content of Tab 3',
            key: '3',
            closable: false,
        },
    ];
    // let [panes, setPanes] = useState(initialPanes)
    let [panes] = useState(initialPanes)
    let [activeKey, setActiveKey] = useState(initialPanes[0].key)
    // let newTabIndex = 0;

    // 点击页签的回调函数
    function callback(data) {
        message.success(`你点击了页签 ${data}`)
    }
    function onChange(activeKey) {
        setActiveKey(activeKey)
    }
    function onEdit(targetKey, action) {
        [action](targetKey)
    }
    // function add() {
    //     const activeKey = `newTab${newTabIndex++}`;
    //     const newPanes = [...panes];
    //     newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    //     setPanes(newPanes);
    //     setActiveKey(activeKey)
    // }
    // function remove(targetKey) {
    //     let newActiveKey = activeKey;
    //     let lastIndex;
    //     panes.forEach((pane, i) => {
    //         if (pane.key === targetKey) {
    //             lastIndex = i - 1;
    //         }
    //     });
    //     const newPanes = panes.filter(pane => pane.key !== targetKey);
    //     if (newPanes.length && newActiveKey === targetKey) {
    //         if (lastIndex >= 0) {
    //             newActiveKey = newPanes[lastIndex].key;
    //         } else {
    //             newActiveKey = newPanes[0].key;
    //         }
    //     }
    //     setPanes(newPanes);
    //     setActiveKey(newActiveKey)
    // }

    return (
        <div className="wrap">
            {/* Tab 页签 */}
            <Card title=" Tab 页签" className="wrap">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Card>

            {/* 带图标的 Tab 页签 */}
            <Card title="带图标的 Tab 页签" className="wrap">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab={<span><PlusOutlined />Tab 1</span>} key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab={<span><EditOutlined />Tab 2</span>} key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab={<span><DeleteOutlined />Tab 3</span>} key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Card>

            {/* 可编辑的 Tab 页签 */}
            <Card title="可编辑的 Tab 页签" className="wrap">
                <Tabs
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
        </div>
    );
}

export default UiTabs;