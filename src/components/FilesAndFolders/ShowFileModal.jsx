import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CardMedia, Typography,Box } from '@mui/material';
import FileIcon from '../FileUploadModal/Icons/FileIcon';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import RoundRotationAudioIcon from '../../assets/svg/RoundRotationAudioIcon';

const ShowFileModal = ({handleOpen,fileObj,fileSize}) => {
    const [fileExtension,setFileExtension]=useState("")
    const [open, setOpen] = useState(true);
    // const [content,setContent]=useState("");
    // const handleClickOpen = () => {
    //   setOpen(true);
    // }

    const style = {
        roundIcon: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#f0f0f0', // Customize the background color
          cursor: 'pointer',
          animation: '$spin 2s infinite linear', // Apply the animation
        },
        '@keyframes spin': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        }, 
  }
    
    const handleClose = () => {
      setOpen(false);
    };



    useEffect(()=>{
        if(handleOpen===true)
        {
            setOpen(true)
        }
    },[handleOpen])
    
    useEffect(()=>{
        const ext=fileObj?.fileURL?.split('.').pop()
        setFileExtension(ext)
    },[])

    return (
      <div>
        {/* <Button onClick={handleClickOpen}>Open Modal</Button> */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{fileObj.fileName}</DialogTitle>
          <DialogContent>
            {  fileExtension==='mp3'?(
              <Box minHeight={240} minWidth={380} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} boxSizing={'border-box'}>
                <Box className='App-logo' display={'flex'} alignItems={'center'}>
                <PlayCircleOutlineOutlinedIcon sx={{fontSize:'10rem',color:'#90caf9'}} style={{
                  animation: 'spin 2s infinite linear', // Apply the animation
                }}/>
                </Box>
                <Box>
                <audio controls autoPlay>
                  <source src={fileObj.fileURL} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                </Box>
              </Box>
              ):(fileExtension==='PNG'||fileExtension==='JPG'||fileExtension==='.JPEG'||fileExtension==='.jpeg'||fileExtension==='jpeg')?<CardMedia
                component="img"
                minHeight="194"
                minWidth="494"
                image={fileObj.fileURL}
                alt="Paella dish"
                />:(fileExtension==='mp4'||fileExtension==='mkv'||fileExtension==='mov')?<video width="100%" height="100%" autoplay controls>
                <source src={fileObj.fileURL} type="video/mp4"/>
              </video>:(
                <Box minHeight={220} minWidth={380} display={'flex'} flexDirection={'column'} justifyContent={'center'}>

                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} hei>
                    <FileIcon ext={fileExtension} maxH='150px'/>
                    <Typography>{fileSize}</Typography>
                  </Box>
                  
                </Box>
              )
            }
            <Box my={'1.5rem'} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
              <Button variant='outlined' color='error' sx={{width:'45%'}} onClick={handleClose}>Cancel</Button>
              <Button variant='contained' sx={{width:'45%'}}>Download</Button>
            </Box>
            
          </DialogContent>
          {/* {(fileExtension==='PNG'||fileExtension==='JPG'||fileExtension==='.JPEG'||fileExtension==='.jpeg'||fileExtension==='jpeg'||fileExtension==='mp3'||fileExtension==='mp4'||fileExtension==='mkv'||fileExtension==='mov')&&<DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>} */}
        </Dialog>
      </div>
    );
  };
  
  export default ShowFileModal