import {
  Box, Grid, Typography, TextField,
  Button, IconButton, InputAdornment
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState,useEffect} from 'react'
import organaiseLogo from "../../assets/Logo/organaise-logo.png";
import loginPageBackgroundImg from "../../assets/BackgroundImages/loginBackGroundImg.png"
import forgetPassPageBGImg from "../../assets/BackgroundImages/forgetPasswordBgImg.png"
import signupPageBgImg from "../../assets/BackgroundImages/signupBackgroundImg.png"
import otpVerificationBgImg from "../../assets/BackgroundImages/otpVerificationBgImg.png"
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
    margin: "20% 0%",
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

const LoginPage = () => {
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
  const [btnDisabed, setBtnDisabled] = useState(false);
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
  // useEffect(() => {
  //   // setFullName("");
  //   setFirstName("");
  //   setLastName("")
  //   setEmailAddress("");
  //   setPassword("");
  //   setConfirmPassword("");
  // }, [serviceType])
  const bgImgForLoginSignUpForgetVarify = () => {
    switch (s) {
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

  const buttonAction = async () => {
   
      if (emailAddress === "" || password === "") {
        toast.error("Please fill all fields.")
        return null;
      }
      loginAccount(emailAddress, password);
    }


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfPassword = () => {
    setShowConfPass(!showConfPass);
  }

  return (
    <Box container sx={cssStyle.parent_box}  >
      <Grid container >
        <Grid item xs={12} sm={12} md={8} >
          <Box container sx={{ ...cssStyle.content_container_box, padding: "6% 5% 10% 20% !important" }}  >
            <Box >
              <img
                src={organaiseLogo}
                style={{ width: "150px" }}
                alt="organaise-logo-login-page" />
            </Box>
            <Box >
              <img src={loginPageBackgroundImg} style={{ width: "70%" }} alt="login-page-background-image" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} >
        <Box sx={cssStyle.box_container_form}>
          <Grid container>
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

              <Typography variant="subtitle2" align='right'>
                <Link to="/forget-password" style={{ textDecoration: "none", color: "red" }}>
                  Forget Password?
                </Link>
              </Typography>
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
              // disabled={btnDisabed || isLoadingSignUpFun}
              // onClick={() => buttonAction(serviceType)}

              >
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
                Login

              </Button>

            </Grid>


            <Grid item xs={12} sx={cssStyle.grid_textBox_button}>
              <Typography variant="subtitle2" align='center'>
                I don't have account so <Link to="/signup">
                  Click Here
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginPage