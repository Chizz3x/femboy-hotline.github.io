import styled from "styled-components";
import React from "react";
import { COFFEE, PATREON } from "../../const";

const Donate = () => {
  return <DonateStyle>
    <h2>Support femboy-hotline.com</h2>

    <p>Running and maintaining femboy-hotline.com incurs costs for hosting, domain registration, and other operational
		expenses. We are committed to providing valuable content to our visitors free of charge. If you find our website
		helpful and would like to support our efforts, we welcome your donations.</p>

    <h2>Why Donate?</h2>
    <p>Your donations help us in the following ways:</p>
    <ul>
      <li>Keep the website online and accessible to everyone.</li>
      <li>Improve and expand our content and features.</li>
      <li>Cover the expenses associated with running and maintaining the site.</li>
    </ul>

    <h2>How to Donate</h2>
    <p>If you would like to make a donation to support femboy-hotline.com, you can do so via the following methods:</p>

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

    <h2>Notice About Ads</h2>
    <p>This website may display ads to help cover its operational costs. We are committed to keeping our content free
        for all users. However, if donation contributions cover our expenses in the future, we may consider removing
        ads to enhance the user experience. Your support is crucial in achieving this goal.</p>

    <h2>Thank You</h2>
    <p>Your support is greatly appreciated. By donating, you help ensure that femboy-hotline.com can continue to
        provide valuable information and resources to our community. Thank you for being a part of our mission.</p>
  </DonateStyle>;
};

export default Donate;

const DonateStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	.donate-links {
		margin-top: 50px;
		display: flex;
		align-items: left;
		flex-direction: column;
		width: fit-content;
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