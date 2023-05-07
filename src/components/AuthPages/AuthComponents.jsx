import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AllFiles from '../../pages/AllFiles'
import FileUpload from '../../pages/FileUpload'
import FolderData from '../../pages/FolderData' 
import FolderFiles from '../../pages/FolderFiles' 
import MyMessage from '../../pages/MyMessage' 
import InviteListPage from '../../pages/InviteListPage' 
import CompanyDetails from '../../pages/CompanyDetails' 
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import ErrorPage from '../../pages/ErrorPage'

const AuthComponents = () => {
  return (
    <LeftSideBar>
    <Routes>

        <Route path="/files/allFiles" element={<AllFiles />} />
        <Route path="/files/upload" element={<FileUpload />} />
        <Route path="/files/folder" element={<FolderData />} />
        <Route path="/files/folder/:fid" element={<FolderFiles />} />
        <Route path="/chat" element={<MyMessage/>} />
        {/* <Route path="/account" element={<MyAccount/>} /> */}
        <Route path="/inviteList" element={<InviteListPage />} />
        
        <Route path="*" element={<ErrorPage/>} />

    </Routes>
    </LeftSideBar>
    
  )
}

export default AuthComponents