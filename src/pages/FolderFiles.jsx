import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, Typography, InputAdornment } from '@mui/material/';
import fileUploadImage from "../assets/BackgroundImages/folder-data.png";
import TextField from '@mui/material/TextField'
import { Search } from '@mui/icons-material';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import {deleteFileFromFolderApi,getFileFolderApi } from '../api/InternalApi/OurDevApi';
import { useDebounce } from 'use-debounce';
import FileIcon from '../components/FileUploadModal/Icons/FileIcon';
import DotMenu from '../components/Chat/DotMenu';
import Loader from '../components/Tools/Loader';
import { ChatState } from '../Context/ChatProvider';
import ContentModels from './ContentModels';

const FolderFiles = () => {
    const navigate = useNavigate();
    const {fid:folderId}=useParams();
    
    const [userFiles, setUserFiles] = useState([]);
    const [allUserFiles,setAllUserFiles]=useState([])
    const [UserId, setUserId] = useState("");
    const [loading,setLoading]=useState(true);
    const { setPageNameContext,setCloseSideList } = ChatState();
    const [folderObj,setFolderObj]=useState({})
    const [isFolderFileExist,setIsFolderFileExist] = useState(true);
    const colorsCode={
        doc:'#2892e7d6',
        docx:'#2892e7d6',
        png:'#7CB2D2aa',
        jpeg:'#74BE73aa',
        jpg:'#74BE73',
        pdf:'#EE2F37',
        mkv:'#478559aa',
        exe:'#ff8928',
        gif:'#405de6aa',
        htm:'#539568',
        html:'#539568',
        jar:'#ffc202',
        zip:'#F0BC2C',
        bat:'#c0ff2d',
        bin:'#ffabb6',
        csv:'#ffaaab',
        iso:'#c89666',
        mp4:'#8076a3',
        mp3:'#9950A6',
        mpeg:'#00beffaa',
        ppsx:'#ffcb00',
        rar:'#9bc400aa',
        tmp:'#ec1f52aa',
        txt:'#5D68BF',
        xls:'#67AA46',
        ppt:'#F68852',
        eps:'#EFA162',
        wav:'#176E88',
        css:'#95BCD4',
        mov:'#006CB7',
        psd:'#297CAF',
    }
       ////Code for model open
       const [openNewModel, setOpenNewModel] = useState(false);
       const [show, setShow] = useState(false);
       const [NewModelOpen, setNewModelOpen] = useState(false);
       const [activeModel, setActiveModel] = useState("")
       
       ///// Model Open function like create channel
       const modelOpens = (modenOpenType) => {
           setOpenNewModel(true);/////this change the state in this page and then model show
           setShow(true);/////active model in diffrent page
           setActiveModel(modenOpenType);/////// which type of model active
           setNewModelOpen(true);////// Real dilog box open
       }

       const ActionDelFolAndAddFile = (typeService = "", d = {}) => {
        if (typeService === "addFile") {
            // setFolderSelect(d);
            modelOpens("AddFileModel");
        }
    };


    const style = {
        folderCreateMainBox: {
            minHeight: "500px", backgroundColor: "transparent",
        }
    }

   

    /////// Get files of this user
    const getFilesOfUser = async () => {
        try{

            const FilesResponse = await getFileFolderApi(folderId)
            const fileObj=FilesResponse?.data[0];
            setFolderObj(fileObj)
            setUserFiles(fileObj.filesList)
            setAllUserFiles(fileObj.filesList)
            
        }catch(error)
        {
            console.log(error)
            toast.error(error?.message||"Something is wrong");
        }
        setLoading(false)
    }


    useEffect(() => {
        setLoading(true)
        getFilesOfUser();
        setPageNameContext("data")
        setCloseSideList(false)
    }, [])

    
    ///////////// Delete file folder code add here
    const { mutateAsync: deleteFileFromFolder, isLoading: delFileFromFolderIsLoading } = useMutation(deleteFileFromFolderApi)
    const ActionDelFile = async (fileId) => {          
            const dummyData = { fileId: fileId._id, folderId: folderId };
            const resData = await deleteFileFromFolder(dummyData);
            getFilesOfUser()
    }

    ///////////// Search file 
    const [srcFileText, SetSrcFileText] = useState("");
    const [debouncedSearchTerm] = useDebounce(srcFileText, 500);
    useEffect(() => {
        setIsFolderFileExist(true)
        if (debouncedSearchTerm !== "") {
            const searchingFiles = allUserFiles.filter((srcFiles) => srcFiles.fileName.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase()));
            if(searchingFiles.length>0)
            {
                setUserFiles(searchingFiles);
            }else{
                setIsFolderFileExist(false);
            }
        } 
        else {
            setUserFiles(allUserFiles);
        }

    }, [debouncedSearchTerm])
    
    if(loading)
    {
        return(
            <Loader/>
        )
    }



    return (
        <Box px={"20px"} sx={style.folderCreateMainBox}>
            {userFiles?.length === 0 &&
                <Grid container>
                    <Grid container item xs={12} mt={2} display="flex"  justifyContent={'center'}>
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
                            onClick={()=>ActionDelFolAndAddFile("addFile",folderObj)}
                        >
                            Add File
                        </Button>
                    </Grid>
                </Grid>
            }

            {  userFiles&&userFiles?.length !== 0 &&
                <Grid container px={1} >
                    <Grid container item mt={2} xs={12} >
                        <Box container width={"100%"} display={'flex'} justifyContent="space-between">
                            <Typography variant="h6" >{folderObj?.folderName}</Typography>
                            <Box >
                                <TextField
                                    id="search_folder"
                                    placeholder='Search file'
                                    size='small'
                                    sx={{
                                        marginRight: "10px", "& input": {
                                            paddingTop: "7px",
                                            paddingBottom: "7px", fontSize: "14px"
                                        },
                                        paddingLeft: "4px", "& fieldset": { borderRadius: "8px" }
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
                                    sx={{ padding: "5px 20px" }}
                                    onClick={()=>ActionDelFolAndAddFile("addFile",folderObj)}
                                >
                                    Add File
                                </Button>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid container item mt={3} xs={12} display={'flex'} >
                        {(isFolderFileExist && userFiles.length !== 0) && userFiles.map((d,index) =>
                            <Box key={index} marginRight={"25px"} my={"10px"} sx={{
                                width: "170px",
                                height: "170px",
                                padding: "5px 5px",
                                boxSizing: "border-box",
                                border: "0.5px solid #CBCBCB", borderRadius: "8px"
                            }}>
                                <Box container display={'flex'} justifyContent="end">
                                    <DotMenu handleDelete={ActionDelFile} value={d} pageName='files' deleteHeading="Delete File" deleteTitle="Are you sure you want to delete this ?"/>
                                </Box>
                                <Box container display={'flex'} justifyContent="center">
                                    
                                    <FileIcon ext={d?.fileName?.split(['.'])[1]}/>
                                </Box>
                                <Box container>
                                    <Typography align='center' variant="subtitle2" color={"#121212"}>
                                    {d.fileName.split(".")[0].length > 15 ? d.fileName.split(".")[0].substring(0, 14) : d.fileName.split(".")}
                                    </Typography>
                                </Box>
                                <Box container>
                                    <Typography align='center' variant="subtitle2" fontSize={"13px"}
                                        color={"#CDCDCD"}>
                                        {`${Math.abs(parseInt(d?.fileSize) / 1000000) % 1 !== 0 ? Math.abs(parseInt(d?.fileSize) / 1000000).toFixed(2) : Math.floor(Math.abs(parseInt(d?.fileSize) / 1000000))} MB`}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Grid>

                    {
                        !isFolderFileExist && <Grid container>
                        <Grid container item xs={12} mt={2} display="flex"  justifyContent={'center'}>
                            <img src={fileUploadImage} style={{ width: "350px", userSelect: "none", pointerEvents: "none" }} alt="folder-creating-image" />
                        </Grid>
                        <Grid container item xs={12} mt={2} display="flex" justifyContent={'center'}>
                            <Typography variant="subtitle1" fontWeight={"600"} > No File Found Of This Name</Typography>
                        </Grid>
                    </Grid>
                    }
                </Grid>
            }

            {openNewModel &&
                <ContentModels
                    activeModel={activeModel} //////  which type of model
                    show={show} //// boolen value of avtive  state model
                    NewModelOpen={NewModelOpen} ///// boolean value of dialog box open
                    setOpenNewModel={setOpenNewModel}
                    setShow={setShow}
                    setActiveModel={setActiveModel}
                    setNewModelOpen={setNewModelOpen}
                    getFoldersData={getFilesOfUser}
                    folderSelect={folderObj}////which folder silect that value store
                />
            }
        </Box>
    )
}

export default FolderFiles