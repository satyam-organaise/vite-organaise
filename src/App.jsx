import './App.css';
import { useState, createContext,useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material';
import InviteTeam from './pages/InviteTeam';
import ProjectName from './pages/ProjectName';
import InviteAccess from './pages/InviteAccess';
import ContentModels from './pages/ContentModels';
import ChatProvider from './Context/ChatProvider';
import CompanyDetails from './pages/CompanyDetails';
import InviteProvider from './Context/InviteProvider';
import GetStart from './components/AuthPages/GetStart';
import ServiceProvider from './Context/ServiceProvider';
import LoginPage from './components/AuthPages/LoginPage';
import ForgetPage from './components/AuthPages/ForgetPage';
import OtpVerfPage from './components/AuthPages/OtpVerfPage';
import ForgetEmail from './components/AuthPages/ForgetEmail';
import { userTokenVerify } from './api/InternalApi/OurDevApi';
import { SignupPage } from './components/AuthPages/SignupPage';
import AuthComponents from './components/AuthPages/AuthComponents';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import WhoIAm from './components/AuthPages/WhoIAm';

export const LeftSideBarContext = createContext(null);
function App() {
    // const [leftSideData, setLeftSideData] = useState("")
    // const { pageType } = useParams();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#448DF0',

            },
            secondary: {
                main: '#FF5353',
                dark: "#333333",
            }
        },
        typography: {
            fontFamily: 'Nunito',
            color: "#333333",
            fontWeight: "600"
        },

    });
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isAnonymous, setAnonymous] = useState(false);
    // const [userId, setUserId] = useState("")


    const checkAuthentication = async() => {
        const pathname = location.pathname;
        try{
            const response=await userTokenVerify();
            if(response.status===true)
            {
                setIsAuthenticated(true)               
                if (pathname === '/login' || pathname === '/signup' || pathname === '/getStart' || pathname === '/getstart' || pathname === '/forgetEmail' || pathname === '/forget-password' || pathname === '/'  || pathname === '/whoAmI' || pathname === '/whoami'  )
                {
                    navigate("/chat")
                }

            }else{
                setIsAuthenticated(false)
                localStorage.removeItem("token");
                localStorage.removeItem("userinfo");
                if (pathname === '/login' || pathname === '/signup' || pathname === '/getStart' || pathname === '/forgetEmail' || pathname === '/forget-password'||pathname.slice(0,8)==='/invite/'||pathname === '/whoAmI' || pathname === '/whoami'  ) {
                    navigate(pathname)
                } else {
                    navigate("/getStart")
                }
            }
        }catch(err)
        {
            setIsAuthenticated(false)
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            if (pathname === '/login' || pathname === '/signup' || pathname === '/getStart' || pathname === '/forgetEmail' || pathname === '/forget-password'||pathname.slice(0,8)==='/invite/'|| pathname === '/whoAmI' || pathname === '/whoami'  ) {
                navigate(pathname)
            } else {
                navigate("/getStart")
            }
        }
    }

    useEffect(() => {
        checkAuthentication()
    },[isAuthenticated])

    return (
        <>
            
            <ThemeProvider theme={theme}>
            <InviteProvider>
                {!isAuthenticated
                    ?

                    <ServiceProvider>

                        <Routes>
                            <Route path="/login" element={<LoginPage serviceType="login" setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/signup" element={<SignupPage serviceType="signup" />} />
                            <Route path="/getStart" element={<GetStart serviceType='start' />} />
                            <Route path="/whoAmI" element={<WhoIAm/>} />
                            <Route path="/forgetEmail" element={<ForgetEmail serviceType='forgetEmail ' />} />
                            <Route path="/forget-password" element={<ForgetPage serviceType='forgetPassword' />} />
                            <Route path="/otpVerf" element={<OtpVerfPage serviceType='otpVerf' setIsAuthenticated={setIsAuthenticated} />} />
                            <Route path="/invite/:invId" element={<InviteAccess isAuthenticated={isAuthenticated}/>} />

                        </Routes>
                    </ServiceProvider>
                    :
                    <ChatProvider>     

                        {location.pathname==='/modal'||location.pathname==='/invite'||location.pathname==='/projectName'||location.pathname==='/companyDetail'||location.pathname.slice(0,8)==='/invite/'?<>
                        
                        <Routes>
                            <Route path="/invite/:invId" element={<InviteAccess isAuthenticated={isAuthenticated}/>} />
                            <Route path="/model" element={<ContentModels />} />
                            <Route path="/startInvite" element={<InviteTeam />} />
                            <Route path="/projectName" element={<ProjectName />} /> 
                            <Route path="/companyDetail" element={<CompanyDetails />} />            
                        </Routes>
                        </>:
                        <AuthComponents/>}
                    </ChatProvider>
                }

                </InviteProvider>
            </ThemeProvider >


        </>
    )
}

export default App