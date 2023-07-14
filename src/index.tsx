import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./icons.css";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Route,
  RouteProps,
  Routes
} from "react-router-dom";
import { ROUTES } from "./routes";
import P404 from "./pages/404";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/layout";
import About from "./pages/about";
import Contact from "./pages/contact";
import Donate from "./pages/donate";
import GlobalStyle from "./style";
import Discord from "./pages/discord";
import Patreon from "./pages/patreon";
import Coffee from "./pages/coffee";

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
  },
  {
    path: ROUTES.discord,
    element: <Layout>
      <Discord />
    </Layout>
  },
  {
    path: ROUTES.patreon,
    element: <Layout>
      <Patreon />
    </Layout>
  },
  {
    path: ROUTES.coffee,
    element: <Layout>
      <Coffee />
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
        <Route path="/*" element={<Layout><P404 /></Layout>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
