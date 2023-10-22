import React from "react";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  Avatar,
  MenuItem,
  ListItemIcon,
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { paths } from "../utils/routes";
import { useUser } from "../utils/userCtx";

function Header() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const { isSignedIn } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            noWrap
            component={Link}
            to={paths.events()}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Events
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "end",
            }}
          >
            <Tooltip title="Profile settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, color: (theme) => theme.palette.common.white }}
                aria-controls={open ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertIcon sx={{ width: 32, height: 32 }} color="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="profile-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem component={Link} to={paths.profile()}>
              <Avatar />
              {isSignedIn ? "Profile" : "Sign in"}
            </MenuItem>
            {isSignedIn ? (
              <MenuItem onClick={signOut}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            ) : null}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
