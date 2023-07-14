import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { CSSMediaSize } from "../const";

const Home = () => {
  return (
    <HomeStyle id="Home">
      <div className="image">
        <img src="img/1.png"></img>
        <div className='image-text-bottom'>
          <h2>Hi to Femboys!</h2>
        </div>
      </div>
      <div className='content1'>
        <div className='content1-inline'>
          <h3>Femboy Fellaboy Service</h3>
          <span>Every Femboy is our fella, no matter the color, age, religious and political views.</span>
        </div>
        <div className='content1-inline'>
          <h3>Click n&apos; Call</h3>
          <span>Quick and simple way to get in touch with our Femboy friends, just click n&apos; call!</span>
        </div>
        <div className='content1-inline'>
          <h3>Spread AIDS with us!</h3>
          <span>Who cares about reproduction, right?<br/>WE WANT MEN!</span>
        </div>
      </div>
      <div className="image">
        <img src="img/2.png"></img>
        <div className='image-text'>
          <div className='image-text-box image-text-box-right'>
            <h2>About us</h2>
            <span>Out goal is to support Femboys in this cruel and unforgiving world.</span>
          </div>
        </div>
      </div>
      <div className="image">
        <img src="img/3.png"></img>
        <div className='image-text'>
          <div className='image-text-box image-text-box-left'>
            <h2>Why???</h2>
            <span>Femboys...</span>
          </div>
        </div>
      </div>
      <div className='content2'>
        <div className='content2-box'>
          <div className='content2-sub-box'>
            <span className='content2-box-header'>350 Mil</span>
            <span className='content2-box-info'>Femboys worldwide</span>
          </div>
          <div className='content2-sub-box'>
            <span className='content2-box-header'>100%</span>
            <span className='content2-box-info'>Femboys using Linux</span>
          </div>
          <div className='content2-sub-box'>
            <span className='content2-box-header'>Since 1990</span>
            <span className='content2-box-info'>Still exist</span>
          </div>
        </div>
      </div>
      <div className='content3'>
        <div className='content3-profile-box'>
          <div className='content3-profile-icon-box'>
            <img src='img/p1.png' />
          </div>
          <div className='content3-profile-info-box'>
            <span className='content3-profile-quote'>&quot;Best hotline ever! Be the reason their Bussy quivers.&quot;</span>
            <span className='content3-profile-name'>A-wut Suparat</span>
            <span className='content3-profile-country'>- Phichit, Thailand</span>
          </div>
        </div>
        <div className='content3-profile-box'>
          <div className='content3-profile-icon-box'>
            <img src='img/p2.png' />
          </div>
          <div className='content3-profile-info-box'>
            <span className='content3-profile-quote'>&quot;Never thought I&apos;d meet that much daily buttplug enjoyers. Thanks Femboy Hotline!&quot;</span>
            <span className='content3-profile-name'>Aabheer Juntasa</span>
            <span className='content3-profile-country'>- Loei, Thailand</span>
          </div>
        </div>
        <div className='content3-profile-box'>
          <div className='content3-profile-icon-box'>
            <img src='img/p3.png' />
          </div>
          <div className='content3-profile-info-box'>
            <span className='content3-profile-quote'>&quot;I don&apos;t know why I&apos;m here...&quot;</span>
            <span className='content3-profile-name'>Walter Hartwell White</span>
            <span className='content3-profile-country'>- Albuquerque, New Mexico</span>
          </div>
        </div>
      </div>
      <div className="image image-end">
        <img src="img/4.png"></img>
        <div className='image-text'>
          <div className='image-text-box image-text-box-left'>
            <h2>It is time to join us</h2>
            <span>Call us now! <span className='fake-link' onClick={() => toast("Or maybe not...", { type: "info" })}>+48 123 123 69</span></span>
          </div>
        </div>
      </div>
      <div className='content4'>
        <h2>Donator wall!</h2>
        <span className='smol gray'>Here is what our donators left to hang</span>
        <p>Oh well, they didn&apos;t leave anything after all...</p>
        <span>:(</span>
      </div>
    </HomeStyle>
  );
};

export default Home;

const HomeStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;

	.gray {
		color: var(--c-p3);
	}
	.smol {
		font-size: 14px;
	}

	.image {
		width: 100%;
		height: 600px;
		overflow: hidden;
		position: relative;
		&.image-end {
			> img {
				filter: brightness(0.7);
			}
			.image-text {
				justify-content: center;
				text-align: center;
			}
		}
		> img {
			z-index: -1;
			filter: brightness(0.9);
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			object-fit: cover;
			width: 100%;
			height: 100%;
		}

		.image-text {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			:has(.image-text-box-right) {
				justify-content: right;
			}
			.image-text-box {
				background-color: var(--c-p1-aa);
				padding: 0 30px;
				padding-bottom: 30px;
				max-width: 400px;
				min-width: 300px;
				&.image-text-box-right {
					margin-right: 50px;
					> h2 {
						text-align: right;
					}
				}
				&.image-text-box-left {
					margin-left: 50px;
				}
				> h2 {
					font-size: 32px;
					color: var(--c-pink1);
				}
			}
		}

		.image-text-bottom {
			background-image: linear-gradient(transparent, var(--c-p1) 90%);
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			text-align: center;
			color: var(--c-pink1);
			> h2 {
				font-size: 42px;
				-webkit-text-stroke: 2px var(--c-p1);
			}
		}
	}

	.content1 {
		width: 100%;
		display: flex;
		padding: 50px 0;
		justify-content: space-evenly;
		.content1-inline {
			> h3 {
				color: var(--c-pink1);
			}
			> span {
				color: var(--c-p7);
			}
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			max-width: 210px;
			text-align: center;
		}
	}

	.content2 {
		width: 100%;
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		@keyframes flicker {
			0% {
				box-shadow: 0 -5px 6px -4px var(--c-pink1), 0 5px 6px -4px var(--c-pink1);
			}
			25% {
				box-shadow: 0 -5px 10px -4px var(--c-pink1), 0 5px 10px -4px var(--c-pink1);
			}
			50% {
				box-shadow: 0 -5px 7px -4px var(--c-pink1), 0 5px 7px -4px var(--c-pink1);
			}
			75% {
				box-shadow: 0 -5px 6px -4px var(--c-pink1), 0 5px 6px -4px var(--c-pink1);
			}
			100% {
				box-shadow: 0 -5px 5px -4px var(--c-pink1), 0 5px 5px -4px var(--c-pink1);
			}
		}
		.content2-box {
			padding: 10px 30px;
			background-color: var(--c-p2);
			min-width: 400px;
			animation: flicker 5s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite alternate;
			.content2-sub-box {
				text-align: center;
				display: flex;
				flex-direction: column;
				:not(:last-child) {
					margin-bottom: 20px;
				}
				.content2-box-header {
					font-size: 32px;
					font-weight: 700;
					color: var(--c-pink3);
				}
				.content2-box-info {
					color: var(--c-p7);
					font-size: 14px;
				}
			}
		}
	}

	.content3 {
		width: 100%;
		padding: 50px 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: var(--c-p2);
		.content3-profile-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 300px;
			.content3-profile-icon-box {
				border-radius: 50%;
				overflow: hidden;
				position: relative;
				width: 150px;
				height: 150px;
				margin-bottom: 10px;
				> img {
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.content3-profile-info-box {
				text-align: center;
				display: flex;
				flex-direction: column;
				.content3-profile-quote {
					font-size: 22px;
				}
				.content3-profile-name {
					color: var(--c-p7);
				}
				.content3-profile-country {
					color: var(--c-p6);
				}
			}
		}
	}

	.content4 {
		padding: 50px 0;
		text-align: center;
	}

	${CSSMediaSize.tablet} {
		.content1 {
			flex-direction: column;
			align-items: center;
		}
		.image-text {
			flex-grow: 1;
			justify-content: center !important;
			.image-text-box {
				box-sizing: border-box;
				width: 100%;
				margin: 0 !important;
				padding: 30px !important;
				text-align: center;
				> h2 {
					text-align: center !important;
				}
			}
		}
		.content2 {
			.content2-box {
				min-width: auto;
			}
		}
		.content3 {
			flex-direction: column;
			.content3-profile-box {
				:not(:last-child) {
					margin-bottom: 50px;
				}
				.content3-profile-icon-box {
					width: 100px;
					height: 100px;
				}
				.content3-profile-info-box {
					.content3-profile-quote {
						font-size: 18px;
					}
				}
			}
		}
	}
`;
