import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAllFilesApi } from '../../../api/InternalApi/OurDevApi';
import FileIcon from '../../FileUploadModal/Icons/FileIcon';
import { Divider, Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
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
            <Button onClick={handleOpen} width='40px'>
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
                    <Box padding={2}>
                        <Box width="100%" display='flex' justifyContent='flex-end'>
                            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography fontWeight='bold' fontSize="28px">Choose File</Typography>
                            <Typography>Please select the file you want to attach</Typography>
                        </Box>

                        <Box display='flex' bgcolor="red"  flexWrap="wrap" overflow="scroll" >
                            {userFiles?.map((d) =>
                                <Box marginX={{ xs: "10px", sm: "3px", md: "25px" }} my={"10px"} sx={{
                                    width: { xs: "110px", sm: '125px', md: "140px" },
                                    // height: {xs:"150px",sm:'170px',md:"180px"},
                                    padding: "5px 5px",
                                    boxSizing: "border-box",
                                    border: "0.5px solid #CBCBCB", borderRadius: "8px",

                                }}>

                                    <Box display={'flex'} justifyContent={'flex-end'}>
                                        <Checkbox />
                                    </Box>
                                    <Box container display={'flex'} justifyContent="center">
                                        <FileIcon ext={d.fileName.split(['.'])[1]} maxH='60px' />
                                    </Box>
                                    <Box container>
                                        <Typography align='center' variant="subtitle2" color={"#121212"} fontSize={{ xs: "0.79rem", sm: "0.875rem" }}>
                                            {d.fileName.split(".")[0].length > 15 ? d.fileName.split(".")[0].substring(0, 14) : d.fileName.split(".")[0]}
                                        </Typography>
                                    </Box>
                                    <Box container>
                                        <Typography align='center' variant="subtitle2" fontSize={"13px"}
                                            color={"#CDCDCD"}>
                                            {`${Math.abs(parseInt(d.fileSize) / 1000000) % 1 !== 0 ? Math.abs(parseInt(d.fileSize) / 1000000).toFixed(2) : Math.floor(Math.abs(parseInt(d.fileSize) / 1000000))} MB`}
                                        </Typography>
                                    </Box>

                                </Box>
                            )}
                        </Box>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
