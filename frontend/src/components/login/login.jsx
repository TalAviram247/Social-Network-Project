import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Modal } from "../modal/modal";
import { useAuth } from "../../contexts/auth/useAuth";
import Typography from "@mui/material/Typography";
import "./login.css";
import Button from "@mui/material/Button";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const auth = useAuth();
  const [modal, setModal] = useState({ header: "Alert", content: <></> });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSignupClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setModal({
        header: "Missing inputs",
        content: (
          <>
            <Typography sx={{ mt: 2 }}>Missing username or password</Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
      return;
    }
    try {
      await auth.signIn({ username, password, rememberMe });
      navigate("/feed");
    } catch (e) {
      console.log("e", e);
      setModal({
        header: "Error",
        content: (
          <>
            <Typography sx={{ mt: 2 }}>
              Error while trying to login:
              <br />
              {e.message}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </>
        ),
      });
      setOpen(true);
    }
  };

  const validateInput = (e) => {
    if (e.target.name === "username") {
      setUsernameError(e.target.validationMessage);
      return;
    }
    if (e.target.name === "password") {
      setPasswordError(e.target.validationMessage);
      return;
    }
  };

  return (
    <div id="login">
      <form className="form">
        <div className="title">Welcome</div>
        <TextField
          label="Username"
          className="input"
          InputProps={{
            name: "username",
            id: "username",
            value: username,
            required: true,
            autoComplete: "on",
            onChange: (e) => setUsername(e.target.value),
            onBlur: validateInput,
          }}
        />
        {usernameError && <div className="error">{usernameError}</div>}
        <br />
        <TextField
          label="Password"
          className="input"
          required={true}
          InputProps={{
            name: "password",
            id: "password",
            type: "password",
            value: password,
            autoComplete: "on",
            onChange: (e) => setPassword(e.target.value),
            onBlur: validateInput,
          }}
        />
        {passwordError && <div className="error">{passwordError}</div>}

        <br />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={(e) => setRememberMe(e.target.checked)}
              value={rememberMe}
            />
          }
          label="Remember me"
        />
        <br />

        <Button
          className="button"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <br></br>
        <div>
          <div className="text">Don&apos;t have an account?</div>
          <Box display="flex" justifyContent="space-between">
            <Button
              className="button"
              variant="contained"
              onClick={onSignupClick}
            >
              Sign up
            </Button>
          </Box>
        </div>
      </form>
      {open && (
        <Modal
          header={modal.header}
          content={modal.content}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default Login;
