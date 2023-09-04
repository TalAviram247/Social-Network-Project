import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./signup.css";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const goToLogin = async () => {
    navigate("/login");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetcher(`/users/signup`, "POST", {
        username,
        password,
        fullName,
      });
      goToLogin();
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <div id="signup">
      <form className="form" onSubmit={handleCreate}>
        <div className="title">SIGN UP</div>
        <TextField
          label="Username"
          InputProps={{
            name: "username",
            id: "username",
            value: username,
            required: true,
            autoComplete: "on",
            onChange: (e) => setUsername(e.target.value),
          }}
        />
        <br />

        <TextField
          label="Full Name"
          InputProps={{
            name: "fullName",
            id: "fullName",
            value: fullName,
            required: true,
            autoComplete: "on",
            onChange: (e) => setFullName(e.target.value),
          }}
        />

        <br />
        <TextField
          label="Password"
          InputProps={{
            name: "password",
            required: true,
            id: "password",
            type: "password",
            value: password,
            autoComplete: "on",

            onChange: (e) => setPassword(e.target.value),
          }}
        />

        <br />
        <Button className="button" type="submit" variant="contained">
          Sign Up
        </Button>
        <br />
        <div className="center">
          <div className="text">Already have an account?</div>
          <Button
            type="submit"
            className="button"
            variant="contained"
            onClick={goToLogin}
          >
            Login
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Signup;
