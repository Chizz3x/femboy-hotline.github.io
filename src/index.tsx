import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./icons.css";
import Home from "./routes/Home";
import {
  BrowserRouter,
  Route,
  RouteProps,
  Routes
} from "react-router-dom";
import { ROUTES } from "./routes";
import P404 from "./routes/404";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/layout";
import About from "./routes/about";
import Contact from "./routes/contact";
import Donate from "./routes/donate";
import GlobalStyle from "./style";

const toastStyle: React.CSSProperties = { background: "var(--c-p1-aa)" };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const PAGES: RouteProps[] = [
  {
    path: ROUTES.home,
    element: <Layout>
      <Home />
    </Layout>
  },
  {
    path: ROUTES.about,
    element: <Layout>
      <About />
    </Layout>
  },
  {
    path: ROUTES.contact,
    element: <Layout>
      <Contact />
    </Layout>
  },
  {
    path: ROUTES.donate,
    element: <Layout>
      <Donate />
    </Layout>
  }
];

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer toastStyle={toastStyle} position="bottom-left" />
    <BrowserRouter>
      <Routes>
        {PAGES.map((page, index) => <Route key={index} {...page} path={`${page.path}`} />)}
        <Route path="*" element={<Layout><P404 /></Layout>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
