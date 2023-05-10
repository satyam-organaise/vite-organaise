import React, { useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider'

const ErrorPage = () => {
    const {setCloseAppDrawer}=ChatState()
    useEffect(()=>{
        setCloseAppDrawer(true)
    },[])
  return (
    <div>Error Page</div>
  )
}

export default ErrorPage