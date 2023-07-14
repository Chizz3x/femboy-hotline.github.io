import React from "react";
import { PATREON } from "../../const";
import { RedirectPage } from "../../components/redirect-page";

const Patreon = () => {
  React.useEffect(() => {
    window.location.href = PATREON;
  }, []);

  return <RedirectPage />;
};

export default Patreon;