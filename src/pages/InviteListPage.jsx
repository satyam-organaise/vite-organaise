import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {Typography,Box,Button} from "@mui/material";
import InviteRow from "../components/InviteListPage/InviteRow";
import InviteHeader from "../components/InviteListPage/InviteHeader";
import InviteMemberModal from "../components/InviteListPage/InviteMemberModal";
import { allInviteMemberListApi } from "../api/InternalApi/OurDevApi";
import InviteRequest from "../components/InviteListPage/InviteRequest";
import { InviteStateContext } from "../Context/InviteProvider";
import DoneIcon from '@mui/icons-material/Done';

const InviteListPage = () => {
  const { setPageNameContext, setCloseSideList } = ChatState();
  const [orginalInviteList, setOriginInviteList] = useState([]);
  const [inviteList, setInviteList] = useState([]);
  const [inviteState, setInviteState] = useState("");
  const [userId, setUserId] = useState("");
  const {emailContext}=InviteStateContext()
  const [pendingFriendRequest,setPendingFriendRequest]=useState([])
  const [showAccepted,setShowAccepted]=useState(true)
  const [showRejected,setShowRejected]=useState(false)
  const [showPending,setShowPending]=useState(false)

  const fetchData = async () => {
    console.log("fetching data")
    try {
      const response = await allInviteMemberListApi();
      console.log("fetching data",response)
      setOriginInviteList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterInviteListFun = () => {
    // console.log("enter into filter")
    const filteredList = orginalInviteList?.filter((item) => {
      // console.log(item,"filteriing",showAccepted,showPending,showRejected)
      if ((item.invitedMemberUserid?._id === userId|| item.invitedReciverMemberUserid?._id === userId)) {
 
        if(showAccepted&&item.invitationStatus==='accepted')
        {
          return true;
        }
        if(showRejected&&item.invitationStatus==='rejected')
        {
          return true;
        }
        if(showPending&&item.invitationStatus==='pending')
        {
          return true;
        }
      } else {
        return false;
      }
    });

    // console.log(filteredList,"my list")

    if(showPending)
    {
      const pendingFriendRequestArr=orginalInviteList.filter((item)=>{
        if(item.invitationStatus==='pending'&&item.email===emailContext)
        {
          return true
        }else{
          return false
        }
      })
      // console.log(pendingFriendRequestArr,emailContext,"friend request")
      setPendingFriendRequest(pendingFriendRequestArr);
    }
    
    setInviteList(filteredList);
  };

  useEffect(() => {
    filterInviteListFun();
  }, [showAccepted,showRejected,showPending,orginalInviteList]);

  useEffect(() => {
    // setLoading(true)
    // getFilesOfUser();
    setUserId(localStorage.getItem("userInfo"));
    fetchData();
    setPageNameContext("data");
    setCloseSideList(true);
  }, []);

  return (
    <Box pl={"2rem"} pt="1rem">
      <Box
        // bgcolor='red'
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
            
            <Button variant="outlined" size="small" color='success' 
            onClick={()=>setShowAccepted((value)=>!value)} 
            sx={{textTransform:'capitalize'}} endIcon={showAccepted&&<DoneIcon />}>Accepted</Button>
            
            <Button variant="outlined" size="small" color='error' 
            onClick={()=>setShowRejected((value)=>!value)} 
            sx={{textTransform:'capitalize'}} endIcon={showRejected&&<DoneIcon />}>Rejected</Button>
            
            <Button variant="outlined" size="small" 
            onClick={()=>setShowPending((value)=>!value)} 
             sx={{textTransform:'capitalize'}} endIcon={showPending&&<DoneIcon />}>Pending</Button>
          </Box>
          
          <InviteMemberModal refetch={fetchData} setShowPending={setShowPending}/>
        </Box>
      </Box>

      {(showPending&&pendingFriendRequest.length>0)&&<Box
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
                <InviteRequest  inviteObj={item} refetch={fetchData} setShowAccepted={setShowAccepted} setShowRejected={setShowRejected}/>
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
        <InviteHeader first={'Name'} second={'Email ID'} third={'Status'} page={showPending&&"pending"} />
        {inviteList?.map((item, index) => {
          return (
            <>
              <Box key={index} borderBottom={!(index===inviteList.length-1)&&"0.999505px solid #EAEBF0"}>
                <InviteRow status="accept" inviteObj={item}  page={showPending&&"pending"} refetch={fetchData}/>
              </Box>
            </>
          );
        })}

      </Box>}
    </Box>
  );
};

export default InviteListPage;
