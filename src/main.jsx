import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import App from "./App";
import CreateTrip from "./create-trip";
import ViewTrip from "./view-trip/[tripId]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "create-trip",
        element: <CreateTrip />
      },
      {
        path: "view-trip/:tripId",
        element: <ViewTrip />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
