import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <FooterStyle>
    <div>
			Femboy hotline for all those femboys
    </div>
    <div>
			Made with <span title="Love">❤</span>
    </div>
    <div className='small'>
			Note that this is not a legitimate thing and nothing on this page is real, sadly
    </div>
  </FooterStyle>;
};

export { Footer };

const FooterStyle = styled.div`
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 20px;
	padding-top: 20px;

	.small {
		color: var(--c-p3)
	}
`;