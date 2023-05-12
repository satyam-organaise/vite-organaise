import React, { useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {Typography,Box,Button} from "@mui/material";
import InviteRow from "./InviteRow";
import InviteHeader from "./InviteHeader";
import InviteMemberModal from "./InviteMemberModal";
import InviteRequest from "./InviteRequest";
import DoneIcon from '@mui/icons-material/Done';
import { InviteStateContext } from "../../Context/InviteProvider";

const InviteListPage = () => {
  const {setCloseSideList } = ChatState();
  const {inviteState,inviteList,pendingFriendRequest,setInviteState,fetchData}=InviteStateContext()

  useEffect(() => {
    setCloseSideList(true);
  }, []);

  return (
    <Box pl={"2rem"} pt="1rem">
      <Box
        margin={"1rem 2rem"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Typography fontSize={"23px"} fontWeight={600} lineHeight={"135%"}>
            List of Invites
          </Typography>
         
        </Box>

        <Box display={"flex"} alignItems={"center"}>

          <Box display={'flex'} justifyContent={'space-evenly'} gap={2}> 
            
            <Button variant="outlined" size="small" color='secondary' 
            onClick={()=>setInviteState("all")} 
            sx={{textTransform:'capitalize'}} endIcon={inviteState==='all'&&<DoneIcon />}>All</Button>
            
            <Button variant="outlined" size="small" color='success' 
            onClick={()=>setInviteState("accepted")} 
            sx={{textTransform:'capitalize'}} endIcon={inviteState==='accepted'&&<DoneIcon />}>Accepted</Button>
            
            <Button variant="outlined" size="small" color='error' 
            onClick={()=>setInviteState("rejected")} 
            sx={{textTransform:'capitalize'}} endIcon={inviteState==='rejected'&&<DoneIcon />}>Rejected</Button>
            
            <Button variant="outlined" size="small" 
            onClick={()=>setInviteState("pending")} 
             sx={{textTransform:'capitalize'}} endIcon={inviteState==='pending'&&<DoneIcon />}>Pending</Button>
          </Box>
          
          <InviteMemberModal refetch={fetchData}/>
        </Box>
      </Box>

      {(inviteState==='pending'&&pendingFriendRequest.length>0)&&<Box
        boxSizing={"border-box"}
        margin="1rem"
        padding={"1rem 0"}
        border="1px solid #EAEBF0"
        borderRadius={"10px"}
      >
        <InviteHeader first={'Request From'} second={'Date'} third={'Status'}/>
        {pendingFriendRequest?.map((item, index) => {
          return (
            <>
              <Box key={index} borderBottom={!(index===pendingFriendRequest.length-1)&&"0.999505px solid #EAEBF0"}>
                <InviteRequest inviteObj={item} refetch={fetchData}/>
              </Box>
            </>
          );
        })}

      </Box>}

      {inviteList.length>0&&<Box
        boxSizing={"border-box"}
        margin="1rem"
        padding={"1rem 0"}
        border="1px solid #EAEBF0"
        borderRadius={"10px"}
      >
        <InviteHeader first={'Name'} second={'Email ID'} third={'Status'}/>
        {inviteList?.map((item, index) => {
          return (
            <>
              <Box key={index} borderBottom={!(index===inviteList.length-1)&&"0.999505px solid #EAEBF0"}>
                <InviteRow inviteObj={item} refetch={fetchData}/>
              </Box>
            </>
          );
        })}

      </Box>}
    </Box>
  );
};

export default InviteListPage;
