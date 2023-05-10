import React from 'react';
import {Box,Grid} from "@mui/material"

const InviteHeader = ({first,second,third}) => {
  return (
    <Box padding={"0 1rem"}>
        <Grid
        container
        textAlign={"center"}
        bgcolor={"#448DF0"}
        padding={"1rem 0"}
        color="white"
        fontSize={"19px"}
        fontWeight={600}
        borderRadius={"10px"}
        >
        <Grid item xs={3}>
            {first}
        </Grid>
        <Grid item xs={5}>
            {second}
        </Grid>
        <Grid item xs={3}>
            {third}
        </Grid>
        </Grid>
    </Box>
  )
}

export default InviteHeader