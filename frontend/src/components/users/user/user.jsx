import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "@mui/material";
import { useAuth } from "../../../contexts/auth/useAuth";
import { fetcher } from "../../../helpers/fetcher";
import { toast } from "react-toastify";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export function User({ user, getUsers }) {
  const auth = useAuth();

  const followOrUnfollow = async () => {
    const result = await fetcher("/users/follow/" + user.username);

    auth.setUser((user) => ({ ...user, following: result.following }));
    toast.success(result.message);
    getUsers();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.fullName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.fullName}
        subheader={`Joined at ${user.createdAt.toLocaleDateString()}`}
      />

      {auth?.user?.username !== user.username && (
        <CardActions disableSpacing>
          <Tooltip title="Follow">
            <IconButton onClick={followOrUnfollow}>
              {auth?.user?.following.includes(user.username) ? (
                <PersonRemoveIcon />
              ) : (
                <AddIcon />
              )}
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
}
