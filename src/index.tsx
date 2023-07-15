import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./icons.css";
import Index from "./pages";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./style";
import { BrowserRouter } from "react-router-dom";

const toastStyle: React.CSSProperties = { background: "var(--c-p1-aa)" };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer toastStyle={toastStyle} position="bottom-left" />
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </React.StrictMode>
);
