import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import TopBar from "./components/topBar/topBar";
import "./app.css";
import Signup from "./components/signup/signup";
import { fetcher } from "./helpers/fetcher";
import { useAuth } from "./contexts/auth/useAuth";
import { Users } from "./components/users/users";
import { Feed } from "./components/feed/feed";
import { About } from "./components/about/about";
import { Contact } from "./components/contact/contact";
import { Admin } from "./components/admin/admin";
import { Readme } from "./components/readme/readme";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({
    canDeleteOwnPost: false,
    canUnlikePost: false,
  });
  const { refreshUser, user } = useAuth();

  const getPosts = async () => {
    const posts = await fetcher("/post", "GET");
    setPosts(
      posts.map((post) => {
        return { ...post, createdAt: new Date(post.createdAt) };
      })
    );
  };

  const getUsers = async () => {
    const users = await fetcher("/users", "GET");
    setUsers(
      users.map((user) => {
        return { ...user, createdAt: new Date(user.createdAt) };
      })
    );
  };
  const getSettings = async () => {
    const settings = await fetcher("/settings", "GET");
    setSettings(settings);
  };

  useEffect(() => {
    if (!user) {
      fetcher("/users/refresh").then(async (result) => {
        if (result.username) {
          await refreshUser(result);
          getPosts();
          getUsers();
          getSettings();
        }
      });
    }
    getPosts();
    getUsers();
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!user]);

  // console.log("user", user);
  const followingPosts = user?.following
    ? posts.filter(
        (post) =>
          post.username === user.username ||
          user.following.includes(post.username)
      )
    : [];

  return (
    <div className="AppRoot">
      <TopBar />
      <div id="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/readme" element={<Readme />} />
          <Route
            path="/users"
            element={<Users users={users} getUsers={getUsers} />}
          />
          <Route
            path="/feed"
            element={
              <Feed
                posts={followingPosts}
                getPosts={getPosts}
                settings={settings}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                users={users}
                getUsers={getUsers}
                settings={settings}
                setSettings={setSettings}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
