import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Divider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '78%',
  left: '90%',
  transform: 'translate(-50%, -50%)',
  width: 140,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 3,
  border:'1px solid gray'
};

export default function DeviceMenuModal({closeModal}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} width='40px'>
      <Typography fontSize='13px' color='gray' >Attach from Device</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{style: {opacity:'0'}}}
      >
        <Box sx={style}>

         <Box display='flex' alignItems='center' gap={1} padding={1} color='gray'   >
          <InsertPhotoOutlinedIcon fontSize='1' />
          <Typography>Image</Typography>
         </Box>
          <Divider/>
         <Box display='flex' lignItems='center' gap={1} padding={1} color='gray' >
          <VideoCallOutlinedIcon fontSize='1'/>
          <Typography>Video</Typography>
         </Box>
         <Divider/>
         <Box display='flex' alignItems='center' gap={1} padding={1} color='gray' >
          <MicNoneOutlinedIcon fontSize='1'/>
          <Typography>Audio</Typography>
         </Box>
         <Divider/>
         <Box display='flex' alignItems='center' gap={1} padding={1} color='gray' >
          <DescriptionOutlinedIcon fontSize='1'/>
          <Typography>Document</Typography>
         </Box>
        </Box>
      </Modal>
    </div>
  );
}
