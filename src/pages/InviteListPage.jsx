import React, { useEffect,useState } from "react";
import {ChatState} from "../Context/ChatProvider"
import {Typography,Grid,Box,Paper} from '@mui/material'
import { styled } from '@mui/material/styles';
import InviteRow from "../components/InviteListPage/InviteRow";
import InviteMemberModal from "../components/InviteListPage/InviteMemberModal";
import { allInviteMemberListApi } from "../api/InternalApi/OurDevApi";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#448DF0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const InviteListPage = () => {
    const { setPageNameContext,setCloseSideList } = ChatState();
    const [inviteList,setInviteList]=useState([]);

    const fetchData=async ()=>{
        try{
            const response=await allInviteMemberListApi();
            console.log(response)
            setInviteList(response?.data);
        }catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        // setLoading(true)
        // getFilesOfUser();
        fetchData();
        setPageNameContext("data")
        setCloseSideList(true);
    }, [])

  return (
    <Box pl={'2rem'} pt='1rem'>
        
        <Box 
        // bgcolor='red'
        margin={'1rem 2rem'} 
        display={'flex'} justifyContent={'space-between'}
        >
            <Typography fontSize={'23px'} fontWeight={600} lineHeight={'135%'}>List of Invites</Typography>
            <InviteMemberModal/>
        </Box>
        
        <Box boxSizing={'border-box'} margin='1rem' padding={'1rem 0'} border='1px solid #EAEBF0' borderRadius={'10px'}>

            <Box padding={'0 1rem'}>

            <Grid container textAlign={'center'} bgcolor={'#448DF0'} padding={'1rem 0'} color='white' fontSize={'19px'} fontWeight={600} borderRadius={'10px'}>
                <Grid item xs={3}>
                    Name
                </Grid>
                <Grid item xs={5}>
                    Email ID
                </Grid>
                <Grid item xs={3}>
                    Status
                </Grid>
            </Grid>
            </Box>
            
            {
                inviteList.map((item,index)=>{
                    return <Box key={index} borderBottom={'0.999505px solid #EAEBF0'}>
                    <InviteRow status='accept' inviteObj={item}/>
                </Box>
                })
            }
            
            
        </Box>

    </Box>
  )
}

export default InviteListPage