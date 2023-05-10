import {Typography,Grid,Box,Avatar,Button} from '@mui/material'
import InviteMenu from "./InviteMenu";
import { changeInviteStatusApi } from '../../api/InternalApi/OurDevApi';
import { getDate } from '../../utils/validation';
import { useMutation } from 'react-query';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const InviteRequest = ({name,inviteObj,refetch,setShowAccepted,setShowRejected}) => {
  const navigate=useNavigate()
  const {mutateAsync:changeInviteStatus,isLoading:changeInviteStatusIsLoading}=useMutation(changeInviteStatusApi)
    
    const handleAcceptInvite=async()=>{
      const apiBody={
          "invitationId":`${inviteObj?._id}`, 
          "SenderInvitationUserId":`${inviteObj?.invitedMemberUserid._id}`, 
          "InvitationAction":1
      }
      try{
          const response=await changeInviteStatus(apiBody)
        //   setShowAccepted(true)
          toast.success("Invitation accepted successfully")
          refetch()
          
      }catch(error)
      {   
          toast.info("Invitation accepted problem")
          console.log(error);
      }
  }


      
  const handleRejectInvite=async()=>{
    const apiBody={
        "invitationId":`${inviteObj?._id}`, 
        "SenderInvitationUserId":`${inviteObj?.invitedMemberUserid?._id}`, 
        "InvitationAction":0
    }
    try{
        const response=await changeInviteStatus(apiBody)
        // setShowRejected(true)
        toast.success("Invitation rejected successfully")
        refetch();
    }catch(error)
    {   
        toast.info("Invitation rejected problem")
        console.log(error);
    }
}


  return (
    <Grid container textAlign={'center'} bgcolor={'white'} padding={'.9rem'}>
        <Grid item xs={3} alignSelf={'center'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1683130461600-7ce41d9c27cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" sx={{ width: 33, height: 33,marginRight:"1rem" }}/>
            <Typography>{inviteObj?.invitedMemberUserid?.name}</Typography>
            </Box>
        </Grid>
        <Grid item xs={5} alignSelf={'center'}>
            {getDate(inviteObj.createdAt)}
        </Grid>
        <Grid item xs={4} alignSelf={'center'} display={'flex'} justifyContent={'space-evenly'}>
            {/* <InviteMenu inviteId={inviteObj._id}/> */}
            <Button variant='contained' color='success' sx={{bgcolor:'#2DAF3E',width:'35%'}} onClick={handleAcceptInvite} disabled={changeInviteStatusIsLoading} >Accept</Button>
            <Button variant='outlined' color='error' sx={{width:'35%'}} onClick={handleRejectInvite}>Decline</Button>
        </Grid>
    </Grid>
  )
}

export default InviteRequest