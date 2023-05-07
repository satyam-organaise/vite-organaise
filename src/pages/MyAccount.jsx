import React, { useState,useEffect } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ListIcon from '@mui/icons-material/List';
import AvatarEditor from 'react-avatar-edit';
import { ChatState } from '../Context/ChatProvider';
import {Typography,Grid,Box,TextField,InputAdornment,MenuItem,Divider,Avatar,Button,ButtonGroup,Dialog,DialogContent,DialogActions} from '@mui/material'


const MyAccount = ({closeSideList}) => {
    const [avatar, setAvatar] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
    setOpen(false);
    };

    //Index prop defiend by according to this array
    //['dashboard', 'message', 'folder', 'data', 'privacy-policy', 'settings'];
    const { setPageNameContext,setCloseSideList } = ChatState();

    const currencies = [
        {
          label: '$ United Stated Of America',
        },
        {
          label: '€ United Kingdom',
        },
        {
          label: '₹ India',
        },
        {
          label: '¥ Japan',
        },
      ];

      const time = [
        {
          value: 'USD',
          label: 'Pacific Standard Time (PST) UTC−08:00',
        },
        {
          value: 'USD',
          label: 'Pacific Time (PST) UTC−08:00',
        },
        {
          value: 'USD',
          label: 'Standard Time (PST) UTC−08:00',
        },
        {
          value: 'USD',
          label: 'Pacific Standard (PST) UTC−08:00',
        },
      ];


      
      useEffect(() => {
        // setLoading(true)
        // getFilesOfUser();
        setPageNameContext("data")
        setCloseSideList(true);
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1 }} pl={'2rem'} pt='1rem'>
                
                
                <Grid container>
                    <Box>
                        <Typography fontSize={'25px'} fontWeight={600}>My Account</Typography>
                    </Box>
                </Grid>

                {/* Name */}
                <Grid container my={'1rem'}>
                    <Grid xs={6} md={5} display={'flex'} alignItems={'center'}>
                        <Box>
                            <Typography fontSize={'16px'} fontWeight={400}>Name</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7}>
                        
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                        <TextField
                            id="outlined-helperText"
                            defaultValue="Olivia"
                            size='sm'
                            sx={{width:"48%"}}
                            disabled
                            />
                        <TextField
                            id="outlined-helperText"
                            defaultValue="Colson"
                            size='sm'
                            sx={{width:"48%"}}
                            disabled
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider/>

                {/* Email */}
                <Grid container  my={'1rem'}>
                    <Grid xs={6} md={5} display={'flex'} alignItems={'center'}>
                        <Box>
                            <Typography  fontSize={'16px'} fontWeight={400}>Email address</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7}>
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                            <TextField
                                id="outlined-helperText"
                                defaultValue="olivia@untitledui.com"
                                fullWidth
                                disabled
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                        </InputAdornment>
                                    )}}
                                />
                        </Box>
                    </Grid>
                </Grid>

                <Divider/>

                {/* Profile */}
                <Grid container  my={'1rem'}>
                    <Grid xs={6} md={5} display={'flex'} alignItems={'center'}>
                        <Box>
                            <Typography fontSize={'16px'} fontWeight={500}>Your Photo</Typography>
                            <Typography fontSize={'14px'} fontWeight={300}>This will be displayed on your profile.</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7}>
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                            <Box flex={0.15} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                {/* <Avatar
                                alt="Remy Sharp"
                                src="https://images.pexels.com/photos/16085452/pexels-photo-16085452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                sx={{ width: 65, height: 65,pointerEvents:"none" }}
                                /> */}
                                <Box
                 onClick={() => setOpen(true)}>
                <Avatar
                alt="Remy Sharp"
                src="https://images.pexels.com/photos/16085452/pexels-photo-16085452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                sx={{ width: 65, height: 65,pointerEvents:"none" }}
                />
                </Box>
                            </Box>
                            <Box flex={0.80} border={' 1px dashed #EAECF0'} borderRadius={'8px'} padding={' 16px 24px'}>
                                <Box display={'flex'} justifyContent={'center'}>
                                <CloudUploadOutlinedIcon/>
                                </Box>
                                <Box>
                                    <Typography textAlign={'center'} fontSize={'14px'}><Typography as='span' color='#448DF0' sx={{cursor:"pointer"}}>Click to upload
                                        </Typography> or drag and drop</Typography>
                                </Box>
                                <Box>
                                    <Typography  textAlign={'center'} fontSize={'14px'}>SVG, PNG, JPG or GIF (max. 800x400px)</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider/>
                
                {/* Role
                <Grid container  my={'1rem'}>
                    <Grid xs={6} md={5} display={'flex'} alignItems={'center'}>
                        <Box>
                            <Typography fontSize={'16px'} fontWeight={400}>Role</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7}>
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                            <TextField
                                defaultValue="Product Designer"
                                fullWidth
                                />
                        </Box>
                    </Grid>
                </Grid> */}

                <Divider/>
                
                {/* Country */}
                <Grid container  my={'1rem'}>
                    <Grid xs={6} md={5} display={'flex'} alignItems={'center'}>
                        <Box>
                            <Typography fontSize={'16px'} fontWeight={500}>Country</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7}>
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            defaultValue="$ United Stated Of America"
                            fullWidth
                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.label} >
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Box>
                    </Grid>
                </Grid>
                
                <Divider/>
                
                {/* Timezone */}
                {/* <Grid container  my={'1rem'}>
                    <Grid xs={6} md={5} display={'flex'} alignItems={'center'}>
                        <Box>
                            <Typography fontSize={'16px'} fontWeight={500}>Timezone</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7}>
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            defaultValue="Pacific Standard Time (PST) UTC−08:00"
                            fullWidth
                            >
                            {time.map((option) => (
                                <MenuItem key={option.value} value={option.label}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Box>
                    </Grid>
                </Grid> */}
                
                <Divider/>

                {/* Bio */}
                <Grid container my={'1rem'}>
                    <Grid xs={6} md={5} display='flex' alignItems={'center'}>
                        <Box>
                            <Typography fontSize={'16px'} fontWeight={500}>About</Typography>
                           
                        </Box>
                    </Grid>
                    <Grid xs={6} md={7} >
                      
                        <Box width={'80%'} display={'flex'} justifyContent={'space-between'}>
                        <TextField
                        placeholder='Enter your Bio'
                            defaultValue="I'm a Product Designer based in Melbourne, Australia."
                            // multiline
                            rows={4}
                            maxRows={4}
                            fullWidth
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Submit */}
                <Grid container display={'flex'} justifyContent={'flex-end'} mt='2rem' mb='1rem'>
                    <Box width={'30%'} display={'flex'} justifyContent={'space-evenly'} mr='8rem'>
                        <Button variant="outlined" size="large" sx={{width:'45%'}}>Discard</Button>
                        <Button variant="contained" size="large" sx={{width:'45%'}}>Save</Button>
                    </Box>
                </Grid>

                
                <Dialog open={open}
                onClose={handleClose} margin={10}>
                
                <DialogContent>
                <AvatarEditor
                    width={400}
                    height={350}
                    image={avatar}
                    onCrop={(croppedImage) => setAvatar(croppedImage)}
                />
                </DialogContent>
                <DialogActions>
            
                <Button onClick={handleClose} variant='outlined' color='error'>Cancel</Button>
                <Button onClick={handleClose} variant='contained' >Save Avatar</Button>
                </DialogActions>
                    
                </Dialog>
                
            </Box>
        </>
    )
}

export default MyAccount