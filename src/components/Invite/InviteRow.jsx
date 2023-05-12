import {Typography,Grid,Box,Avatar,Chip} from '@mui/material'
import InviteMenu from "./InviteMenu";
import { InviteStateContext } from '../../Context/InviteProvider';

const InviteRow = ({inviteObj,refetch}) => {
    const {emailContext}=InviteStateContext()
  return (
    <Grid container textAlign={'center'} bgcolor={'white'} padding={'.9rem'}>
        <Grid item xs={3} alignSelf={'center'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1683130461600-7ce41d9c27cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" sx={{ width: 33, height: 33,marginRight:"1rem" }}/>
                <Typography>
                    {emailContext===inviteObj?.email?inviteObj?.invitedMemberUserid?.name:inviteObj?.invitedReciverMemberUserid?.name||"Anonymous"}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={5} alignSelf={'center'}>
            {emailContext===inviteObj?.email?inviteObj?.invitedMemberUserid?.email:inviteObj?.email}
        </Grid>
        <Grid item xs={3} alignSelf={'center'}>
            {
                inviteObj?.invitationStatus==='accepted'&&<Chip label="Accepted" color='success' variant="outlined" sx={{borderRadius:'0'}}/>
            }
            {
                inviteObj?.invitationStatus==='rejected'&&<Chip label="Rejected" color="error" variant="outlined"  sx={{borderRadius:'0'}}/>
            }
            {
                inviteObj?.invitationStatus==='pending'&&<Chip label="Pending" variant="outlined" sx={{borderRadius:'0',color:"grey"}}/>
            }
            
        </Grid>
        {emailContext!==inviteObj?.email&&<Grid item xs={1} alignSelf={'center'}>
            <InviteMenu inviteId={inviteObj?._id} refetch={refetch}/>
        </Grid>}
    </Grid>
  )
}

export default InviteRow