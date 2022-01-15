import React from 'react'
import { Typography } from 'antd'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { AuthContext } from '../../context/AuthProvider'
import { AppContext } from '../../context/AppProvider'
import useFirestore from '../../hooks/useFirestore'

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`

const ButtonStyled = styled(Button)`
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
`

export default function UserInfo() {
  const { user: { displayName, photoURL, uid } } = React.useContext(AuthContext)
  const { clearState } = React.useContext(AppContext)

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: '==',
      compareValue: uid
    }
  }, [uid])
  const users = useFirestore('users', usersCondition)
  const getNameFromFirestore = users[0]?.displayName

  return (
    <WrapperStyled>
      <AvatarContainer>
        <Avatar src={photoURL}>
          {photoURL ? '' 
          : (displayName === null ? getNameFromFirestore?.charAt(0)?.toUpperCase() 
          : displayName?.charAt(0)?.toUpperCase())}
        </Avatar>
        <Typography.Text className='username'>{displayName ? displayName : getNameFromFirestore}</Typography.Text>
      </AvatarContainer>
      <ButtonStyled
        onClick={() => {
          clearState()
          auth.signOut()
        }}
        color="warning"
        variant="contained" 
        startIcon={<RiLogoutCircleLine />}
      >
        Đăng xuất
      </ButtonStyled>
    </WrapperStyled>
  )
}
