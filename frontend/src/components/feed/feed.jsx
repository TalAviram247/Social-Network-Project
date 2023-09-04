import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { fetcher } from "../../helpers/fetcher";
import { toast } from "react-toastify";
import { Post } from "./post/post";
import { useAuth } from "../../contexts/auth/useAuth";

export const Feed = ({ posts, getPosts, settings }) => {
  const [postText, setPostText] = useState("");
  const { enforceLogin } = useAuth();
  enforceLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!postText) {
        toast.error("Missing post content");
        return;
      }
      if (postText.length > 300) {
        toast.error("Post content is too long");
        return;
      }
      const form = {
        content: postText,
      };
      await fetcher(`/post`, "POST", form);
      toast.success("Posted successfully");
      setPostText("");
      getPosts();
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          gap={3}
          p={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField
            label="New post"
            className="input"
            sx={{
              width: "400px",
            }}
            multiline
            size="medium"
            InputProps={{
              name: "post",
              id: "post",
              value: postText,
              onChange: (e) => setPostText(e.target.value),
            }}
          />
          <Button type="submit" variant="contained">
            Post
          </Button>
        </Box>
      </form>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        alignItems={"center"}
        height={"100vh"}
      >
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              getPosts={getPosts}
              settings={settings}
            />
          );
        })}
      </Box>
    </Box>
  );
};
