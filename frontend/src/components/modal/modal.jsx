import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MaterialModal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export function Modal({ content: Content, header, setOpen }) {
  return (
    <div>
      <MaterialModal open={true} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {header}
          </Typography>
          {Content}
        </Box>
      </MaterialModal>
    </div>
  );
}
