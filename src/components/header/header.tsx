import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const Header = () => {
  return <HeaderStyle>
    <div className='container'>
      <img className='icon' src="favicon.png"></img>
      <div className='tab tab-main'><i>Femboy Hotline</i></div>
      <div className='menu-info'>Call us today! <span className='fake-link' onClick={() => toast("It aint real...", { type: "info" })}>+48 123 123 69</span></div>
    </div>
  </HeaderStyle>;
};

export { Header };

const HeaderStyle = styled.div`
	width: 100vw;
	box-shadow: 0 0 5px var(--c-p);
	background-color: var(--c-p1);
	border-top: 4px solid var(--c-pink2);
	position: sticky;
	top: 0;
	z-index: 999;
	
	.container {
		padding-left: 20px;
		padding-right: 20px;
		display: flex;
		align-items: center;
		flex-direction: row;
		position: relative;
		.icon {
			max-width: 100%;
			height: 45px;
			margin-right: 20px;
		}
		.tab-main {
			line-height: 60px;
			font-size: 30px;
		}
		.menu-info {
			font-size: 14px;
			margin-left: 30px;
			margin-right: 30px;
		}
	}
`;