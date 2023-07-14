import styled from "styled-components";
import React from "react";
import { COFFEE, PATREON } from "../../const";

const Donate = () => {
  return <DonateStyle>
    <h2>This costs $</h2>
    <p>As most of us know, keeping a website well fed and dressed costs money, just like your children (if you have any (i don&apos;t)).</p>
    <p>And as most of us know money does not grow on trees (although it kinda does)</p>
    <p>So hence this page for kind people who are not dads yet and have some $ to spare, i present you <b className='brand'>DONATIONS</b></p>
    <h2>Do I get anything?</h2>
    <p>Oh hell yeah! Honestly the only stuff you get for donating could be a good feeling for being a part of this and mentioning you on homepage!</p>
    <p>On homepage, we can reserve you a completely custom line of text where you can style it however you want and write there anything your bulge desires. (With little to no limits)</p>

    <div className='donate-links'>
      <a target="_blank" href={PATREON} rel="noreferrer">
        <div className='patreon'>
          <img src="/img/donate/patreon.png" />
        </div>
      </a>
      <a target="_blank" className='coffee' href={COFFEE} rel="noreferrer">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" />
      </a>
    </div>
  </DonateStyle>;
};

export default Donate;

const DonateStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	text-align: center;
	.donate-links {
		margin-top: 50px;
		display: flex;
		align-items: center;
		flex-direction: column;
		> * {
			:not(:last-child) {
				margin-bottom: 10px;
			}
		}
	}
	.brand {
		color: var(--c-pink1);
	}
	.coffee {
		img {
			width: 200px;
		}
	}
	.patreon {
		padding: 5px 10px;
		background-color: #FF424D;
		display: flex;
		box-sizing: border-box;
		img {
			width: 180px;
		}
	}
`;