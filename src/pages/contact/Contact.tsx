import styled from "styled-components";
import React from "react";
import { DISCORD_INVITE } from "../../const";

const Contact = () => {
  return <ContactStyle>
    <h2>Contact information I am willing to disclose</h2>
    <p>Email: <a href="mailto:femboy.fellaboy@gmail.com">femboy.fellaboy@gmail.com</a></p>
    <p>Discord: <a href={DISCORD_INVITE}>AnimeCord</a></p>
    <p className='gray smol'>Of couse you can find me on other places, that is if you know where to look ;P</p>
  </ContactStyle>;
};

export default Contact;

const ContactStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	p {
		margin: 5px 0;
	}
	.gray {
		color: var(--c-p3);
	}
	.smol {
		font-size: 12px;
		color: var(--c-p3);
	}
`;