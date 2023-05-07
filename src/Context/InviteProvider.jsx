import { createContext, useCallback, useContext, useEffect, useState } from "react"

const InviteContext = createContext();

const InviteProvider = ({ children }) => {
    return (
        <InviteContext.Provider value={{}}>
            {children}
        </InviteContext.Provider>

    )
}

export const InviteState = () => {
    return useContext(InviteContext);
}

export default InviteProvider;