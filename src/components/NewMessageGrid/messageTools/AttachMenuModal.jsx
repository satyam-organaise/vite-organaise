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
import DeviceMenuModal from './DeviceMenuModal';
// import ServerModal from './ServerFilesModal';
import ServerFilesModal from './ServerFilesModal';
const cssStyle = {
   
    sendMessIcon: {
        position: "absolute", right: "5px", top: "4px", fontSize: "28px", backgroundColor: "#333333", borderRadius: "25px", padding: "5px", color: "#fff", cursor: "pointer"
    },
}

const styled = {
    position: 'absolute',
    bottom: '0%',
    right: '8%',
    transform: 'translate(-50%, -50%)',
    width: 140,
    borderRadius: '10px',
    // border: '1px solid gray',
    // boxShadow: 24,
    p: 2,
};

export default function AttachMenuModal() {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const [btn, setBtn] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // const handleOpen = () => {
    //     if (btn) {
    //         setBtn(false)
    //     } else {
    //         setBtn(true)
    //     }
    // }


    return (
        <Box position='relative' >
            <AttachFileIcon sx={{ ...cssStyle.sendMessIcon, right: "35px", backgroundColor: "#fff", color: "#333" }} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ style: { opacity: '0' } }}
            >
                <Box 
                sx={styled}
                position='absolute' bottom={'3rem'} right={"2rem"} >
                    <Box width={'245px'} bgcolor='white' borderRadius='8px' 
                    boxShadow=" rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" 
                    border={"1px solid gray"}
                    >

                        <Box display='flex' justifyContent="space-evenly" alignItems='center' padding={1}>
                            <StorageIcon sx={{ color: "gray" }} fontSize={"2"} />
                           <ServerFilesModal closeModal={handleClose} />
                            <ArrowForwardIosIcon sx={{ color: "gray" }} fontSize={"2"} />
                        </Box>
                        <Divider />
                        <Box display='flex' justifyContent="space-evenly" alignItems='center' padding={1}>
                            <TvIcon sx={{ color: "gray" }} fontSize={"2"} />
                            <DeviceMenuModal closeModal={handleClose} />
                            <ArrowForwardIosIcon sx={{ color: "gray" }} fontSize={"2"} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
