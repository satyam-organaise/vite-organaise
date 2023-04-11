import { createContext, useContext, useEffect, useState } from "react"

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
    const [serviceType, setSeviceType] = useState("");
    const [contextEmail, setContextEmail] = useState("");
    const [contextPassword, setContextPassword] = useState("");
    const [contextName, setContextName] = useState("");

    return (
        <ServiceContext.Provider value={{ serviceType, setSeviceType, contextEmail, setContextEmail, contextPassword, setContextPassword,contextName,setContextName }}>
            {children}
        </ServiceContext.Provider>

    )
}


export const ServiceState = () => {
    return useContext(ServiceContext);
}

export default ServiceProvider;