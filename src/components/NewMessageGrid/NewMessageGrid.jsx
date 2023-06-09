import { Box, Grid, Typography, Avatar, Stack, Button, Badge, TextField, AvatarGroup, Tooltip, Card, CardMedia, InputAdornment } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import ContentModels from "../../pages/ContentModels";
import { useLocation } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import { useMutation } from 'react-query';
import { fetchAllChatSingleUserOrGroup, fetchMessagesV1, sendV1Message }
    from "../../api/InternalApi/OurDevApi";
import { getSender } from "../../utils/chatLogic";
import { getTime } from '../../utils/validation';
import socket from "../../socket/socket";
import ListModal from '../Chat/ListModal';
import FileIcon from '../FileUploadModal/Icons/FileIcon';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import video from "../../assets/one.mp4"
import audioFile from "../../assets/music.mp3"
import ButtonHovers from '../Chat/ButtonHovers';
import ServerFilesModal from "./messageTools/ServerFilesModal"
import AttachMenuModal from './messageTools/AttachMenuModal';
import MoodIcon from '@mui/icons-material/Mood';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmojiPicker from 'emoji-picker-react';
import Modal from '@mui/material/Modal';
import "../../index.css"
import UserProfileModal from '../Chat/UserProfileModal';

var selectedChatCompare;
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
        },
    },
}));

const styleModal = {
    position: 'absolute',
    bottom: '8%',
    left: '20%',
    // transform: 'translate(-50%, -50%)',
    // width: 100,
    bgcolor: 'background.paper',
    // border: '1px solid gray',
    borderRadius:'10px',
    boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"   
     ,p: 1,
};

const NewMessageGrid = ({ selectedChannel }) => {

    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const contentRef = useRef(null);
    const [isTyping, setisTyping] = useState(false);
    const [typing, setTyping] = useState(false);

    const [openEmoji, setOpenEmoji] = useState(false);
    const handleOpenModal = () => setOpenEmoji(true);
    const handleCloseModal = () => setOpenEmoji(false);

    ////// socket connection state
    const [socketConnected, setSocketConnected] = useState(false);

    ////// use conetext use here
    const { user, setUser, selectChatV1,
        setSelectedChatV1, currentChats, setCurrentChats,
        chats, setChats, notification, setNotification } = ChatState();

    //////////// Store the userid of user ////////
    const [UserId, setUserId] = useState("");


    //emoji code here
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    

    const handleOpenClose = () => {
        setShowEmoji(!showEmoji);
    }



    useEffect(() => {
        setActiveChannel(selectedChannel);
    }, [selectedChannel])

    ///////// UseEffect for socket io
    useEffect(() => {
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setisTyping(true));
        socket.on("stop typing", () => setisTyping(false));
    }, []);





    /////////when user click on the channel/////////////
    //////// Here we are store the active channel //////
    const [ActiveChannel, setActiveChannel] = useState({});
    //////// All messges of channel  store here //////////////
    // const [AllMessagesChannel, setAllMessgesOfChannel] = useState([]);
    // const [messageInterval, setmessageInterval] = useState(null);


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
        recRealMessImage: {
            fontSize: "14px", lineHeight: "15px", color: "black", background: "#F2F2F2", borderRadius: "0px 10px 10px 10px", fontWeight: '400', height: '200px', width: '400px', objectFit: ' cover',
        },
        recRealMessAudio: {
            fontSize: "14px", lineHeight: "15px", color: "black", background: "#F2F2F2", borderRadius: "0px 10px 10px 10px", fontWeight: '400', width: '400px', height: '65px', paddingBottom: '5px'
        },
        recRealIcon: {
            fontSize: "14px", lineHeight: "15px", background: "#ECF4FF", color: "white", borderRadius: "0px 10px 10px 10px", width: '300px', height: '90px'
        },
        sendRealMess: {
            paddingRight: "10px", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px",
            fontSize: "14px", lineHeight: "15px", background: "#ECF4FF", color: "black", borderRadius: "10px 0px 10px 10px", fontWeight: "400", minHeight: '40px', minWidth: "80px"
        },
        sendRealIcon: {
            fontSize: "14px", lineHeight: "15px", background: "#ECF4FF", color: "black", borderRadius: "10px 0px 10px 10px", width: '300px', height: '90px'
        },
        sendRealMessImage: {
            fontSize: "14px", lineHeight: "15px", background: "#ECF4FF", color: "black", borderRadius: "10px 0px 10px 10px", fontWeight: "400", height: '200px', width: '400px', objectFit: ' cover',
        },
        sendRealMessAudio: {
            fontSize: "14px", lineHeight: "15px", background: "#F2F2F2", color: "black", borderRadius: "10px 0px 10px 10px", fontWeight: '400', width: '400px', height: '65px', paddingBottom: '5px'
        },
        imageShareBox: {
            position: 'absolute', top: '0', right: '0', display: 'flex', bgcolor: 'rgba(20,20,20,0.7)', justifyContent: 'space-evenly', alignItems: 'center', width: '70px', padding: '5px 0', borderRadius: '0px 10px 0px 10px'
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

    ///// Model Open function like create channel
    //////new model  open when click on the left side bar options and some others options like add folder and add teammate and so more
    const [openNewModel, setOpenNewModel] = useState(false);
    const [show, setShow] = useState(false);
    const [NewModelOpen, setNewModelOpen] = useState(false);
    const [activeModel, setActiveModel] = useState("")
    const modelOpens = () => {
        setOpenNewModel(true);/////this change the state in this page and then model show
        setShow(true);/////active model in diffrent page
        setActiveModel("AddTeamMate");/////// which type of model active
        setNewModelOpen(true);////// Real dilog box open
    }


    ////////////// When user type  the message then store the value here
    const [newMessage, setNewMessage] = useState("");
    ////////// login member data///////
    const [member, setMember] = useState({
        username: '',
        userId: '',
    });

    const setNewMessaageFun = (event) => {
        
        setNewMessage(event.target.value);

        /////// three dot show when typing start
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectChatV1._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectChatV1._id);
                setTyping(false);
                setisTyping(false);
            }
        }, timerLength)

    }

    function handleEmojiSelect(event, emojiObject) {
        const emoji = event.emoji;
        setNewMessage((preValue)=> preValue + emoji)
        // setText(event.emoji);
        // setText(text + emojiObject.emoji);
    }


    ////////// send message in new version //////
    const { mutateAsync: sendingMessageV1 } = useMutation(sendV1Message);
    const sendMessagev1 = async (message) => {
        socket.emit("stop typing", selectChatV1._id)
        try {
            const sendingMessData = {
                content: message,
                chatId: selectChatV1._id
            }
            setNewMessage("");
            setText("")
            const response = await sendingMessageV1(sendingMessData);
            setCurrentChats([...currentChats, response])

            socket.emit("new message", response);
            socket.emit("add-notification-in-member", { response })

        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        socket.on("message recived", (newMessageRecived) => {
            if (!selectedChatCompare || (selectedChatCompare._id !== newMessageRecived.chat._id)) {
                if (!notification.includes(newMessageRecived)) {
                    setNotification([...notification, newMessageRecived]);
                }
            } else {
                console.log("send message and recove message test", [...currentChats, newMessageRecived]);
                setCurrentChats([...currentChats, newMessageRecived]);

            }
        })
    })


    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (newMessage !== "") {
                sendMessagev1(newMessage);
            }

        }
    };

    const clickSendMessButton = () => {
        if (newMessage !== "") {
            sendMessagev1(newMessage);
        }
    }


    /////////////// fetch message of chats in  new version /////////////
    const { mutateAsync: fetchingAllMess } = useMutation(fetchMessagesV1);
    const fetchAllMessV1 = async (chatId) => {
        try {
            const response = await fetchingAllMess({ chatId });
            setCurrentChats(response)
            socket.emit("join chat", chatId)
        } catch (error) {
            console.log(error.response);
        }
    }

    // useEffect(() => {
    //     if (AllMessagesChannel.length !== 0) {
    //         console.log(AllMessagesChannel);
    //     }
    // }, [AllMessagesChannel])


    /////////////////////// Here we are create new state for new Version  Apis ////////////////
    const [MyActiveChat, setMyActiveChat] = useState({});

    useEffect(() => {
        if (selectChatV1?._id) {
            setMyActiveChat(selectChatV1)
            setCurrentChats([]);
            fetchAllMessV1(selectChatV1._id)
            selectedChatCompare = selectChatV1;
        }
    }, [selectChatV1._id])

    /////// sccrollbard automatic movein bottom place
    useEffect(() => {
        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.scrollTop = contentElement.scrollHeight;
        }

    }, [currentChats])



    return (
        <>
            <Box container px={"25px"} boxSizing={"border-box"} sx={cssStyle.groupNameBox} display="flex" justifyContent={"space-between"} alignItems={'center'}>
                {
                    <>
                        <Box display={"flex"} height='30px'>

                            {/* User Avatar */}
                            {
                                selectChatV1?.isGroupChat === false &&
                                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant={(selectChatV1?.users[1]._id === user ? selectChatV1?.users[0].isActive : selectChatV1?.users[1].isActive) && "dot"}>
                                    <Tooltip title={selectChatV1?.users[1]._id === user ? selectChatV1?.users[0].name : selectChatV1?.users[1].name} placement="bottom">
                                        <Avatar alt="Remy Sharp" src="" sx={{ width: 30, height: 30 }}  >{selectChatV1?.users[1]._id === user ? selectChatV1?.users[0].name[0]?.toUpperCase() : selectChatV1?.users[1].name[0]?.toUpperCase()}</Avatar>
                                    </Tooltip>
                                </StyledBadge>
                            }

                            <Box display='flex' flexDirection='column' justifyContent={'center'}>
                                <Box>

                                    <Typography fontWeight={"600"}
                                        variant="subtitle2" paddingTop={0.3} paddingLeft={1.2} textTransform={'capitalize'} >
                                        {/* {ActiveChannel.Name.charAt(0).toUpperCase() + ActiveChannel.Name.slice(1)} */}
                                        {Object.keys(MyActiveChat).length > 0 &&
                                            (!MyActiveChat.isGroupChat ? getSender(user, MyActiveChat?.users) : (MyActiveChat.chatName))
                                        }

                                        {/* {
   
                                        selectChatV1?.isGroupChat === false &&
                                        <Typography fontSize='12px'>
                                            online
                                        </Typography>
                                        } */}

                                    </Typography>


                                </Box>
                            </Box>

                            <Stack ml={1} direction="row" spacing={-.25}>
                                <AvatarGroup max={3}
                                    sx={{
                                        '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                                    }}
                                >
                                    {
                                        selectChatV1?.isGroupChat === true && selectChatV1?.users?.map((item) => {
                                            return <Tooltip title={item.name} placement="bottom">
                                                <Avatar alt="Remy Sharp" src={item?.pic}>{item.name[0].toUpperCase()}</Avatar>
                                            </Tooltip>
                                        })
                                    }

                                </AvatarGroup>
                            </Stack>
                        </Box>


                        {
                            (selectChatV1?.isGroupChat === 'true' || selectChatV1?.isGroupChat === true) && <Box display={'flex'} alignItems={'center'} >

                                {selectChatV1?.groupAdmin._id === localStorage.getItem("userInfo") && <Button
                                    sx={{ ...cssStyle.listofPeopeBtn, marginRight: "10px" }}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => modelOpens()}>
                                    Add Member
                                </Button>}
                                <ListModal buttonStyle={cssStyle.listofPeopeBtn} addMemberFunction={modelOpens} />
                            </Box>
                        }
                    </>
                }

            </Box>
            <Box container position={'relative'} id="NewMessageBox" sx={cssStyle.firstBoxMessage}>
                <Box
                    container
                    position={'absolute'}
                    sx={cssStyle.messageBoxCon}
                    pt={"40px"}
                    pb={"30px"}
                    mt={"0px"}
                    px={"20px"}
                    ref={contentRef}
                >
                    {
                        /* 
                        {AllMessagesChannel.length !== 0 &&
                            AllMessagesChannel.map((mes) => {
                                if (mes.Sender.Name !== member.username) {
                                    return <Grid id="rec_mess_con_grid" sx={{
                                        marginTop: "0px", width: "100%", marginLeft: "0px",
                                        boxSizing: "borderBox",
                                    }} container spacing={5}>
                                        <Grid id="reciver_mess_grid" sx={{ paddingTop: "10px !important", paddingLeft: "0px !important" }} item xs={12} md={6}>
                                            <Box container display={'flex'} mb={1} py={0.5}>
                                                <Box id="mess_user_pic_box">
                                                    <Stack ml={1} direction="row">
                                                        <Avatar
                                                            sx={{ ...cssStyle.avatarCss, width: "30px", height: "30px" }}
                                                            alt="Remy Sharp"
                                                            src="https://mui.com/static/images/avatar/1.jpg" />
                                                    </Stack>
                                                </Box>
                                                <Box ml={1}>
                                                    <Grid container>
                                                        <Grid container item>
                                                            <Typography variant="subtitle2" fontWeight={"700"} textTransform={'capitalize'}>
                                                                {mes.Sender.Name}
                                                            </Typography>
                                                            <Typography variant="body2" sx={cssStyle.timeRecMess} >10:30 AM</Typography>
                                                        </Grid>
                                                        <Grid container item boxSizing={"border-box"} mr="16px" >
                                                            <Typography variant="body2" sx={cssStyle.recRealMess} >
                                                                {mes.Content}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid id="empty_reciver_mess_grid" item display={{ xs: "none", md: "block" }} xs={12} md={6}>
                                        </Grid>
                                    </Grid>
                                } else {
                                    return <Grid id="send_mess_con_grid" container spacing={5}>
                                        <Grid item id="empty_sender_mess_grid" display={{ xs: "none", md: "block" }} xs={12} md={6}>
                                        </Grid>
                                        <Grid item id="sender_mess_grid" xs={12} md={6}>
                                            <Box container display={'flex'} flexDirection="row-reverse" mb={1} py={0.5}>
                                                <Box id="mess_user_pic_box_send">
                                                    <Stack ml={1} direction="row">
                                                        <Avatar sx={{ ...cssStyle.avatarCss, width: "30px", height: "30px" }} alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                                    </Stack>
                                                </Box>
                                                <Box ml={1}>
                                                    <Grid container>
                                                        <Grid container item display={"flex"} justifyContent="flex-end">
                                                            <Typography variant="subtitle2" fontWeight={"700"} textTransform={'capitalize'}>
                                                                {mes.Sender.Name}
                                                            </Typography>
                                                            <Typography variant="body2" sx={cssStyle.timeRecMess} >10:30 AM</Typography>
                                                        </Grid>
                                                        <Grid container item boxSizing={"border-box"} mr="16px" display={"flex"} justifyContent="end">
                                                            <Typography variant="body2" sx={{ ...cssStyle.sendRealMess, width: "auto", textAlign: "right" }} >
                                                                {mes.Content}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                            })} 
                            
                            */
                    }

                    {(currentChats.length > 0 && selectChatV1) &&
                        <>
                            {currentChats?.map((mes, index) => {
                                if (mes?.sender?._id !== localStorage.getItem("userInfo")) {
                                    return <Grid
                                        id="rec_mess_con_grid"
                                        sx={{
                                            marginTop: "0px", width: "100%", marginLeft: "0px",
                                            boxSizing: "borderBox"
                                        }}
                                        container
                                        spacing={5}
                                        key={`message_left_revicer_${index}`}
                                    >
                                        <Grid id="reciver_mess_grid"
                                            sx={{ paddingTop: "10px !important", paddingLeft: "0px !important" }}
                                            item xs={12} md={6}
                                        >
                                            <Box container display={'flex'} mb={1} py={0.5}>
                                                <Box id="mess_user_pic_box">
                                                    <Stack ml={1} direction="row">
                                                        {/* <Avatar
                                                            sx={{ ...cssStyle.avatarCss, width: "30px", height: "30px" }}
                                                            alt={mes.sender.name[0].toUpperCase()}
                                                            src="https://mui.com/static/images/asdfavatar/1.jpg" 
                                                            /> */}
                                                        {/* <ButtonHovers /> */}
                                                        <UserProfileModal name={mes.sender.name} email={mes.sender.email} />
                                                    </Stack>
                                                </Box>
                                                <Box
                                                    // ml={1}
                                                    ml={5}
                                                >
                                                    <Grid container>
                                                        <Grid container item>
                                                            <Tooltip placement="right-start" sx={{ cursor: 'pointer' }}>
                                                                <Typography variant="subtitle2" fontWeight={"700"} textTransform={'capitalize'}>
                                                                    {mes.sender.name}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Typography variant="body2" sx={cssStyle.timeRecMess} >{getTime(mes?.createdAt)}</Typography>
                                                        </Grid>

                                                        {/* Audio  */}
                                                        {/* {<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box position={'relative'}>
                                                            <CardMedia 
                                                                controls
                                                                component="audio"
                                                                src={audioFile}
                                                                alt="Paella dish" variant="body2" 
                                                                sx={cssStyle.recRealMessAudio}
                                                                />
                                                            </Box>
                                                        </Grid>} */}


                                                        {/* File */}
                                                        {/* {<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box sx={{...cssStyle.recRealIcon}} position={'relative'}> 
                                                                <Box display={'flex'} alignItems={'center'} height={'100%'} pl='5px'>
                                                                <Box borderRadius={'8px 0px 0px 8px'} bgcolor='white' flex={0.3}>
                                                                    <FileIcon ext={'doc'}/>
                                                                </Box>
                                                                    
                                                                <Box pl='10px' display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} flex={0.7} color='black'>
                                                                    <Typography variant="body2" fontSize={'1.1rem'}>
                                                                    File name
                                                                    </Typography>
                                                                    <Typography variant="body2" fontSize={'.8rem'}>
                                                                    Txt • 157B
                                                                    </Typography>
                                                                </Box>

                                                                

                                                                </Box>

                                                                <Box sx={cssStyle.imageShareBox}>
                                                                    <FileDownloadOutlinedIcon sx={{color:'white'}} fontSize='small'/>
                                                                    <ReplySharpIcon sx={{transform:"scale(-1,1)",color:'white'}}  fontSize='small'/>
                                                                </Box>
                                                            </Box>
                                                        </Grid>} */}

                                                        {/* Video */}
                                                        {/* {<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box position={'relative'}>
                                                            <CardMedia 
                                                                controls
                                                                component="video"
                                                                image={video}
                                                                alt="Paella dish" variant="body2" sx={cssStyle.recRealMessImage}/>
                                                                
                                                                <Box sx={cssStyle.imageShareBox}>
                                                                    <FileDownloadOutlinedIcon sx={{color:'white'}} fontSize='small'/>
                                                                    <ReplySharpIcon sx={{transform:"scale(-1,1)",color:'white'}}  fontSize='small'/>
                                                                </Box>
                                                            </Box>
                                                        </Grid>} */}

                                                        {/* Image */}
                                                        {/* {<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box position={'relative'}>
                                                            <CardMedia 
                                                                component="img"
                                                                image="https://images.pexels.com/photos/2916820/pexels-photo-2916820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                                alt="Paella dish" variant="body2" sx={cssStyle.recRealMessImage}/>
                                                                
                                                                <Box sx={cssStyle.imageShareBox}>
                                                                    <FileDownloadOutlinedIcon sx={{color:'white'}} fontSize='small'/>
                                                                    <ReplySharpIcon sx={{transform:"scale(-1,1)",color:'white'}}  fontSize='small'/>
                                                                </Box>
                                                            </Box>
                                                        </Grid>} */}



                                                        {/* Message */}
                                                        {<Grid container item boxSizing={"border-box"} mr="16px" >
                                                            <Typography variant="body2" sx={cssStyle.recRealMess} >
                                                                {mes.content}
                                                            </Typography>
                                                        </Grid>}

                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid id="empty_reciver_mess_grid" item display={{ xs: "none", md: "block" }} xs={12} md={6}>
                                        </Grid>
                                    </Grid>
                                } else {
                                    return <Grid
                                        id="send_mess_con_grid"
                                        container
                                        spacing={5}
                                        key={`mess_sender_${index}`}

                                    >
                                        <Grid item id="empty_sender_mess_grid" display={{ xs: "none", md: "block" }} xs={12} md={6}>
                                        </Grid>
                                        <Grid item id="sender_mess_grid" xs={12} md={6}>
                                            <Box container display={'flex'} flexDirection="row-reverse" mb={1} py={0.5}>
                                                <Box id="mess_user_pic_box_send">
                                                    <Stack ml={1} direction="row">
                                                        <Avatar sx={{ ...cssStyle.avatarCss, width: "30px", height: "30px" }} alt={mes.sender.name[0].toUpperCase()}
                                                            src="https://mui.com/static/images/avatar/1fd.jpg"
                                                        />
                                                    </Stack>
                                                </Box>
                                                <Box ml={1}>
                                                    <Grid container>
                                                        <Grid container item display={"flex"} justifyContent="flex-end">
                                                            <Typography variant="subtitle2" fontWeight={"700"} textTransform={'capitalize'}>
                                                                {/* {mes.sender.name} */}
                                                                You
                                                            </Typography>
                                                            <Typography variant="body2" sx={cssStyle.timeRecMess}>{getTime(mes?.createdAt)}</Typography>
                                                        </Grid>


                                                        {/* Audio  */}
                                                        {/* {index===0&&<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box position={'relative'}>
                                                            <CardMedia 
                                                                controls
                                                                component="audio"
                                                                src={audioFile}
                                                                alt="Paella dish" variant="body2" 
                                                                sx={cssStyle.sendRealMessAudio}
                                                                />
                                                            </Box>
                                                        </Grid>} */}

                                                        {/* Video */}
                                                        {/* {index===1&&<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box position={'relative'}>
                                                            <CardMedia 
                                                                controls
                                                                component="video"
                                                                image={video}
                                                                alt="Paella dish" variant="body2" sx={cssStyle.sendRealMessImage}/>
                                                                
                                                                <Box sx={cssStyle.imageShareBox}>
                                                                    <FileDownloadOutlinedIcon sx={{color:'white'}} fontSize='small'/>
                                                                    <ReplySharpIcon sx={{transform:"scale(-1,1)",color:'white'}}  fontSize='small'/>
                                                                </Box>
                                                            </Box>
                                                        </Grid>} */}

                                                        {/* Image */}
                                                        {/* {index===2&&<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box position={'relative'}>
                                                            <CardMedia 
                                                                component="img"
                                                                image="https://images.pexels.com/photos/2916820/pexels-photo-2916820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                                alt="Paella dish" variant="body2" sx={cssStyle.sendRealMessImage}/>
                                                                
                                                                <Box sx={cssStyle.imageShareBox}>
                                                                    <FileDownloadOutlinedIcon sx={{color:'white'}} fontSize='small'/>
                                                                    <ReplySharpIcon sx={{transform:"scale(-1,1)",color:'white'}}  fontSize='small'/>
                                                                </Box>
                                                            </Box>
                                                        </Grid>} */}


                                                        {/* File  */}
                                                        {/* {index===3&&<Grid container item boxSizing={"border-box"} mr="16px">
                                                            <Box sx={{...cssStyle.sendRealIcon}} position={'relative'}> 
                                                                <Box display={'flex'} alignItems={'center'} height={'100%'} pl='5px'>

                                                                <Box borderRadius={'8px 0px 0px 8px'} bgcolor='white' flex={0.3}>
                                                                    <FileIcon ext={'html'}/>
                                                                </Box>

                                                                <Box pl='10px' display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} flex={0.7}>
                                                                    <Typography variant="body2" fontSize={'1.2rem'}>
                                                                    File name
                                                                    </Typography>
                                                                    <Typography variant="body2" fontSize={'.8rem'}>
                                                                    Txt • 157B
                                                                    </Typography>
                                                                </Box>
                                                                </Box>

                                                                <Box sx={cssStyle.imageShareBox}>
                                                                    <FileDownloadOutlinedIcon sx={{color:'white'}} fontSize='small'/>
                                                                    <ReplySharpIcon sx={{transform:"scale(-1,1)",color:'white'}}  fontSize='small'/>
                                                                </Box>
                                                            </Box>
                                                        </Grid>} */}

                                                        <Grid container item boxSizing={"border-box"} mr="16px" display={"flex"} justifyContent="end">
                                                            <Typography variant="body2" sx={{ ...cssStyle.sendRealMess, width: "auto", textAlign: mes.content.length > 10 ? "left" : 'right' }} >
                                                                {mes.content}
                                                                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'} mt={'5px'}>
                                                                    <Typography fontSize={'.7rem'} mr='.5rem'>Seen at 05:45 PM</Typography>
                                                                    <DoneAllIcon fontSize='small' color='primary' />
                                                                </Box>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                            })}
                        </>}

                </Box>
                <Box position={'absolute'} sx={{ width: "100%", bottom: "0%", backgroundColor: "#ffffff" }} py={"10px"} container px={"25px"}>
                    {isTyping ? <Box sx={{ fontSize: "15px", marginLeft: "10px" }}>Typing...</Box> : <Box></Box>}
                    <Box container
                        sx={{
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        <TextField
                            size='small'
                            marginLeft='20px'
                            sx={{ ...cssStyle.sendMessInput, position: "absolute" }}
                            fullWidth
                            placeholder='Type a message'
                            id="messageInput"
                            // value={text}
                            value={newMessage}
                            onChange={(e) => setNewMessaageFun(e)}
                            onKeyPress={handleEnterKeyPress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MoodIcon sx={{ backgroundColor: "#fff", color: "#333", cursor: 'pointer' }} onClick={handleOpenModal} />
                                    </InputAdornment>
                                ),
                            }}

                        />
                        <Modal
                            open={openEmoji}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            BackdropProps={{ style: { opacity: '0' } }}
                        >
                            <Box sx={styleModal}  >
                                <EmojiPicker width="300px" height='350px' onEmojiClick={handleEmojiSelect} />
                            </Box>

                        </Modal>
                        {/* {showEmoji &&
                            <Box sx={styleModal} position='absolute' bottom='10%' paddingBottom="6px" ful >
                                <EmojiPicker onEmojiClick={handleEmojiSelect} />

                            </Box>
                        } */}
                        {/* <AttachFileIcon sx={{ ...cssStyle.sendMessIcon, right: "35px", backgroundColor: "#fff", color: "#333" }} /> */}
                        <SendIcon onClick={() => clickSendMessButton()} sx={cssStyle.sendMessIcon} />
                    </Box>
                    <AttachMenuModal />
                </Box>
            </Box>

            {openNewModel &&
                <ContentModels
                    activeModel={activeModel} //////  which type of model
                    show={show} //// boolen value of avtive  state model
                    NewModelOpen={NewModelOpen} ///// boolean value of dialog box open
                    setOpenNewModel={setOpenNewModel}
                    setShow={setShow}
                    setActiveModel={setActiveModel}
                    setNewModelOpen={setNewModelOpen}
                    ActiveChannel={ActiveChannel}
                    socket={socket}
                />
            }

        </>

    )
}

export default NewMessageGrid