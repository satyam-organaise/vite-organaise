import React, { useState } from 'react';
import { Typography, Avatar, Box, Checkbox } from '@mui/material';

const cssStyle = {
  firstBoxMessage: { height: "80vh", backgroundColor: "#ffffff", marginTop: "0px" },
  groupNameBox: {
      position: "sticky", top: "65px", width: "100%", height: "50px", zIndex: "100",
      background: "#ffffff", boxSizing: "border-box",
      borderBottom: "1px solid #F1F1F1"
  },
  avatarCss: { width: "25px", height: "25px" },
  listofPeopeBtn: { paddingLeft: "10px", paddingRight: "10px", fontSize: "11px" },
  timeRecMess: { fontSize: "10px", lineHeight: "25px", paddingLeft: "5px" },
  recRealMess: {
      paddingRight: "30px", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px",
      fontSize: "14px", lineHeight: "15px", color: "black", background: "#F2F2F2", borderRadius: "0px 10px 10px 10px", fontWeight: '400'
  },
  sendRealMess: {
      paddingRight: "10px", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px",
      fontSize: "14px", lineHeight: "15px", background: "#448DF0", color: "white", borderRadius: "10px 0px 10px 10px", fontWeight: "400"
  },
  sendMessInput: {
      "& input": {
          fontSize: "13px !important"
      },
      "& fieldset": {
          borderRadius: "50px",
      }
  },
  sendMessIcon: {
      position: "absolute", right: "5px", top: "4px", fontSize: "28px", backgroundColor: "#333333", borderRadius: "25px", padding: "5px", color: "#fff", cursor: "pointer"
  },
  messageBoxCon: {
      backgroundColor: "#ffffff",
      height: "75vh", width: "100%", position: "absolute", overflowY: "auto",
      '&::-webkit-scrollbar': {
          width: '0px',
      },
      '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
      },
  }
}


export default function ButtonHovers({ name,email }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [btn, setBtn] = useState(false)

  const handleHoverOpen = () => {
    setBtn(true);
  }


  const handleHoverClose = () => {
    setBtn(false);
  }


  return (
    <Box position='relative' zIndex={100} >
    <Box position='absolute'>
      <Avatar onMouseOver={handleHoverOpen} onMouseLeave={handleHoverClose}
        sx={{ ...cssStyle.avatarCss, width: "30px", height: "30px",cursor:'pointer', zIndex:"2" }}
        alt={name[0].toUpperCase()}
        src="https://mui.com/static/images/asdfavatar/1.jpg"
      />
      {btn &&
        <Box bgcolor="white" display={'flex'} justifyContent={'center'} alignItems={'center'} width={'300px'} height={"80px"} onMouseLeave={handleHoverClose} 
        marginLeft={5}
        boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px"
        // boxShadow= "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
        >
          <Box display={'flex'} gap={3} justifyContent={'left'} alignItems={'center'}  >
            <Box flex={0.15}>
              <Avatar
                src="https://images.pexels.com/photos/16085452/pexels-photo-16085452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt={name[0].toUpperCase()}
                sx={{ width: 45, height: 45, pointerEvents: "none" }}
              >{name[0].toUpperCase()}</Avatar>
            </Box>
            <Box>
              <Typography fontWeight='bold'>{name}</Typography>
              <Typography fontWeight='300' fontSize='13px'>{email}</Typography>
              <Typography fontWeight='300' fontSize='12px'>Available</Typography>
            </Box>
          </Box>
          {/* <Box paddingTop={1}>
            <Typography fontWeight='300' fontSize='12px'>Edit name</Typography>
          </Box> */}
          {/* <Box paddingTop={1}>
            <Typography fontWeight='bold' fontSize='12px'>Contact</Typography>
            <Box display='flex' justifyContent={"left"} alignItems='center'>
              <Checkbox />
              <Typography fontWeight='300' fontSize='12px'>Available</Typography>
            </Box>
          </Box> */}
        </Box>
      }
    </Box>
    </Box>
  );
}