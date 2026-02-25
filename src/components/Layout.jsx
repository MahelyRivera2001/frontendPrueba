import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidenav from "../components/SideNav";
import routes from "../routes/router"; // array de rutas

export default function Layout() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Sidenav routes={routes} />
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
          Navbar
        </Paper>
        {/* Contenido */}
        <Grid sx={{ flex: 1, p: 2 }}>
          <Outlet /> {/* renderización del componente según la ruta */}
        </Grid>
      </Grid>
    </Grid>
  );
}