/**
 * Entry point of the React application.
 * Sets up the React Root, StrictMode, and global providers:
 * - BrowserRouter for routing
 * - MantineProvider for UI components styling
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
