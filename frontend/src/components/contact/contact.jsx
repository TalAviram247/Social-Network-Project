import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./contact.css";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth/useAuth";

export const Contact = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { enforceLogin } = useAuth();
  enforceLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = {
        title,
        message,
        email,
      };
      await fetcher(`/contact`, "POST", form);
      toast.success("Sent successfully");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div id="contact">
      <h1 className="title">Contact us</h1>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          className="input"
          InputProps={{
            name: "title",
            id: "title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
          }}
        />
        <br></br>

        <br></br>
        <TextField
          label="Email"
          type="text"
          className="input"
          InputProps={{
            name: "email",
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
          }}
        />
        <br></br>
        <br></br>

        <TextField
          label="Title"
          className="input"
          rows={6}
          multiline
          type="text"
          InputProps={{
            name: "message",
            id: "message",
            className: "input",
            placeholder: "message",
            value: message,
            onChange: (e) => setMessage(e.target.value),
          }}
        />
        <br></br>
        <br></br>
        <br></br>

        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
};
