import { UserAddOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import { Tooltip, Avatar} from 'antd'
import Message from './Message'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../context/AuthProvider'
import useFirestore from '../../hooks/useFirestore'
import Picker from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import Button from '@mui/material/Button'

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`

const WrapperStyled = styled.div`
  height: 100vh;
`

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`

const FormStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
`

const InputStyled = styled.input`
  font-size: 16px;
  font-size: Max(16px, 1em);
  font-family: inherit;
  padding: 0.25em 0.5em;
  background-color: #fff;
  border: 1px solid #8b8a8b;
  border-radius: 4px;
  transition: 180ms box-shadow ease-in-out;
  flex: 1;
  margin-right: 10px;

  :hover{
    border-color: hsl(245,100%, 42%);
    box-shadow: 0 0 0 3px rgba(49, 196, 190, 0.75);
    outline: 3px solid transparent;
  }
`

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`

const ImageStyled = styled.div`
  height: 100vh;
  background: url("https://firebasestorage.googleapis.com/v0/b/chatapp-52c31.appspot.com/o/banner.png?alt=media&token=b15f9442-c9c5-48a0-99ce-82a634aaffe3") no-repeat top center;
  background-size: cover;
  position: relative;
`
const ButtonStyled = styled(Button)`
background-image: linear-gradient(to right, #6253e1, #852D91, #A3A1FF, #F24645);
box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
`

const EmojiStyled = styled(BsEmojiSmile)`
  font-size: 24px;
  margin: 0 10px 0 10px;
  :hover{
    color: red;
    font-size: 26px;
  }
`

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()
  const messageListRef = useRef(null)
  const [showEmojis, setShowEmojis] = useState(false)

  const pickEmoji = (e, emojiObject) =>{
    const tmp = emojiObject.emoji
    const ref = inputRef.current
    ref.focus()
    const start = inputValue.substring(0, ref.selectionStart)
    const end = inputValue.substring(ref.selectionStart)
    const msg = start + tmp + end
    setInputValue(msg)
  }


  const handleOnPressEnter = e =>{
    if (e.key === 'Enter') {
      handleOnSubmit()
    }
  }

  const handleShowEmojis = () => {
    inputRef.current.focus()
    setShowEmojis(!showEmojis)
  }

  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    setInputValue('')
    //focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus()
      })
    }
  }

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );



  const messages = useFirestore('messages', condition);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages])


  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{selectedRoom.name}</p>
              <span className='header__description'>
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type='text'
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ''
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            {showEmojis && <Picker onEmojiClick={pickEmoji} />}
            <FormStyled >
              <EmojiStyled onClick={handleShowEmojis}/>
              <InputStyled
                onKeyDown={handleOnPressEnter}
                ref={inputRef}
                value={inputValue}
                onChange={e=>setInputValue(e.target.value)}
                placeholder='Nhập tin nhắn...'
              />
                  
              <ButtonStyled
                onClick={handleOnSubmit} 
                variant="contained" 
                endIcon={<IoMdSend />}
              >
                Send
              </ButtonStyled>
            </FormStyled>
           
          </ContentStyled>
        </>
      ) : (
        <div>
          <ImageStyled>
          </ImageStyled>
        </div>
      )}
    </WrapperStyled>
  )
}