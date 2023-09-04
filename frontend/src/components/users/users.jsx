import { Box, TextField } from "@mui/material";
import { User } from "./user/user";
import { useState } from "react";
import { useAuth } from "../../contexts/auth/useAuth";

export const Users = ({ users, getUsers }) => {
  const { enforceLogin } = useAuth();
  enforceLogin();
  const [name, setName] = useState("");

  const filteredUsers = users.filter((user) => {
    return user.fullName.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <>
      <Box px={5} pt={5}>
        <TextField
          label="Search by name"
          className="input"
          sx={{ width: 300 }}
          InputProps={{
            name: "name",
            id: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
          }}
        />
      </Box>
      <Box
        padding={5}
        display={"grid"}
        gap={3}
        gridTemplateColumns={"repeat(auto-fill, minmax(300px, 1fr));"}
      >
        {filteredUsers.map((user) => {
          return <User key={user.username} user={user} getUsers={getUsers} />;
        })}
      </Box>
    </>
  );
};
