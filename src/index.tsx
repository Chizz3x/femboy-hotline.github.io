import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./icons.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import P404 from "./pages/404";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/layout";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Donate from "./pages/donate/Donate";
import GlobalStyle from "./style";

const toastStyle: React.CSSProperties = { background: "var(--c-p1-aa)" };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const PAGES = [
  {
    path: ROUTES.home,
    element: () => {
      return <Layout>
        <Home />
      </Layout>;
    }
  },
  {
    path: ROUTES.about,
    element: () => {
      return <Layout>
        <About />
      </Layout>;
    }
  },
  {
    path: ROUTES.contact,
    element: () => {
      return <Layout>
        <Contact />
      </Layout>;
    }
  },
  {
    path: ROUTES.donate,
    element: () => {
      return <Layout>
        <Donate />
      </Layout>;
    }
  },
  {
    path: "*",
    element: () => {
      return <Layout>
        <P404 />
      </Layout>;
    }
  }
];

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer toastStyle={toastStyle} position="bottom-left" />
    <BrowserRouter>
      <Routes>
        {PAGES.map((page, index) => <Route key={index} path={page.path} element={<page.element />} />)}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
