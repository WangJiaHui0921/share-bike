import { useState } from "react";
import { Card, Button, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./../../style/card.less";

const Righ = () => {
    let [editorState, setEditorState] = useState()
    const [isModal, setisModal] = useState(false)
    const [content, setcontent] = useState({})

    let onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    let onContentStateChange = (content) => {
        setcontent(content)
    }

    // 清空文本
    let handleClearContent = () => {
        setEditorState("")
    }

    // 获取 HTML 文本
    let handleGetText = () => {
        setisModal(true)
    }
    return (
        <div className="wrap">
            <Card>
                <Button type="primary" onClick={handleClearContent}>清空内容</Button>
                <Button type="primary" onClick={handleGetText}>获取 HTML 文本</Button>
            </Card>
            <Card title="富文本编辑器">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    onContentStateChange={onContentStateChange}
                />
            </Card>
            <Modal
                title="富文本"
                visible={isModal}
                footer={null}
                onCancel={() => setisModal(false)}
            >
                {draftToHtml(content)}
            </Modal>
        </div>
    );
}

export default Righ;