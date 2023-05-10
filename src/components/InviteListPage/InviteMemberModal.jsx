import { useState,useEffect } from 'react';
import { IconButton, Box, Button, Typography, Modal, Autocomplete, TextField, Badge, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { searchUserV1,sendInvitationApi } from '../../api/InternalApi/OurDevApi';
import { useMutation } from 'react-query';
import { useDebounce } from 'use-debounce';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 12,
  padding: '2rem',
  borderRadius: "3px"
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      // animation: 'ripple 1.2s infinite ease-in-out',
      // border: '1px solid currentColor',
      content: '""',
    },
  },
}));


export default function InviteMemberModal({refetch,setShowPending }) {
    
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutateAsync: MemberSearchV1 } = useMutation(searchUserV1);
  const [srcMemberText, SetSrcMemberText] = useState("");
  const [allUsersList,setAllUsersList]=useState({})
  const [listNewMembers, setNewMembersList] = useState([]);
  const [selectSrcMember, setSelectSrcMem] = useState(null);
  const [debouncedSearchMember] = useDebounce(srcMemberText, 500);
  const [memberEmail,setMemberEmail]=useState("")

  useEffect(() => {
    if (debouncedSearchMember) {
        searchMemberv1(debouncedSearchMember);
    }
  }, [debouncedSearchMember])

    
  const searchMemberv1 = async (srcItem) => {
    try {
        const response = await MemberSearchV1({ search: srcItem });
        
        const filterUsers=response.filter((item)=>{
        if(allUsersList[item._id])
        {
            return false
        }else{
            return true
        }
        })

        if (response.length > 0) {
            setNewMembersList(filterUsers);
            return;
        }
        setNewMembersList(response);    

    } catch (error) {
        console.log(error.response);
    }
  }

  const sendInvitationFun=async()=>{
    const obj={
      "emailId":memberEmail
  }
    try{
      const response=await sendInvitationApi(obj)
      refetch()
      setShowPending(true)
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
      {/* <Button variant="contained" ml='1rem' sx={{textTransform:'capitalize'}} size='small' 
      >New Invite</Button> */}
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
                {/* <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth/> */}
                {/* <Autocomplete
                    freeSolo
                    id="search_member_and_add"
                    disableClearable
                    options={listNewMembers}
                    onChange={(event, newValue) => {
                        setSelectSrcMem(newValue);
                    }}
                    getOptionLabel={(option) => `${option.name} ( ${option.email} )`}
                    renderOption={(props, option) => (
                        <div {...props}>
                            <div>{option.name}</div>
                        </div>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Enter Email"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            onChange={(event, newValue) => {
                                SetSrcMemberText(event.target.value);
                            }} />
                    )}
                /> */}
                <TextField
                id="outlined-multiline-static"
                label="Email"
                multiline
                fullWidth
                value={memberEmail}
                onChange={(e)=>setMemberEmail(e.target.value)}
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

