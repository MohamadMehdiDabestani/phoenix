import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const links = [
  { label: "توضیحات", to: "#intro" },
  { label: "پلن ها", to: "#planes" },
  { label: "سوالات متداول", to: "#faq" },
  { label: "شروع", to: "#strat" },
];

export const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("to");
    const location = document.querySelector(target).offsetTop

    window.scrollTo({
      left: 0,
      top: location - 70,
    })
    handleCloseNavMenu();
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {links.map((link, idx) => (
                <MenuItem key={idx} to={link.to} onClick={handleClick}>
                  <Typography to={link.to} textAlign="center">{link.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {links.map((link, idx) => (
              <Button
                key={idx}
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block" }}
                to={link.to}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
