import { Drawer, Box, IconButton, Paper, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidenav from "../components/SideNav";
import routes from "../routes/router";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function Layout() {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  useEffect(() => {
    if (isSmDown) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  }, [location.pathname, isSmDown]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      {/* SIDENAV DESKTOP */}
      {!isSmDown && (
        <Sidenav routes={routes} />
      )}

      {/* CONTENIDO */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
          width: isSmDown ? "100%" : `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {/* Navbar */}
        <Paper
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            px: 2,
          }}
        >
          {isSmDown && (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Paper>

        {/* Contenido */}
        <Box sx={{ flex: 1, overflow:"hidden"}}>
          <Outlet />
        </Box>
      </Box>

      {/* Drawer móvil */}
      {isSmDown && (
        <Drawer
          open={openDrawer}
          onClose={toggleDrawer}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
        >
          <Sidenav routes={routes} />
        </Drawer>
      )}
    </Box>
  );
}