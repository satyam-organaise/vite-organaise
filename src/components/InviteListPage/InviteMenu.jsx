import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { resendInvitationApi,deleteInviteStatusApi } from '../../api/InternalApi/OurDevApi';

export default function InviteMenu({inviteId,isSender,refetch}) {
  console.log(refetch)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  const resendFunction =async() =>{
    try{
      const obj={
        "invitationId":inviteId
      }
      const response = await resendInvitationApi(obj);
      refetch()
      handleClose();
      
    }catch(error)
    {
      console.log(error)
    }
  }

  const deleteFunction =async() =>{
    try{
      const obj={
        data:{"invitationId":inviteId}
      }
      const response = await deleteInviteStatusApi(obj);
      console.log(response);
      refetch()
      handleClose()
      
    }catch(error)
    {
      console.log(error)
    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={resendFunction}>Invite Again</MenuItem>
        <MenuItem onClick={deleteFunction}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
