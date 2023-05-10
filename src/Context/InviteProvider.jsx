import { createContext, useContext, useState } from "react"

export  const InviteContext = createContext();

const InviteProvider = ({ children }) => {
    const [inviteToken,setInviteToken]=useState("");
    const [inviteObj,setInviteObj]=useState({});
    const [emailContext,setEmailContext]=useState("")
    return (
        <InviteContext.Provider value={{inviteToken,setInviteToken,inviteObj,setInviteObj,emailContext,setEmailContext}}>
            {children}
        </InviteContext.Provider>
    )
}

export const InviteStateContext = () => {
    return useContext(InviteContext);
}

export default InviteProvider;