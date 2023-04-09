import {
    Box, Grid, Typography, TextField,
    Button, InputAdornment, IconButton,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import organaiseLogo from "../../assets/Logo/organaise-logo.png";
import forgetPassPageBGImg from "../../assets/BackgroundImages/forgetPasswordBgImg.png"
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/////Import react query functions
import { useMutation } from 'react-query'
import {
    CognitoSignUp,
    otpWithResetPassword, resetPasswordFun
} from "../../api/CognitoApi/CognitoApi";
import { userCreateAccount, userLoginAccount } from '../../api/InternalApi/OurDevApi';
import { ServiceState } from '../../Context/ServiceProvider';
import { useNavigate, Link } from 'react-router-dom';
const cssStyle = {
    parent_box: {
        width: "100%",
        maxWidth: "1200px",
        height: "100vh"
    },
    content_container_box: {
        backgroundColor: "#ffffff",
        // padding: "10% 20%",
        padding: "10% 10%",
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

const ForgetPage = () => {


    const [showConfPass, setShowConfPass] = useState(false);
    const [showOtpVeriCont, setShowVeriCon] = useState(false);
    /////Store email address
    const [emailAddress, setEmailAddress] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    /////// btn disabled until operation  not completed
    const [btnDisabed, setBtnDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    /////// Verify button disaabled until operation not complete
    const [verifyBtnDisable, setVerifyBtnDisabled] = useState(false);

    const { serviceType, setSeviceType, setContextEmail, setContextPassword } = ServiceState();
    const navigate = useNavigate();
    const { mutateAsync: resetPasswordFunCall, isLoading: resetPasswordIsLoading } = useMutation(resetPasswordFun);
    const resendOtpInMail = async (email) => {
        const response = await resetPasswordFunCall({ username: email.split("@")[0] });
        if (response.status) {
            toast.info("Otp send in your mail please check your mail inbox.");
            setShowVeriCon(true);
            setSeviceType('forgetPassword');
            setContextEmail(emailAddress);
            setContextPassword(password)
            navigate("/otpVerf")
        } else {
            toast.error(response.error.message);
        }
    }

    const { mutateAsync: SignUpFunCall, isLoading: isLoadingSignUpFun } = useMutation(CognitoSignUp);
    const { mutateAsync: SignUpFunCallV1, isLoading: isLoadingSignUpFunV1 } = useMutation(userCreateAccount);
    const createAccount = async (name, email, password) => {
        const userName = email.split('@')[0];
        const userEmail = email;
        const userPassword = password;
        const response = await SignUpFunCall({ username: userName, email: userEmail, password: userPassword })
        if (response.status && response.data.userSub) {
            toast.info("Please check your inbox");
            await userInsertv1(email);
        } else {
            toast.error(response.error.message);
        }

    }



    const buttonAction = async () => {

        if (emailAddress === "") {
            toast.error("Please fill email.")
            return null;
        }

        resendOtpInMail(emailAddress);
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfPassword = () => {
        setShowConfPass(!showConfPass);
    }

    return (
        <Box container  >
            <Grid container padding={7}>
                <Grid item xs={12} sm={12} md={6}  >
                    <Box container display='flex' flexDirection='column'>
                        <Box paddingLeft={4}>
                            <img
                                src={organaiseLogo}
                                style={{ width: "150px" }}
                                alt="organaise-logo-login-page" />
                        </Box>
                        <Box paddingLeft={4}>
                            <img src={forgetPassPageBGImg} style={{ width: "70%" }}

                                alt="forget-password-page-background-image" />
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} display='flex' justifyContent='center'  >
                    <Box >

                        <Box display='flex' justifyContent='center'>

                            <Grid container xs={8} >

                                <Typography marginBottom={4} variant="h4" fontWeight='600' color="#333333">

                                    Forget Password
                                </Typography>

                                <Grid item xs={12} sx={cssStyle.grid_textBox_button}>
                                    <TextField
                                        id="login-signup-forgetPassword-email"
                                        label="Email"
                                        variant='outlined'
                                        type="email"
                                        sx={cssStyle.btn_textfield}
                                        value={emailAddress ? emailAddress : ""}
                                        onChange={(e) => setEmailAddress(e?.target?.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={cssStyle.grid_textBox_button}>
                                    <TextField
                                        id="login-signup-forgetPassword-password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant='outlined'
                                        sx={cssStyle.btn_textfield}
                                        value={password ? password : ""}
                                        onChange={(e) => setPassword(e?.target?.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end"
                                                    sx={{
                                                        display: password !== "" ? "contents" : "none"
                                                    }}
                                                >
                                                    {password.length > 2
                                                        ?
                                                        <IconButton onClick={handleTogglePassword}>
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        : null
                                                    }
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    {
                                        serviceType === "login" &&
                                        <Typography variant="subtitle2" align='right'>
                                            <Link to="/forget-password" style={{ textDecoration: "none", color: "red" }}>
                                                Forget Password?
                                            </Link>
                                        </Typography>

                                    }
                                </Grid>

                                <Grid item xs={12} sx={cssStyle.grid_textBox_button}>
                                    <TextField
                                        id="login-signup-forgetPassword-confirm-password"
                                        label="Confirm Password"
                                        type={showConfPass ? 'text' : 'password'}
                                        variant='outlined'
                                        sx={cssStyle.btn_textfield}
                                        value={confirmPassword ? confirmPassword : ""}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end"
                                                    sx={{
                                                        display: confirmPassword !== "" ? "contents" : "none"
                                                    }}

                                                >
                                                    {confirmPassword.length > 2
                                                        ?
                                                        <IconButton onClick={handleToggleConfPassword}>
                                                            {showConfPass ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        : null
                                                    }
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={cssStyle.grid_textBox_button}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            ...cssStyle.btn_textfield,
                                            height: "50px", position: "relative",
                                            backgroundColor: "primary",
                                            '&:hover': {
                                                backgroundColor: '#1c529b' // background color on hover
                                            }
                                        }}
                                        disabled={btnDisabed || isLoadingSignUpFun}
                                        onClick={() => buttonAction()}

                                    >
                                        {(btnDisabed || isLoadingSignUpFun) && (
                                            <CircularProgress
                                                size={24}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: '3%',
                                                    marginTop: -12,
                                                    marginLeft: -12,
                                                    color: "primary"
                                                }}
                                            />
                                        )}

                                        Send OTP

                                    </Button>
                                    <Typography marginTop={3} variant="subtitle2" align='center'>
                                        I want to login so &nbsp;<Link to="/login">
                                            Click Here
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ForgetPage