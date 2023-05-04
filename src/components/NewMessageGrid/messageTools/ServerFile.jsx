import {useState} from 'react'
import { Typography, Checkbox, Box } from '@mui/material';
import FileIcon from '../../FileUploadModal/Icons/FileIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';;

const ServerFile = ({d}) => {
    const [checkbox,setCheckbox]=useState(false)
  return (
    <Box marginX={{ xs: "10px", sm: "3px", md: "25px" }} my={"10px"} sx={{
        width: { xs: "110px", sm: '125px', md: "120px" },
        padding: "10px 5px",
        boxSizing: "border-box",
        border: "0.5px solid #CBCBCB", borderRadius: "8px",
        position:'relative',
        cursor:'pointer'
    }} 
    >

        <Box display={'flex'} position={'absolute'} right='-5%' top='-3%'>
            <Checkbox size='small' value={checkbox} onChange={()=>setCheckbox((value)=>!value)} icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />}/>
        </Box>
        <Box container display={'flex'} justifyContent="center">
            <FileIcon ext={d.fileName.split(['.'])[1]} maxH='50px' />
        </Box>
        <Box container>
            <Typography align='center' variant="subtitle2" color={"#121212"} fontSize={{ xs: "0.79rem", sm: "0.875rem" }}>
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

export default ServerFile