import React from 'react'
import styled from 'styled-components'
import firebase, { auth } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/services'
import {FacebookOutlined, GoogleOutlined, GithubOutlined} from '@ant-design/icons'

const facebookProvider = new firebase.auth.FacebookAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

const Wrapper = styled.div`
    @media only screen and (max-width : 399px) {
        width: 10%
    }
`

const BtnFacebook = styled.button`
    margin: 8px 0;
    width: 100%;
    height:35px;  
    border-radius: 8px;
    background: #0033FF;
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
    color:white;
    border:0px transparent;  
    text-align: center;
    display: inline-block;

    &:hover{
        background: #FFFF00;
        color: #000;
        opacity: 0.7;
    }
`;
const BtnGoogle = styled.button`
    margin: 8px 0;
    width: 100%;
    height:35px;
    border-radius: 8px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;

    &:hover{
        background: #FFFF00;
        color: #000;
        opacity: 0.7;
    }
`

const BtnGithub = styled.button`
    margin: 8px 0;
    width: 100%;
    height:35px;
    border-radius: 8px;
    background: #000018;
    color:white;
    border:0px transparent;
    text-align: center;
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;

    &:hover{
        background: #FFFF00;
        color: #000;
        opacity: 0.7;
    }
`
function ButtonLogin(){
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider)
    
        if (additionalUserInfo?.isNewUser) {
          addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName?.toLowerCase()),
          })
        }
      }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} >
            <Wrapper>
                <BtnFacebook onClick={() => handleLogin(facebookProvider)}>
                    <FacebookOutlined />
                    &nbsp;&nbsp;Sign In with Facebook
                </BtnFacebook >
                <BtnGoogle onClick={() => handleLogin(googleProvider)}>
                    <GoogleOutlined />
                    &nbsp;&nbsp;Sign In with Google
                </BtnGoogle >
                <BtnGithub onClick={() => handleLogin(githubProvider)}>
                    <GithubOutlined />
                    &nbsp;&nbsp;Sign In with Github
                </BtnGithub >
            </Wrapper>
        </div>
    )
}

export default ButtonLogin