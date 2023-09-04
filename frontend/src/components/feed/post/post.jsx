import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Delete from "@mui/icons-material/Delete";
import { useAuth } from "../../../contexts/auth/useAuth";
import { fetcher } from "../../../helpers/fetcher";

export function Post({ post, getPosts, settings }) {
  const { user } = useAuth();
  const isLiked = post.likes.includes(user?.username) ? "error" : undefined;
  const isOwnPost = user?.username === post.username;
  const canDeletePost = isOwnPost && settings.canDeleteOwnPost;
  console.log("canDeletePost", canDeletePost);

  const likeOrDislike = async () => {
    if (isLiked && !settings.canUnlikePost) {
      return;
    }

    await fetcher("/post/like/" + post.id);
    getPosts();
  };

  const deletePost = async () => {
    await fetcher("/post/" + post.id, "DELETE");
    getPosts();
  };

  return (
    <Card sx={{ width: 445, overflow: "unset" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.fullName[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.fullName}
        subheader={post.createdAt.toLocaleDateString("en-GB")}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likeOrDislike}>
          <FavoriteIcon color={isLiked} />
        </IconButton>
        {canDeletePost && (
          <IconButton onClick={deletePost}>
            <Delete />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
