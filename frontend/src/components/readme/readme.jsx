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
      <Box width={500} py={3}>
        <br />
        <h2>Social Network Name</h2>
        <br />
        <div>
          <p>VirtualHub</p>
        </div>

        <br />
        <h4>Additional Pages</h4>
        <div>
          <p>1. About Us</p>
          <p>2. Contact Us</p>
          
        </div>

        <br />
        <h4>Additional Features</h4>
        <div>
          <p>1. Delete Your Own Post</p>
          <p>2. Unlike Post</p>
          <p>3. Enhanced User Search (enhanced search functionality, allowing users to search for other members by substrings, not just limited to prefix searches.)</p>

        </div>

        <br />
        <h4>Challenges Faced</h4>
        <div>
          <p>1. Its the first time im building such a big project.</p>
          <p>2. I had to familiarize myself with new technologies and architectures.</p>
          <p>3. I had to work without a partner, which was challenging.</p>
          
        </div>

        <br />
        <h4>I had no partner</h4>
        
      </Box>

      <Box width={550} py={3}>
        <br />
        <h2>Server routes</h2>
        <br />
        <h3>Execute "npm test" in the backend directory to run tests</h3>
        <br />
        <h4>Contact Routes:</h4>
        <div>
          <p>POST /contact</p>
          <p>GET /contact</p>
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
