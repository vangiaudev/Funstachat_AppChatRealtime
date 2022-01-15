import React from 'react'
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from '../../context/AppProvider'

const { Panel } = Collapse

const PanelStyled = styled(Panel)`
  font-size: 16px;
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
  .active{
    color: red;
  }
`

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;

`

export default function RoomList() {
  const [itemClick, setItemClick] = React.useState('')
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext)

  const handleAddRoom = () => {
    setIsAddRoomVisible(true)
  }

  const handleChooseRoom = (room) => {
    setSelectedRoomId(room.id)
    setItemClick(room.id)
  }

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header='Danh sách các phòng' key='1'>
        {rooms.map((room) => (
          <LinkStyled 
            key={room.id} 
            onClick={()=>handleChooseRoom(room)}
            className={itemClick === room.id ? 'active' : ''}
          >
            {room.name}
          </LinkStyled>
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
