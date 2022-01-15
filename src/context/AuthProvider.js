import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { css } from "@emotion/react"
import PropagateLoader from "react-spinners/PropagateLoader"

export const AuthContext = React.createContext()

const override = css`
  display: flex;
  margin-top: 50vh;
  justify-content: center;
`;
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect( () => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false)
        history('/')
        return;
      }
      else{
        setUser({})
        setIsLoading(false)
        history('/login')
      }
    })

    // clean function
    return () => {
      unsubscibed()
    };
  }, [history])

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? 
        <PropagateLoader 
        css={override} 
        speedMultiplier="2" 
        color="#9013FE" 
        loading={true} 
        size={20} 
      /> : 
      children}
    </AuthContext.Provider>
  )
}
