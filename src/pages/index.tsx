import React from "react";
import {
  Route,
  RouteProps,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import P404 from "./404";
import { Layout } from "../components/layout";
import About from "./about";
import Contact from "./contact";
import Donate from "./donate";
import Discord from "./discord";
import Patreon from "./patreon";
import Coffee from "./coffee";
import { ROUTES } from "../routes";
import Home from "./Home";

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

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ isProper, setIsProper ] = React.useState(false);

  React.useEffect(() => {
    console.log("load");
    if(location.search.startsWith("?/")) {
      navigate(location.search.slice(1));
    }
    setIsProper(true);
  }, []);

  if(!isProper) return null;

  return <>
    <Routes>
      {PAGES.map((page, index) => <Route key={index} {...page} path={`${page.path}`} />)}
      <Route path="/*" element={<Layout><P404 /></Layout>}></Route>
    </Routes>
  </>;
};

export default Index;