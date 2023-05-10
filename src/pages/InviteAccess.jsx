import React, { useEffect,useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import { inviteTokenValidationApi,changeInviteStatusApi } from "../api/InternalApi/OurDevApi";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

const InviteAccess = ({isAuthenticated}) => {
    const [inviteObj,setInviteObj]=useState({})
    const [timeLeft,setTimeLeft]=useState(0);
    const {invId}=useParams()
    const navigate=useNavigate()
    const {mutateAsync:changeInviteStatus,isLoading:changeInviteStatusIsLoading}=useMutation(changeInviteStatusApi)

    const handleAcceptFun=async()=>{
        if(!isAuthenticated)
        {   
            setTimeLeft(5)
            setTimeout(()=>{
                navigate("/login")
            },5000)
            toast.info("Login first to accept invitation");
        }else{
            const apiBody={
                "invitationId":`${inviteObj?._id}`, 
                "SenderInvitationUserId":`${inviteObj?.invitedMemberUserid?._id}`, 
                "InvitationAction":1
            }
            try{
                const response=await changeInviteStatus(apiBody)
                toast.success("Invitation accepted successfully")
                navigate("/inviteList")
                
            }catch(error)
            {   
                toast.info("Invitation accepted problem")
                console.log(error);
            }
        }
    }

    const handleRejectFun=async()=>{
        if(!isAuthenticated)
        {   
            setTimeLeft(5)
            setTimeout(()=>{
                navigate("/login")
            },5000)
            toast.info("Login first to reject invitation");
        }else{
            const apiBody={
                "invitationId":`${inviteObj?._id}`, 
                "SenderInvitationUserId":`${inviteObj?.invitedMemberUserid?._id}`, 
                "InvitationAction":0
            }
            try{
                const response=await changeInviteStatus(apiBody);
                toast.info("Invitation rejected successfully")
                navigate("/inviteList")
            
            }catch(error)
            {
                toast.info("Invitation rejected problem")
              console.log(error);
            }
        }
    }


    const validateToken=async()=>{
        try{
            console.log(invId)
            const response=await inviteTokenValidationApi(invId);
            setInviteObj(response?.data)
        }catch(error)
        {  
            console.log(error);
        }
    }

    useEffect(()=>{
        validateToken()
    },[])

    useEffect(()=>{
        if (!timeLeft) return;
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    },[timeLeft])

  return (
    <Box height="100vh" width="100vw">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Typography>{inviteObj?.invitedMemberUserid?.name} ({inviteObj?.invitedMemberUserid?.email}) Sent You invitation</Typography>
          
          {
            timeLeft!==0&&<Typography>Redirecting to Login page at {timeLeft}</Typography>
          }
          <Box display="flex" gap={2} paddingTop="20px">
            <Box>
              <Button variant="contained" color="error"  onClick={handleRejectFun} disabled={timeLeft}>
                Decline
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="success" onClick={handleAcceptFun} disabled={timeLeft}>
                Accept
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InviteAccess;
