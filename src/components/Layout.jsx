import { Drawer, Grid, IconButton, Paper, useMediaQuery, useTheme} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidenav from "../components/SideNav";
import routes from "../routes/router"; // array de rutas

//manejo de estados
import { useState, useEffect } from "react";

//iconos 
import MenuIcon from '@mui/icons-material/Menu';

export default function Layout() {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm")); //xs , sm
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  //cierre del drawer al cambiar de ruta en móviles
  useEffect(() => {
    if (isSmDown) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  }, [location.pathname, isSmDown])

  return (
    <Grid container sx={{ height: "100vh" }}>
      {!isSmDown && (
        <Grid item sm={3} sx={{ borderRight: "1px solid #ddd", bgcolor: "#fff" }}>
          <Sidenav routes={routes} />
        </Grid>
      )}
      {/* content */}
      <Grid
        sx={{
          flexGrow:1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
        }}
      >
        {/* Navbar */}
        <Paper
          sx={{
            height: 64,
            bgcolor: "white",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* botón hamburguesa solo para móviles */}
          {isSmDown && (
            <IconButton onClick={toggleDrawer} size="large">
              <MenuIcon />
              <span> Navbar </span>
            </IconButton>
          )}
        </Paper>
        {/* Contenido */}
        <Grid sx={{ flex: 1, p: {xs: 1, sm: 2, md: 3, xl:3}}}>
          <Outlet /> {/* renderización del componente según la ruta */}
        </Grid>
      </Grid>

      {/* Drawer para moviles */}
      {isSmDown && (
        <Drawer
          open={openDrawer}
          onClose={toggleDrawer}
          variant="temporary"
          ModalProps={{ keepMounted: true}}
        >
          <Sidenav routes={routes} />
        </Drawer>
      )}
    </Grid>
  );
}