import {Box, Grid, Typography,Button, Checkbox} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react'
import organaiseLogo from "../../assets/Logo/organaise-logo.png"
import WhoIAmBg from "../../assets/BackgroundImages/WhoAmI.png"

const cssStyle = {
    parent_box: {
        width: "100%",
        maxWidth: "1200px",
        height: "100vh"
    },
    content_container_box: {
        backgroundColor: "#ffffff",
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

const WhoIAm = () => {
    const [verifyBtnDisable, setVerifyBtnDisabled] = useState(false);

    return (
        <Box container  >
            <Grid container padding={{ xs: 1, sm: 5 }}>
                {/* grid1 */}
                <Grid item xs={12} sm={6} >
                    <Box container display={{ xs: 'flex', sm: 'center' }} flexDirection='column'>
                        <Grid item xs={12} sm={12} paddingLeft={{ xs: 2, sm: 12 }}  >
                            <img
                                src={organaiseLogo}
                                style={{ width: "150px" }}
                                alt="organaise-logo-login-page" />
                        </Grid>
                        <Grid item xs={12} sm={12} display='flex' flexDirection='column' justifyContent={{ xs: 'center', sm: 'center' }} paddingLeft={{ xs: '0%', sm: '4%' }}  >
                            <Typography variant="h4" textAlign={{ xs: 'center',sm:'left' }} fontSize={{ xs: '26px', sm: '28px', md: '40px' }} fontWeight='600' color="#333333"  marginY={{ xs: 3, sm: 2 }}>
                               Who I Am ?
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>

                {/* Grid2 */}
                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}  >
                    <Grid container xs={12} display='flex' justifyContent='center'>
                        <Grid item xs={12} sm={6} paddingBottom={2} >
                            <Box paddingLeft={4} display='flex' justifyContent='center' >

                                <img src={WhoIAmBg} style={{ width: "55%" }} alt="login-page-background-image" />
                            </Box>
                        </Grid>


                        <Grid item xs={12} sm={6}  display='flex' justifyContent={{xs:'center',sm:'center'}} >
                            <Grid item xs={12} sm={12} md={10}  display='flex' justifyContent={{xs:'center',sm:'center'}} flexDirection='column'>
                                <Grid item xs={12} sx={cssStyle.grid_textBox_button} display='flex' flexDirection='column' justifyContent={{xs:'center',sm:'center'}}  paddingTop={4} >
                                    
                                    <Box display='flex' alignItems='center' paddingX={'10px'}  paddingBottom='4'>
                                        <Checkbox />
                                        <Typography>Individual Company</Typography>
                                    </Box>                                  

                                    <Box display='flex' alignItems='center' paddingX={'10px'} >
                                        <Checkbox/>
                                        <Typography>A Company</Typography>
                                    </Box>                                  
                                </Grid>

                              
                                <Grid item xs={12} md={12} sx={cssStyle.grid_textBox_button}  display='flex'  justifyContent={{xs:'center',sm:'center', md:'left'}} alignItems='center' >
                                  <Box width='90%'>
                                  <Button variant="contained"
                                        sx={{
                                            ...cssStyle.btn_textfield,
                                            height: "45px", position: "relative",
                                            backgroundColor: "primary",
                                            marginTop:'60px',
                                            '&:hover': {
                                                backgroundColor: '#1c529b' // background color on hover
                                            }
                                        }}
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
                                        Continue
                                    </Button>
                                  </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WhoIAm

