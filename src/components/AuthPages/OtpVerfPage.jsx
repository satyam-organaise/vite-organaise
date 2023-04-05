import {
    Box, Grid, Typography, TextField,
    Button, IconButton, InputAdornment
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import organaiseLogo from "../../assets/Logo/organaise-logo.png";
import loginPageBackgroundImg from "../../assets/BackgroundImages/loginBackGroundImg.png"
import forgetPassPageBGImg from "../../assets/BackgroundImages/forgetPasswordBgImg.png"
import signupPageBgImg from "../../assets/BackgroundImages/signupBackgroundImg.png"
import otpVerificationBgImg from "../../assets/BackgroundImages/otpVerificationBgImg.png"
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import OtpField from 'react-otp-field';
import { toast } from 'react-toastify';
/////Import react query functions
import { useMutation } from 'react-query'
import {
    userSignIn, resendConfermationEMail,
    CognitoSignUp, SignUpOtpVarify,
    otpWithResetPassword, resetPasswordFun
} from "../../api/CognitoApi/CognitoApi";
import { passwordValidator } from '../../utils/validation';
import { userCreateAccount, userLoginAccount } from '../../api/InternalApi/OurDevApi';
import checkboxIcon from '../../assets/BackgroundImages/checkbox.png'
import GoogleIcon from '../../assets/svg/Google.svg'
import FacebookIcon from '../../assets/svg/Facebook.svg'
import AppleIcon from '../../assets/svg/Apple.svg'
import { List, ListItem, ListItemText } from '@mui/material';

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
        margin: "1% 0%",
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

const OtpVerfPage = ({ serviceType }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [OtpValue, setOtpValue] = useState('');////otp value store here
    const [showOtpVeriCont, setShowVeriCon] = useState(false);
    /////Store email address
    const [fullName, setFullName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    /////// btn disabled until operation  not completed
    const [btnDisabed, setBtnDisabled] = useState(false);
    /////// Verify button disaabled until operation not complete
    const [verifyBtnDisable, setVerifyBtnDisabled] = useState(false);


    ////////Here we are write the calling api react query function and call the login fuction and resend  confermation mail
    const { mutateAsync: loginApiCall } = useMutation(userSignIn);
    const { mutateAsync: loginV1 } = useMutation(userLoginAccount);
    const { mutateAsync: resendVerificationMail } = useMutation(resendConfermationEMail);
    const loginAccount = async (email, password) => {
        setBtnDisabled(true);
        const response = await loginApiCall({ username: email.split("@")[0], password: password });
        if (response.status) {
            toast.success("Login successfully");
            userLoginV1(email, password);
            setTimeout(() => {
                setBtnDisabled(false);/////login , signup ,forget account btn disaabled after clicking
                window.location = "/";
            }, [1500])
        } else {
            ////////user account created but user account not activated//////
            if (response.error.message === "User is not confirmed.") {
                setShowVeriCon(true);
                const mailApiRes = await resendVerificationMail({ username: email.split("@")[0] });
                if (mailApiRes.status) {
                    toast.info("Please check your mail inbox.");
                    setBtnDisabled(false);
                } else {
                    toast.error(mailApiRes.error.message);
                    setBtnDisabled(false);
                }
            } else {
                setBtnDisabled(false)
                toast.error(response.error.message);
            }
        }
    }

    ///////// when click on the signup button then code run 
    const { mutateAsync: SignUpFunCall, isLoading: isLoadingSignUpFun } = useMutation(CognitoSignUp);
    const { mutateAsync: SignUpFunCallV1, isLoading: isLoadingSignUpFunV1 } = useMutation(userCreateAccount);
    const createAccount = async (name, email, password) => {
        const userName = email.split('@')[0];
        const userEmail = email;
        const userPassword = password;
        const response = await SignUpFunCall({ username: userName, email: userEmail, password: userPassword })
        if (response.status && response.data.userSub) {
            toast.info("Please check your inbox");
            await userInsertv1(name, email, password);
        } else {
            toast.error(response.error.message);
        }

    }
    const userInsertv1 = async (name, email, password) => {
        const createUserDetOject = { name, email, password };
        try {
            setShowVeriCon(true);
            const response = await SignUpFunCallV1(createUserDetOject);
            if (response.status) {
                console.log("data created in v1");
            }
        } catch (error) {
            console.log(error.response.data.message);
        }

    }

    const userLoginV1 = async (email, password) => {
        try {
            const response = await loginV1({ email, password });
            if (response.status) {
                localStorage.setItem("userInfo", JSON.stringify(response))
            } else {
                console.log("User not login in v1");
            }

        } catch (error) {
            console.log(error.response.data.message);
        }

    }

    ///////// Signup otp verification/////////
    const { mutateAsync: SignUpOtpVerification } = useMutation(SignUpOtpVarify);
    const signupVerificationOtp = async (email, getOtp) => {
        setVerifyBtnDisabled(true);
        const userName = email.split('@')[0];
        const otpResponse = await SignUpOtpVerification({ username: userName, userOtp: getOtp });
        if (otpResponse.status) {
            const response = await loginApiCall({ username: userName, password: password });
            if (response.status) {
                toast.success("OTP verified successfully.Please wait we are setup your account.");
                setTimeout(async () => {
                    localStorage.clear();
                    const AgainLoginresponse = await loginApiCall({ username: userName, password: password });
                    if (AgainLoginresponse.status) {
                        userLoginV1(email, password);
                        setVerifyBtnDisabled(false)
                        setTimeout(() => {
                            window.location = "/companyDetail";
                        }, [1000])
                    }
                }, [1000])
            }
        } else {
            toast.error(otpResponse.error.message);
            setVerifyBtnDisabled(false);
        }
    }

    ///////// resend otp 
    const { mutateAsync: resetPasswordFunCall, isLoading: resetPasswordIsLoading } = useMutation(resetPasswordFun);
    const resendOtpInMail = async (email) => {
        const response = await resetPasswordFunCall({ username: email.split("@")[0] });
        if (response.status) {
            toast.info("Otp send in your mail please check your mail inbox.");
            setShowVeriCon(true);
        } else {
            toast.error(response.error.message);
        }
    }


    //////// change password api call or Reset password code here when user in forget passsword page 
    const { mutateAsync: updatePasswordWithOtp } = useMutation(otpWithResetPassword);
    const updateNewPassword = async (email, GetOtp, newPassword) => {
        setVerifyBtnDisabled(true)
        let userName = email.split('@')[0]
        const updatePassword = await updatePasswordWithOtp({ username: userName, otp: GetOtp, password: newPassword });
        if (updatePassword.status) {
            toast.success("Password update successfullly.Please wait we are redirect in login page.");
            setTimeout(() => {
                setVerifyBtnDisabled(false)
                window.location = "/login";
            }, [3000])
        } else {
            toast.error(updatePassword.error.message);
            setVerifyBtnDisabled(false)
        }
    }

    ///////Service type  change then useEffect Run
    useEffect(() => {
        // setFullName("");
        setFirstName("");
        setLastName("")
        setEmailAddress("");
        setPassword("");
        setConfirmPassword("");
    }, [serviceType])

    /////////// when clickk on the button Like -  login , signup , forget password
    const buttonAction = async (serviceType) => {
        if (serviceType === "login") {
            if (emailAddress === "" || password === "") {
                toast.error("Please fill all fields.")
                return null;
            }
            loginAccount(emailAddress, password);
        }

        if (serviceType === "signup") {
            if (firstName === "" || lastName === "" || emailAddress === "" || password === "" || confirmPassword === "") {
                toast.error("Please fill all fields.")
                return null;
            }
            if (password !== confirmPassword) {
                toast.error("Password and confirm password not matched.")
                return null;
            }
            if (!passwordValidator(password) || !passwordValidator(confirmPassword)) {
                return null;
            }
            await createAccount(firstName, lastName, emailAddress, password);
            // await createAccount(firstName, lastName, emailAddress, password);
        }

        if (serviceType === "forgetPassword") {
            if (emailAddress === "" || password === "" || confirmPassword === "") {
                toast.error("Please fill all fields.")
                return null;
            }
            if (password != confirmPassword) {
                toast.error("Password and confirm password not matched.")
                return null;
            }
            resendOtpInMail(emailAddress);
        }

    }

    ////////// When click on the verify button
    const otpVerifyBtn = async (serviceType) => {
        if ((OtpValue === "") || (OtpValue.length !== 6)) {
            toast.error("Please enter six digit OTP.");
            return null;
        }
        if (serviceType === "login") {
            await signupVerificationOtp(emailAddress, OtpValue);
        }

        if (serviceType === "signup") {
            await signupVerificationOtp(emailAddress, OtpValue);
        }

        if (serviceType === "forgetPassword") {
            updateNewPassword(emailAddress, OtpValue, password)
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfPassword = () => {
        setShowConfPass(!showConfPass);
    }


    const bgImgForLoginSignUpForgetVarify = (serviceType) => {
        switch (serviceType) {
            case "login":
                return <img src={loginPageBackgroundImg} style={{ width: "70%" }} alt="login-page-background-image" />
                break;
            case "start":
                return <img src={loginPageBackgroundImg} style={{ width: "60%" }} alt="login-page-background-image" />
                break;
            case "signup":
                return <img src={signupPageBgImg} style={{ width: "80%" }} alt="signUp-page-background-image" />
                break;
            case "forgetPassword":
                return <img src={forgetPassPageBGImg} style={{ width: "100%" }} alt="forget-password-page-background-image" />
                break;
            case "verification":
                return <img src={otpVerificationBgImg} style={{ width: "100%" }} alt="login-page-background-image" />
                break;
            default:
                break;
        }
    }




    return (
        <Box container sx={cssStyle.parent_box}  >
            <Grid container >
                <Grid item xs={12} sm={12} md={6} >
                    <Box container sx={{ ...cssStyle.content_container_box, padding: "6% 5% 10% 20% !important" }}  >
                        <Box >
                            <img
                                src={organaiseLogo}
                                style={{ width: "150px" }}
                                alt="organaise-logo-login-page" />
                        </Box>
                        <Box >
                            <img src={otpVerificationBgImg} style={{ width: "100%" }} alt="login-page-background-image" />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    
                        <Box container sx={{ ...cssStyle.content_container_box, padding: "15% 20%" }} >
                            <Box>
                                <Typography variant="h4" align='center' fontWeight='600' color="#333333">
                                    OTP Verification
                                </Typography>
                                <Typography variant="subtitle1" align='center' fontWeight='400' color="#333333">
                                    We’ve sent a code to {emailAddress}
                                </Typography>
                            </Box>
                            <Box sx={cssStyle.box_container_form}>
                                <Grid container>
                                <Grid item xs={12} sx={cssStyle.grid_textBox_button} paddingY={2}>
                                        <OtpField
                                            value={OtpValue}
                                            onChange={setOtpValue}
                                            numInputs={6}
                                            onChangeRegex={/^([0-9]{0,})$/}
                                            autoFocus
                                            // separator={<span>-</span>}
                                            isTypeNumber
                                            inputProps={{
                                                className: `otp-field__input`,
                                                disabled: false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={cssStyle.grid_textBox_button} paddingY={4}>
                                        <Typography variant="subtitle1" align='center' fontWeight='400' color="#333333">
                                            Didn’t receive OTP? <span style={{ fontWeight: 700, color: "#1c529b" }}>Resend</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={cssStyle.grid_textBox_button}>
                                        <Button variant="contained"
                                            sx={{
                                                ...cssStyle.btn_textfield,
                                                height: "50px", position: "relative",
                                                backgroundColor: "primary",
                                                '&:hover': {
                                                    backgroundColor: '#1c529b' // background color on hover
                                                }
                                            }}
                                            disabled={verifyBtnDisable}
                                            onClick={() => otpVerifyBtn(serviceType)}
                                        >

                                            {verifyBtnDisable && (
                                                <CircularProgress
                                                    size={24}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '3%',
                                                        marginTop: -12,
                                                        marginLeft: -12,
                                                        color: "#1c529b"
                                                    }}
                                                />
                                            )}
                                            Verify OTP
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OtpVerfPage