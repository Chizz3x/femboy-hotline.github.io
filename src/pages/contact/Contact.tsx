import styled from "styled-components";
import React from "react";
import { DISCORD_INVITE, EMAIL } from "../../const";
import { CopyButton } from "../../components/copy-button";

const Contact = () => {
  return <ContactStyle>
    <h2>Contact information I am willing to disclose</h2>
    <p>Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a><CopyButton data={EMAIL} /></p>
    <p>Discord: <a target="_blank" href={DISCORD_INVITE} rel="noreferrer">AnimeCord</a><CopyButton data={DISCORD_INVITE} /></p>
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
	.copy-button {
		padding-left: 10px;
	}
`;