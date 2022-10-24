import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderStyle>
    <div className='container'>
      <img className='icon' src="favicon.png"></img>
      <div className='tab tab-main'><i>Femboy Hotline</i></div>
    </div>
  </HeaderStyle>;
};

export { Header };

const HeaderStyle = styled.div`
	width: 100%;
	box-shadow: 0 0 5px var(--c-p);
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
	}
`;