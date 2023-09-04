import { useState } from "react";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./admin.css";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useAuth } from "../../contexts/auth/useAuth";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const Admin = ({ users, getUsers, settings, setSettings }) => {
  const [expanded, setExpanded] = useState("panel1");
  useAuth().enforceAdmin();

  const deleteUser = async (username) => {
    try {
      await fetcher(`/users/${username}`, "DELETE");
      toast.success("User deleted successfully");
      getUsers();
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSettingsChange = async (settingName) => {
    try {
      const settings = await fetcher(`/settings`, "PUT", { settingName });
      toast.success("Settings updated successfully");
      setSettings(settings);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <Box id="admin" px={5}>
      <Box display={"grid"} justifyContent={"center"} p={4}>
        <h1 className="title">Admin Dashboard</h1>
      </Box>
      <div>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => handleSettingsChange("canUnlikePost")}
                checked={settings.canUnlikePost}
              />
            }
            label="Users can unlike post"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => handleSettingsChange("canDeleteOwnPost")}
                checked={settings.canDeleteOwnPost}
              />
            }
            label="Users can delete their own post"
          />
        </Box>
        {users.map((user) => {
          return (
            <Accordion
              key={user.username}
              expanded={expanded === user.username}
              onChange={handleChange(user.username)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  Username: {user.username}, Full name:({user.fullName})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* delete user */}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteUser(user.username)}
                >
                  Delete
                </Button>
                <br />
                <br />
                <Typography>
                  {user.activity?.length
                    ? user.activity.map((activity) => {
                        return (
                          <div key={activity.date}>
                            {new Date(activity.date).toLocaleString("en-GB")}:{" "}
                            {activity.activity}
                          </div>
                        );
                      })
                    : "No activity"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Box>
  );
};
