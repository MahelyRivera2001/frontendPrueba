import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes/router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Navigate to="registro" replace />} />

        {routes.map((r) => {
          if (!r.collapse) {
            return (
              <Route
                key={r.key}
                path={r.route}
                element={<r.component />}
              />
            );
          }
          
          return (
            <Route key={r.key} path={r.route}>
              {r.collapse.map((sub) => (
                <Route
                  key={sub.key}
                  path={sub.route}
                  element={<sub.component />}
                />
              ))}
            </Route>
          );
        })}
      </Route>

      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
}