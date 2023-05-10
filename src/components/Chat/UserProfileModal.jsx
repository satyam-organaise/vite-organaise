import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import CardMedia from '@mui/material/CardMedia';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Switch from '@mui/material/Switch';
import ButtonHovers from './ButtonHovers';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  borderRadius: '10px',
  boxShadow: 4,
  p: 4,
};

export default function UserProfileModal({name,email}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box onClick={handleOpen}>
      <ButtonHovers name={name} email={email}/>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {/* box 1 */}
          <Box sx={style} >
            <Box display='flex' justifyContent='space-between'>
              <Typography id="transition-modal-title" fontWeight='500' fontSize='24px'>
                View Profile
              </Typography>
              <Box>
                <CloseIcon onClick={handleClose} sx={{
                                cursor: "pointer",
                                color: "#333333",
                                fontSize: "18px",
                                borderRadius: "50%",
                                border: "1px solid #33333342",
                                padding: "2px"}}/>
              </Box>
            </Box>

            {/* box 2 */}
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
              {/* <CardMedia borderRadius='20px' 
            <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  width='80px' height='80px'  />
          /> */}
              <CardMedia
                sx={{ height: "100px", width: '100px', borderRadius: "50%" }}
                image="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
                component="img"
              />
              <Typography sx={{ fontSize: '22px', fontWeight: '600' }} >Carter Roy</Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: '300', paddingBottom: '10px', color:'gray' }} >Last seen 10 mins ago</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '400' }} paddingBottom='10px' textAlign='center' width='90%' >it is long established face that fact that a reader will be disracted by the redable content of a page</Typography>
            </Box>

            <Divider color='#DADADA' sx={{ marginTop: '1px' }} />

            <Box paddingY="14px" display='flex' justifyContent='space-between' alignItems='center' >
              <Box display='flex' flexDirection='row' gap={2}>
                <Box>
                  <LocalPhoneIcon sx={{ color: '#448DF0' }} />
                </Box>
                <Box>
                  <VideocamIcon sx={{ color: '#448DF0' }} />
                </Box>
              </Box>

              <Box>
                <MoreHorizIcon sx={{ color: '#448DF0', marginRight:'5px',fontSize: 29}} />
              </Box>
            </Box>

            <Box  >
              <Box paddingBottom='10px' display='flex'  justifyContent='space-between' alignItems='center'>
                <Box display='flex' gap={2} alignItems='center'>
                  <NotificationsIcon sx={{ color: "#BABABA",  fontSize: 23 }} />
                  <Typography>Mute conversation</Typography>
                </Box>


                <Box  >
                  <Switch {...label} size="small" defaultChecked />
                </Box>
              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center'> 
                <Box display='flex' gap={2} alignItems='center' >
                  <EmailIcon sx={{ color: "#BABABA", fontSize: 21 }} />
                  <Typography>carteroy99@gmail.com</Typography>
                </Box>

                <Box >
                  <ContentCopyIcon sx={{ color: "gray", fontSize: 19, marginRight:'5px' }}/>
                </Box>
              </Box>
            </Box>

            <Divider color='#DADADA' sx={{ marginY: '12px' }} />

            <Box paddingBottom='14px' >
              <Typography fontWeight='600'>Files and Docs</Typography>
            </Box>

            <Box gap={2} display='flex' flexDirection='row'>

              <CardMedia
                sx={{ width: "70px", height: "70px", borderRadius: "5px" }}
                image="https://images.pexels.com/photos/16730217/pexels-photo-16730217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
                component="img"
              />
              <CardMedia
                sx={{ width: "70px", height: "70px", borderRadius: "5px" }}
                image="https://images.pexels.com/photos/16730217/pexels-photo-16730217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
                component="img"
              />
              <CardMedia
                sx={{ width: "70px", height: "70px", borderRadius: "5px" }}
                image="https://images.pexels.com/photos/16296259/pexels-photo-16296259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
                component="img"
              />
              <CardMedia
                sx={{ width: "70px", height: "70px", borderRadius: "5px" }}
                image="https://images.pexels.com/photos/14171377/pexels-photo-14171377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
                component="img"
              />
              <CardMedia
                sx={{ width: "70px", height: "70px", borderRadius: "5px" }}
                image="https://images.pexels.com/photos/16577586/pexels-photo-16577586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                title="green iguana"
                component="img"
              />
             
            </Box>


          </Box>


        </Fade>
      </Modal>
    </div>
  );
}
