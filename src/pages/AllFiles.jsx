import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, Typography, InputAdornment } from '@mui/material/';
import fileUploadImage from "../assets/BackgroundImages/folder-data.png";
import TextField from '@mui/material/TextField'
import { Search } from '@mui/icons-material';
import { useMutation } from 'react-query';
import File from '../components/FilesAndFolders/File';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';
import Loader from '../components/Tools/Loader';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { deleteFileApi, getAllFilesApi } from '../api/InternalApi/OurDevApi';
// import FolderIcon from '@mui/icons-material/Folder';
// import { AccountCircle, FileOpen } from '@mui/icons-material';
// import TextSnippetIcon from '@mui/icons-material/TextSnippet';
// import axios from 'axios';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import FileIcon from '../components/FileUploadModal/Icons/FileIcon';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteModal from '../components/Chat/DeleteModal';
// import DotMenu from '../components/Chat/DotMenu';
// import ShowFileModal from '../components/FilesAndFolders/ShowFileModal';

const AllFiles = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userFiles, setUserFiles] = useState([]);
    const [allUserFilesConstant, setAllUserFilesConstant] = useState([]);
    const [showSearchSmall, setShowSearchSmall] = useState(false)
    const { setPageNameContext, setCloseSideList } = ChatState()
    const [isFilesExist, setisFilesExist] = useState(true)
    // const [UserId, setUserId] = useState("");
    // const [fileOpen,setFileOpen]=useState(false)
    // const colorsCode = {
    //     doc: '#2892e7d6',
    //     docx: '#2892e7d6',
    //     png: '#7CB2D2aa',
    //     jpeg: '#74BE73aa',
    //     jpg: '#74BE73',
    //     pdf: '#EE2F37',
    //     mkv: '#478559aa',
    //     exe: '#ff8928',
    //     gif: '#405de6aa',
    //     htm: '#539568',
    //     html: '#539568',
    //     jar: '#ffc202',
    //     zip: '#F0BC2C',
    //     bat: '#c0ff2d',
    //     bin: '#ffabb6',
    //     csv: '#ffaaab',
    //     iso: '#c89666',
    //     mp4: '#8076a3',
    //     mp3: '#9950A6',
    //     mpeg: '#00beffaa',
    //     ppsx: '#ffcb00',
    //     rar: '#9bc400aa',
    //     tmp: '#ec1f52aa',
    //     txt: '#5D68BF',
    //     xls: '#67AA46',
    //     ppt: '#F68852',
    //     eps: '#EFA162',
    //     wav: '#176E88',
    //     css: '#95BCD4',
    //     mov: '#006CB7',
    //     psd: '#297CAF',
    // }

    const style = {
        folderCreateMainBox: {
            minHeight: "500px", backgroundColor: "transparent",
        }
    }

    /////// Get files of this user
    const getFilesOfUser = async () => {
        setLoading(true)
        try {
            const response = await getAllFilesApi()
            const FilesData = response.data;
            setUserFiles(FilesData)
            setAllUserFilesConstant(FilesData)
        } catch (error) {
            console.log("Cannot get files");
        }

        setLoading(false)
    }

    useEffect(() => {
        getFilesOfUser();
        setPageNameContext("data")
        setCloseSideList(false)
    }, [])

    ///////////// Delete fie code add here

    const { mutateAsync: deleteFileApiCall, isLoading: delFileIsLoading } = useMutation(deleteFileApi)
    const ActionDelFile = async (data) => {

        // const UserId = JSON.parse(localStorage.getItem("UserData")).sub;
        const createDeleteObj = { fileId: data._id };
        const resData = await deleteFileApiCall(createDeleteObj);
        if (resData.status) {
            toast.success(resData.message);
            if (debouncedSearchTerm !== "") {
                const afterDelFilterFile = userFiles.filter((srcFiles) => srcFiles.fileId !== data.fileId);
                setUserFiles(afterDelFilterFile);
                if (afterDelFilterFile.length === 0) {
                    SetSrcFileText("");
                }
            } else {
                getFilesOfUser();
            }
        } else {
            toast.error(resData.message);
        }


    }

    ///////////// Search file 
    const [srcFileText, SetSrcFileText] = useState("");
    const [debouncedSearchTerm] = useDebounce(srcFileText, 500);
    useEffect(() => {
        setisFilesExist(true);
        if (debouncedSearchTerm !== "") {
            const searchingFiles = allUserFilesConstant.filter((srcFiles) => srcFiles.fileName.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase()));

            if (searchingFiles.length > 0) {
                setUserFiles(searchingFiles);
                // setisFilesExist(true);
            } else {
                setisFilesExist(false);
            }
        } else {
            setUserFiles(allUserFilesConstant);
        }

    }, [debouncedSearchTerm])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Box px={"20px"} sx={style.folderCreateMainBox}>
                {
                userFiles.length === 0 &&
                    <Grid container>

                        <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                            <img src={fileUploadImage} style={{ width: "350px", userSelect: "none", pointerEvents: "none" }} alt="folder-creating-image" />
                        </Grid>
                        <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                            <Typography variant="subtitle1" fontWeight={"600"} >No files added yet</Typography>
                        </Grid>
                        <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                            <Typography sx={{ width: { sm: "75%", md: "45%" } }} color="#808191" variant="body2" textAlign={'center'}>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                            <Button
                                variant="contained"
                                size='small'
                                sx={{ padding: "5px 25px" }}
                                onClick={() => navigate("/files/upload")}
                            >
                                Add File
                            </Button>
                        </Grid>
                    </Grid>
                }

                {userFiles.length !== 0 &&
                    <Grid container px={1} >
                        <Grid container item mt={2} xs={12} >
                            <Box container width={"100%"} display={'flex'} justifyContent="space-between">
                                <Typography variant="h6" >All Files</Typography>
                                <Box >
                                    <TextField
                                        onClick={() => setShowSearchSmall(true)}
                                        id="search_folder"
                                        placeholder='Search file'
                                        size='small'
                                        sx={{
                                            width: { xs: showSearchSmall ? "150px" : '50px', sm: '140px', md: '180px', xl: '220px' },
                                            marginRight: "10px",
                                            "& input": {
                                                paddingTop: "7px",
                                                paddingBottom: "7px", fontSize: "14px"
                                            },
                                            paddingLeft: "4px",
                                            "& fieldset": { borderRadius: "8px" }
                                        }}
                                        value={srcFileText}
                                        onChange={(e) => SetSrcFileText(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search sx={{ color: "#efefef" }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        size='small'
                                        sx={{ padding: { xs: "4px 15px", sm: "5px 20px" }, textTransform: 'capitalize' }}
                                        onClick={() => navigate("/files/upload")}
                                    >
                                        Add Files
                                    </Button>
                                </Box>

                            </Box>
                        </Grid>
                        <Grid container item mt={3} xs={12} display={'flex'} flexWrap={'wrap'}>
                         
                            { (isFilesExist && userFiles.length !== 0) && userFiles.map((d) =>
                            <File d={d} ActionDelFile={ActionDelFile}/>
                        )}

                            {!isFilesExist &&
                                <Grid container>
                                    <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                                        <img src={fileUploadImage} style={{ width: "350px", userSelect: "none", pointerEvents: "none" }} alt="folder-creating-image" />
                                    </Grid>
                                    <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                                        <Typography variant="subtitle1" fontWeight={"600"} >No File Found Of This Name</Typography>
                                    </Grid>

                                </Grid>
                            }

                        </Grid>
                    </Grid>
                }
            </Box>
        </>
    )
}

export default AllFiles