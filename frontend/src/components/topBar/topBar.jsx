import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";
import "./topBar.css";

const unselectedPaths = [];

export default function TopBar() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = location.pathname;

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const hideIfLoggedIn = { display: !auth.user ? undefined : "none" };
  const showIfLoggedIn = { display: auth.user ? undefined : "none" };
  const showIfAdmin = {
    display: auth.user?.type === "admin" ? undefined : "none",
  };
  return (
    <div id="topBar">
      <Tabs
        textColor="inherit"
        value={unselectedPaths.includes(currentRoute) ? false : currentRoute}
        variant="standard"
        // scrollButtons
        // allowScrollButtonsMobile
      >
        <Tab
          label="Feed"
          value="/feed"
          to="/feed"
          component={Link}
          style={showIfLoggedIn}
        />
        <Tab
          key="Users"
          label="Users"
          value="/users"
          to="/users"
          component={Link}
          style={showIfLoggedIn}
        />
        <Tab
          label="About"
          value="/about"
          to="/about"
          component={Link}
          style={showIfLoggedIn}
        />
        <Tab
          label="Contact us"
          value="/contact"
          to="/contact"
          component={Link}
          style={showIfLoggedIn}
        />
        <Tab label="Read me" value="/readme" to="/readme" component={Link} />
        
        <Tab
          key="Logout"
          label="Logout"
          value="/login"
          onClick={handleLogout}
          style={showIfLoggedIn}
        />
        <Tab
          label="Login"
          value="/login"
          to="/login"
          component={Link}
          style={hideIfLoggedIn}
        />
        <Tab
          label="Signup"
          value="/signup"
          to="/signup"
          component={Link}
          style={hideIfLoggedIn}
        />
        <Tab
          label="Admin Dashboard"
          value="/admin"
          to="/admin"
          component={Link}
          style={showIfAdmin}
        />
      </Tabs>
    </div>
  );
}
