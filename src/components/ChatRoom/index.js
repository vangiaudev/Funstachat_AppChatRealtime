import React from 'react'
import { Row, Col } from 'antd'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'

function ChatRoom() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Sidebar>

                    </Sidebar>
                </Col>
                <Col span={18}>
                    <ChatWindow>

                    </ChatWindow>
                </Col>
            </Row>
        </div>
    );
}

export default ChatRoom