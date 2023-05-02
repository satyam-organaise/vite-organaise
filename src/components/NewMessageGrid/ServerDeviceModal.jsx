import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import StorageIcon from '@mui/icons-material/Storage';
import TvIcon from '@mui/icons-material/Tv';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Divider } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const cssStyle = {
    firstBoxMessage: { height: "80vh", backgroundColor: "#ffffff", marginTop: "0px" },
    groupNameBox: {
        position: "sticky", top: "65px", width: "100%", height: "50px", zIndex: "100",
        background: "#ffffff", boxSizing: "border-box",
        borderBottom: "1px solid #F1F1F1"
    },
    avatarCss: { width: "25px", height: "25px" },
    listofPeopeBtn: { paddingLeft: "10px", paddingRight: "10px", fontSize: "11px" },
    timeRecMess: { fontSize: "10px", lineHeight: "25px", paddingLeft: "5px" },
    recRealMess: {
        paddingRight: "30px", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px",
        fontSize: "14px", lineHeight: "15px", color: "black", background: "#F2F2F2", borderRadius: "0px 10px 10px 10px", fontWeight: '400'
    },
    sendRealMess: {
        paddingRight: "10px", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px",
        fontSize: "14px", lineHeight: "15px", background: "#448DF0", color: "white", borderRadius: "10px 0px 10px 10px", fontWeight: "400"
    },
    sendMessInput: {
        "& input": {
            fontSize: "13px !important"
        },
        "& fieldset": {
            borderRadius: "50px",
        }
    },
    sendMessIcon: {
        position: "absolute", right: "5px", top: "4px", fontSize: "28px", backgroundColor: "#333333", borderRadius: "25px", padding: "5px", color: "#fff", cursor: "pointer"
    },
    messageBoxCon: {
        backgroundColor: "#ffffff",
        height: "75vh", width: "100%", position: "absolute", overflowY: "auto",
        '&::-webkit-scrollbar': {
            width: '0px',
        },
        '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },
    }
}

export default function ServerDeviceModal() {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const [btn, setBtn] = React.useState(true)


    const handleOpen = () => {
        // setTimeout(() => {

        setBtn(true);

        // }, 1000);
    }


    const handleClose = () => {
        // e.prevantDefalut();

        setBtn(false);
        // console(btn, 'call')
    }


    return (
        <Box position='relative' >

            <AttachFileIcon sx={{ ...cssStyle.sendMessIcon, right: "35px", backgroundColor: "#fff", color: "#333" }} onClick={handleOpen} />
            {btn &&
                <Box onMouseLeave={handleClose} position='absolute' bottom={'1rem'} right={"2rem"}>
                    <Box width={'220px'} bgcolor='white' padding={2} borderRadius='8px' boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" >

                        <Box display='flex' justifyContent="space-evenly" alignItems='center'>
                            <StorageIcon sx={{ backgroundColor: "#fff", color: "#333" }} fontSize={"2"} />
                            <Typography fontSize='14px'>Attach from Server</Typography>
                            <ArrowForwardIosIcon sx={{ backgroundColor: "#fff", color: "#333" }} fontSize={"2"}/>
                        </Box>
                       <Divider/>
                        <Box display='flex' justifyContent="space-evenly" alignItems='center'>
                            <TvIcon  sx={{ backgroundColor: "#fff", color: "#333" }} fontSize={"2"} />
                            <Typography fontSize='14px'>Attach from Device</Typography>
                            <ArrowForwardIosIcon sx={{ backgroundColor: "#fff", color: "#333" }} fontSize={"2"} />

                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
}

