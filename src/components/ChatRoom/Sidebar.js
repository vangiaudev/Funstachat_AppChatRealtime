import React from 'react'
import { Row, Col } from 'antd'
import RoomList from './RoomList'
import UserInfo from './UserInfo'
import styled from 'styled-components'

const SidebarStyled = styled.div`
    background: #3f0e40;
    height: 100vh;
    color: white;
`
function Sidebar() {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo></UserInfo>
                </Col>
                <Col span={24}>
                    <RoomList></RoomList>
                </Col>
            </Row>
        </SidebarStyled>
    )
}

export default Sidebar