import { useState } from 'react';
import { IconButton, Box, Button, Typography, Modal, TextField, Badge, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { sendInvitationApi } from '../../api/InternalApi/OurDevApi';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { toast } from 'react-toastify';
import { InviteStateContext } from '../../Context/InviteProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 12,
  padding: '2rem',
  borderRadius: "3px"
};
export default function InviteMemberModal({refetch }) {
  const {allUserEmailList}=InviteStateContext();
  const [memberEmail,setMemberEmail]=useState("")
  const [emailExist,setEmailExist]=useState(false);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const sendInvitationFun=async()=>{
    if(allUserEmailList[memberEmail])
    {
      setEmailExist(true);
      setTimeout(()=>{
        setEmailExist(false)
      },[2000])
      return;
    }

    const obj={
      "emailId":memberEmail
    }
    try{
      const response=await sendInvitationApi(obj)
      refetch()
      setMemberEmail("")
      handleClose()
      toast.success("Invitation send successfully")
    }catch(error)
    {
      console.log(error.message)
      toast.error("Invitation not send")
    }
  }

  return (
    <div>
      <Tooltip  title="New Invitation" placement="top">
      <IconButton aria-label="delete" size="large" onClick={handleOpen}>
        <AddBoxIcon fontSize="inherit" color='primary'/>
      </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={{ ...style, width: { xs: '90%', sm: 350, md: 490 } }}>

          <IconButton
            style={{
              position: "absolute", top: "3%", right: "4%", boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', outline: 'none',
              cursor: "pointer",
              color: "#333333",
              fontSize: "18px",
              borderRadius: "50%",
              border: "1px solid #33333342",
              padding: "2px",
            }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon sx={{ p: 0, fontSize: '15px' }} />
          </IconButton>

            <Typography id="modal-modal-title" variant="h6" fontWeight={"600"} mb={1}>
                Invite Member
            </Typography>

            <Box >
                <Typography variant="subtitle2" fontSize={{ xs: '12px', sm: '15px' }} color='#8B8B8B' fontWeight={400}>
                Start a chat conversation with adding teammates via email Chat directly with them for fast solutions.
                </Typography>
            </Box>

            <Box m={'1rem 0'}>
                <Box m='1rem 0'>
                <TextField
                id="outlined-multiline-static"
                label="Email"
                multiline
                fullWidth
                value={memberEmail}
                onChange={(e)=>setMemberEmail(e.target.value)}
                helperText={emailExist&&"Email already exists"}
                error={emailExist}
                />
                </Box>
                <TextField
                id="outlined-multiline-static"
                label="Adding Reason"
                multiline
                rows={4}
                fullWidth
                />
            </Box>

            <Box container sx={{ width: "100%" }} gap={2} display="flex" justifyContent={"flex-end"}>
                <Button
                    variant="outlined"
                    size='small'
                    sx={{ padding: { xs: '3px 20px', md: "5px 30px" }, fontSize: { xs: '10px', sm: '12px' },textTransform:'capitalize' }}
                    onClick={() => handleClose()}
                >
                    Discard
                </Button>
                <Button
                    variant="contained"
                    size='small'
                    sx={{ padding: { xs: '3px 20px', md: "5px 30px" }, fontSize: { xs: '10px', sm: '12px' },textTransform:'capitalize' }}
                    onClick={() => { sendInvitationFun(); }}
                >
                    Invite
                </Button>
            </Box>
          
        </Box>
      </Modal>
    </div>
  );
}

