import styled from "styled-components";
import React from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const Layout = (props: NLayout.IProps) => {
  const { children, showHeader = true, showFooter = true } = props;

  return <LayoutStyle>
    {showHeader ? <Header /> : null}
    {children}
    {showFooter ? <Footer /> : null}
  </LayoutStyle>;
};

export default Layout;

export namespace NLayout {
	export interface IProps {
		children?: JSX.Element;
		showHeader?: boolean;
		showFooter?: boolean;
	}
}

const LayoutStyle = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	overflow-x: hidden;
	flex-direction: column;

	@function hexToRGB($hex) {
		@return red($hex), green($hex), blue($hex);
	}
`;