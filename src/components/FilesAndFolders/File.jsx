import DotMenu from "../Chat/DotMenu";
import ShowFileModal from "./ShowFileModal";
import { Box,Typography } from "@mui/material";
import FileIcon from "../FileUploadModal/Icons/FileIcon";
import { useState } from "react";

const File = ({d,ActionDelFile}) => {
    const [openFile,setOpenFile]=useState(false)
  return (
    <Box marginX={{xs:"10px",sm:"3px",md:"25px"}} my={"10px"} sx={{
        width: {xs:"130px",sm:'155px',md:"170px"},
        height: {xs:"150px",sm:'170px',md:"180px"},
        padding: "5px 5px",
        boxSizing: "border-box",
        border: "0.5px solid #CBCBCB", borderRadius: "8px",cursor:'pointer'
        }}
        onClick={()=>setOpenFile((value)=>!value)}    
    >
        <Box container display={'flex'} justifyContent="end">
            <DotMenu handleDelete={ActionDelFile} value={d} pageName='files' deleteHeading="Delete File" deleteTitle="Are you sure you want to delete this file ?"/>
        </Box>

        {openFile&&<ShowFileModal fileObj={d} fileSize={`${Math.abs(parseInt(d.fileSize) / 1000000) % 1 !== 0 ? Math.abs(parseInt(d.fileSize) / 1000000).toFixed(2) : Math.floor(Math.abs(parseInt(d.fileSize) / 1000000))} MB`}/>}
        
        <Box container display={'flex'} justifyContent="center">
            
            <FileIcon ext={d.fileName.split(['.']).pop()}/>
        </Box>
        <Box container>
            <Typography align='center' variant="subtitle2" color={"#121212"} fontSize={{xs:"0.79rem",sm:"0.875rem"}}>
                {d.fileName.split(".")[0].length > 15 ? d.fileName.split(".")[0].substring(0, 14) : d.fileName.split(".")[0]}
            </Typography>
        </Box>
        <Box container>
            <Typography align='center' variant="subtitle2" fontSize={"13px"}
                color={"#CDCDCD"}>
                {`${Math.abs(parseInt(d.fileSize) / 1000000) % 1 !== 0 ? Math.abs(parseInt(d.fileSize) / 1000000).toFixed(2) : Math.floor(Math.abs(parseInt(d.fileSize) / 1000000))} MB`}
            </Typography>
        </Box>
    </Box>
  )
}

export default File