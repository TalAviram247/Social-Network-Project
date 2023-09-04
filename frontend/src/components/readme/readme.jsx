import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./readme.css";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

export const Readme = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div id="readme">
      <h1 className="title">Read me</h1>
      <Box width={400} py={3}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloribus
        veritatis optio nobis! Odit deserunt vero sequi repellat mollitia sunt
        fuga non delectus, ducimus, libero magni cumque, ut harum. At ullam
        eaque animi aliquid, assumenda consequatur dolorum iure ipsum veniam
        temporibus accusantium maiores quam doloremque soluta ipsam ad ut
      </Box>
      <Box width={400} py={3}>
        reprehenderit veritatis enim eos labore commodi provident eius? Itaque
        quod laboriosam eos voluptatibus eligendi ratione, soluta enim, libero
        autem quia aut odio! Nesciunt corrupti, minima sit nobis corporis
        numquam natus libero repellendus dicta voluptate consectetur totam eius
        sint quia dolore fugit facere maiores cum odio suscipit? Sunt dolores
        totam placeat exercitationem?
      </Box>

      <Box width={400} py={3}>
        <br />
        <h2>Server routes</h2>
        <br />
        <h4>Contact Routes:</h4>
        <div>
          <p>POST /contacts</p>
        </div>

        <br />
        <h4>Post Routes</h4>
        <div>
          <p>GET /posts</p>
          <p>POST /posts</p>
          <p>GET /posts/like/:postId</p>
          <p>DELETE /posts/:postId</p>
        </div>

        <br />
        <h4>Settings Routes</h4>
        <div>
          <p>GET /settings</p>
          <p>PUT /settings</p>
        </div>

        <br />
        <h4>User Routes</h4>
        <div>
          <p>GET /users</p>
          <p>GET /users/follow/:username</p>
          <p>POST /users/login</p>
          <p>GET /users/logout</p>
          <p>GET /users/refresh</p>
          <p>POST /users/signup</p>
          <p>DELETE /users/:username</p>
        </div>
      </Box>
    </div>
  );
};
