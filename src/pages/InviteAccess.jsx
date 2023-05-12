import { toast } from "react-toastify";
import { useMutation } from "react-query";
import React, { useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from '@mui/material'
import organaiseLogo from "../assets/Logo/organaise-logo.png"
import InviteBgImg from "../assets/BackgroundImages/Invite.png"
import { inviteTokenValidationApi,changeInviteStatusApi } from "../api/InternalApi/OurDevApi";

const cssStyle = {
  parent_box: {
    width: "100%",
    maxWidth: "1200px",
    height: "100vh"
  },
  content_container_box: {
    backgroundColor: "#ffffff",
    // padding: "10% 20%",
    padding: "10% 20%",
    minHeight: "500px",
    maxHeight: "100vh"
  },
  box_container_form: {
    margin: "20% 0%",
  },
  btn_textfield: {
    width: "100%",
    marginBottom: "5px",
    '& .MuiInputLabel-root': {
      color: '#1c529b', // default label color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'primary' // default border color
      },
      '&:hover fieldset': {
        borderColor: 'primary' // border color on hover
      },
      '&.Mui-focused fieldset ': {
        borderColor: 'primary' // border color when focused
      },

    }
  },
  grid_textBox_button: {
    margin: "4px 0px"
  },
}

const InviteAccess = ({ isAuthenticated }) => {
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
    <Box container  >
      <Grid container padding={{ xs: 1, sm: 5 }}>
        {/* grid1 */}
        <Grid item xs={12} >
          <Box container  >
            <Grid item xs={6} sm={12} paddingLeft={{ xs: 2, sm: 12 }}>
              <img
                src={organaiseLogo}
                style={{ width: "150px" }}
                alt="organaise-logo-login-page" />
            </Grid>
            {/* <Grid item xs={12} sm={8} display='flex' justifyContent={{ xs: 'center', sm: 'start' }}  >
              <Typography variant="h4" fontSize={{ xs: '30px', sm: '33px', md: '40px' }} fontWeight='600' color="#333333"  marginY={{ xs: 3, sm: 0 }}>
                Login Account
              </Typography>
            </Grid> */}
          </Box>
        </Grid>

        {/* grid2 */}
        <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} >
          <Grid container xs={12} display='flex'>

            <Grid item xs={12} sm={6} paddingBottom={2}  >
              <Box paddingLeft={4} display='flex' justifyContent='center'>
                <img src={InviteBgImg} style={{ width: "57%" }} alt="login-page-background-image" />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} display='flex' justifyContent='center'  >

              <Box display='flex' flexDirection='column' gap={4} justifyContent='center' height='80%' width='80%'  >
                <Typography fontSize='38px' fontWeight='bold'>Invite Request</Typography>

                <Typography fontSize='18px' >

                  <Box display='flex' gap={0.8}>
                    <Typography component='span' fontWeight='bold'>
                      {inviteObj?.invitedMemberUserid?.name}
                    </Typography>
                    <Typography component='span'>
                      sent you invite request
                    </Typography>

                  </Box>
                  <Typography fontWeight='600'>
                    @{inviteObj?.invitedMemberUserid?.email}
                  </Typography>
                </Typography>
                {
                  timeLeft!==0&&<Typography>Redirecting to Login page at {timeLeft}</Typography>
                }

                <Box display='flex' justifyContent='' gap={2}>
                  <Button variant='contained' sx={{paddingX:'30px'}} onClick={handleAcceptFun} disabled={timeLeft}>Accept</Button>
                  <Button sx={{paddingX:'30px'}} variant='outlined' onClick={handleRejectFun} disabled={timeLeft}>Decline</Button>
                </Box>
              </Box>


            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  )
}

export default InviteAccess