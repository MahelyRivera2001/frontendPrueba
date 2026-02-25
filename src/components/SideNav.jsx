import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Toolbar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Sidenav({ routes }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState({});

  const handleToggle = (key) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "white",
          color: "#242424",
        },
      }}
    >
      <Toolbar />
      <List>
        {routes.map((route) => (
          <div key={route.key}>
            <ListItemButton
              onClick={() =>
                route.collapse ? handleToggle(route.key) : navigate(`/${route.route}`)
              }
              selected={location.pathname.startsWith(`/${route.route}`)}
            >
              <ListItemIcon sx={{ color: "#242424" }}>{route.icon}</ListItemIcon>
              <ListItemText primary={route.name} />
              {route.collapse ? (
                openKeys[route.key] ? <ExpandLess /> : <ExpandMore />
              ) : null}
            </ListItemButton>

            {/* Submódulos */}
            {route.collapse && (
              <Collapse in={openKeys[route.key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {route.collapse.map((sub) => (
                    <ListItemButton
                      key={sub.key}
                      sx={{ pl: 4 }}
                      onClick={() => navigate(`/${route.route}/${sub.route}`)}
                      selected={location.pathname.startsWith(`/${route.route}`)}
                    >
                      <ListItemIcon sx={{ color: "#242424" }}>{sub.icon}</ListItemIcon>
                      <ListItemText primary={sub.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
}