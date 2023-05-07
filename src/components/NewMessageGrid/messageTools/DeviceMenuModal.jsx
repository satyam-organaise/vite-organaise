import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Divider } from "@mui/material";
import { useRef } from "react";

const style = {
  position: "absolute",
  bottom: "7%",
  right: "21%",
  cursor: "pointer",
  width: 140,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 3,
  border: "1px solid gray",
};

export default function DeviceMenuModal({ closeModal }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const documentRef = useRef(null);
  const handleFileUpload = (event) => {
    // Handle file upload logic here
  };

  return (
    <div>
      <Button onClick={handleOpen} width="40px">
        <Typography fontSize="13px" color="gray" textTransform={'capitalize'}>
          Attach from Device
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { opacity: "0" } }}
      >
        <Box sx={style}>

          <Box
            display="flex"
            alignItems="center"
          >
            
              <input
                ref={imageRef}
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                fullWidth
                style={{
                  color:'grey',
                  borderRadius: "4px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:'flex-start', 
                  textTransform:'capitalize'
                }}
                onClick={() => imageRef.current.click()}
              >
                <InsertPhotoOutlinedIcon
                  fontSize="2"
                  style={{ marginRight: "8px" }}
                />
                Image
              </Button>
          </Box>

          <Divider />

          <Box
            display="flex"
            alignItems="center"
          >
            
              <input
                ref={videoRef}
                accept="video/*"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                fullWidth
                style={{
                  borderRadius: "4px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:'flex-start',
                  textTransform:'capitalize',
                  color:'grey'
                }}
                onClick={() => videoRef.current.click()}
              >
                <VideoCallOutlinedIcon
                  fontSize="2"
                  style={{ marginRight: "8px" }}
                />
                Video
              </Button>
          </Box>

          <Divider />

          <Box
            display="flex"
            alignItems="center"
          >
            
              <input
                ref={audioRef}
                accept="audio/*"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                fullWidth
                style={{
                  color:'grey',
                  borderRadius: "4px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:'flex-start',
                  textTransform:'capitalize'
                }}
                onClick={() => audioRef.current.click()}
              >
                <MicNoneOutlinedIcon
                  fontSize="2"
                  style={{ marginRight: "8px" }}
                />
                Audio
              </Button>
          </Box>

          <Divider />
          <Box
            display="flex"
            alignItems="center"
          >
            
              <input
                ref={documentRef}
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                fullWidth
                style={{
                  color:'grey',
                  borderRadius: "4px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:'flex-start',
                  textTransform:'capitalize'
                }}
                onClick={() => documentRef.current.click()}
              >
                <DescriptionOutlinedIcon
                  fontSize="2"
                  style={{ marginRight: "8px" }}
                />
                Document
              </Button>
          </Box>

        </Box>
      </Modal>
    </div>
  );
}
