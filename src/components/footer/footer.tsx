import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <FooterStyle>
    <div>
      <span>Femboy hotline for all my femboys</span>
    </div>
    <div>
      <span>Made with <span className='love-icon' title="Love">❤</span></span>
    </div>
    <div className='uwuright'>
      <span>uwuright<span className='uwuright-sign'>u</span> 2022-{new Date().getFullYear()}</span>
    </div>
    <div className='small'>
      <span>Note that this is not a legitimate thing and nothing on this page is real, sadly</span>
    </div>
  </FooterStyle>;
};

export { Footer };

const FooterStyle = styled.div`
	height: 100px;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 20px;
	padding-top: 20px;
	text-align: center;
	background-color: var(--c-p1);
	z-index: 999;

	.small {
		color: var(--c-p3)
	}

	.uwuright-sign {
		font-size: 12px;
		border: 1px solid var(--c-p8);
		border-radius: 50%;
		height: 12px;
		aspect-ratio: 1/1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.love-icon {
		color: var(--c-pink1);
	}
`;