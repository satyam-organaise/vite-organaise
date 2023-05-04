import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAllFilesApi } from '../../../api/InternalApi/OurDevApi';
import FileIcon from '../../FileUploadModal/Icons/FileIcon';
import { Divider, Checkbox, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ServerFile from './ServerFile';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 555,
    height: 600,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 1,
    border: '1px solid gray'
};

export default function ServerFilesModal({ closeModal }) {
    const [open, setOpen] = useState(false);
    const [userFiles, setUserFiles] = useState([]);
    const [allUserFilesConstant, setAllUserFilesConstant] = useState([]);


    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);


    /////// Get files of this user
    const getFilesOfUser = async () => {
        // setLoading(true)
        try {
            const response = await getAllFilesApi()
            const FilesData = response.data;
            console.log(FilesData)
            setUserFiles(FilesData)
            setAllUserFilesConstant(FilesData)
        } catch (error) {
            console.log("Cannot get files");
        }

        // setLoading(false)
    }

    useEffect(() => {
        getFilesOfUser();
    }, [])

    return (
        <div>
            <Button onClick={handleOpen} width='40px' sx={{textTransform:'capitalize'}}>
                <Typography fontSize='13px' color='gray' >Attach from Server</Typography>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ style: { opacity: '0' } }}
            >
                <Box sx={style}>
                    <Box padding={2} display={'flex'} flexDirection={'column'} height={'100%'}>
                        
                        <Box flex='0.2'>
                          <Box width="100%" display='flex' justifyContent='flex-end'>
                              <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
                          </Box>
                          <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                              <Typography fontWeight='600' fontSize="28px">Choose File</Typography>
                              <Typography color={'#8B8B8B'}>Please select the file you want to attach</Typography>
                          </Box>
                        </Box>

                        <Box flex='0.8' overflow={'auto'}>

                          <Box display='flex' flexWrap="wrap">
                              {userFiles?.map((d,index) =>
                                  <ServerFile d={d} key={index}/>
                              )}
                          </Box>
                          
                          <Box display='flex' justifyContent={'flex-end'} width={'92%'}>
                             
                            <Button variant='contained'>Attach</Button>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
