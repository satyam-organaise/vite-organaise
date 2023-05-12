import { createContext, useContext, useState,useEffect } from "react";
import { allInviteMemberListApi } from "../api/InternalApi/OurDevApi";

export const InviteContext = createContext();

const InviteProvider = ({ children }) => {
  const [inviteToken, setInviteToken] = useState("");
  const [inviteObj, setInviteObj] = useState({});
  const [emailContext, setEmailContext] = useState("");
  const [orginalInviteList, setOriginInviteList] = useState([]);
  const [inviteList, setInviteList] = useState([]);
  const [inviteState, setInviteState] = useState("");
  const [userId, setUserId] = useState("");
  const [pendingFriendRequest, setPendingFriendRequest] = useState([]);
  const [allUserEmailList,setAllUserEmailList]=useState({})

  const findUserEmail=(inviteArr)=>{
    const userId=localStorage.getItem("userInfo")
    const userEmailArr = inviteArr?.map((item) => { 
      if ((item.invitedMemberUserid?._id === userId)) {
        return item.email;
      }
      else{
        return item.invitedMemberUserid.email
      }
    });
    const obj={}
    for(let val of userEmailArr)
    {
      obj[val]=true
    }
    setAllUserEmailList(obj);

  }

  const fetchData = async () => {
    try {
      const response = await allInviteMemberListApi();
      const list=response?.data
      setOriginInviteList(list);
      findUserEmail(list);
      setInviteState("all")
    } catch (error) {
      console.log(error);
    }
  };

  const filterInviteListFun = () => {
    if(inviteState!=='all')
    {
      const filteredList = orginalInviteList?.filter((item) => {
        if ((item.invitedMemberUserid?._id === userId|| item.invitedReciverMemberUserid?._id === userId)&&item?.invitationStatus===inviteState) {
          return true;
        } else {
          return false;
        }
      });

      setInviteList(filteredList);
    }
    else{
      setInviteList(orginalInviteList);
    }

   
      const pendingFriendRequestArr=orginalInviteList.filter((item)=>{
        if(item.invitationStatus==='pending'&&item.email===emailContext)
        {
          return true
        }else{
          return false
        }
      })
      setPendingFriendRequest(pendingFriendRequestArr);
    
    
    
  };

  useEffect(() => {
    filterInviteListFun();
  }, [orginalInviteList,inviteState]);

  useEffect(() => {
    setUserId(localStorage.getItem("userInfo"));
    setEmailContext(localStorage.getItem("email"))
    fetchData();
  }, []);


  return (
    <InviteContext.Provider
      value={{
        inviteToken,
        setInviteToken,
        inviteObj,
        setInviteObj,
        emailContext,
        setEmailContext,
        orginalInviteList,
        setOriginInviteList,
        inviteList,
        setInviteList,
        inviteState,
        setInviteState,
        userId,
        setUserId,
        pendingFriendRequest,
        setPendingFriendRequest,
        fetchData,
        filterInviteListFun,
        allUserEmailList
      }}
    >
      {children}
    </InviteContext.Provider>
  );
};

export const InviteStateContext = () => {
  return useContext(InviteContext);
};

export default InviteProvider;
