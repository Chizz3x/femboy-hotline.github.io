import styled from 'styled-components';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { CSSMediaSize } from '../../const';
import {
	Guide,
	NGuide,
} from '../../components/guide';
import { ROUTES } from '../../routes';

const guidePath: NGuide.IGuidePathItem[] = [
	{
		name: 'Home',
		route: ROUTES.home,
	},
	{
		name: 'About',
		route: ROUTES.about,
	},
];

const About = () => {
	const barbie: React.MouseEventHandler<
		HTMLSpanElement
	> = (event) => {
		const letters = event.currentTarget.children
			.length
			? [...event.currentTarget.children].map(
					(child) => child.innerHTML,
			  )
			: event.currentTarget.innerHTML.split('');
		// eslint-disable-next-line no-param-reassign
		event.currentTarget.innerHTML = letters
			.map(
				(letter, index) =>
					`<span delay="${
						index / 100
					}" style="animation: pinkWave 1s ease-in-out ${
						index / 100
					}s 5">${
						letter === ' ' ? '&nbsp;' : letter
					}</span>`,
			)
			.join('');
	};

	return (
		<AboutStyle>
			<Guide path={guidePath} />
			<h2>About Femboy Hotline</h2>
			<p>
				Welcome to Femboy Hotline, the hottest
				online destination for all things
				femboy-related! 🌟
			</p>

			<h2>Origin Story</h2>
			<p>
				Femboy Hotline emerged from an internet
				meme, capturing the playful and humorous
				spirit of the community. What started as a
				lighthearted joke quickly gained our
				attention, and we decided to turn it into
				a website for fun!
			</p>
			<p>
				True origin of this idea is{' '}
				<a
					target="_blank"
					href="https://www.reddit.com/r/lgbtmemes/comments/wqxqno/theres_a_femboy_hotline/"
					rel="noreferrer"
				>
					here
				</a>
			</p>

			<h2>Our Mission</h2>
			<p>
				At Femboy Hotline, our mission is to
				create a safe and inclusive space where
				femboy enthusiasts can come together to
				celebrate and appreciate the femboy
				culture. We aim to promote positivity,
				self-expression, and a sense of belonging
				within our community.
			</p>

			<h2>What You&apos;ll Find Here</h2>
			<p>
				On our website, you&apos;ll find a
				monument of femboy existence, various
				random pages with femboy related stuff and
				so on... Whether you are a femboy or not
				you can meme around social platforms with
				this glorious link to spread the
				femboyness, and just in general laugh it
				off.
			</p>

			<h2>Join the Fun!</h2>
			<p>
				We encourage you to explore our website,
				check on it time at a time, maybe once in
				a month or so and you might find some
				interesting stuff here.
			</p>
			<p>
				We might add some easter eggs here, maybe
				test some neat stuff such as web based
				mini-games and such.
				<br />
				<Tooltip
					title="Come on, Barbie, let's go party"
					arrow
				>
					<span
						onClick={barbie}
						className="barbie"
					>
						ImAgInAtIoN, LIFE IS YOUR CREATION!
					</span>
				</Tooltip>
			</p>
			<br />
			<p>
				So go ahead and dive into the fabulous
				world of femboys! We hope you enjoy your
				stay at Femboy Hotline!
			</p>
		</AboutStyle>
	);
};

export default About;

const AboutStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	.barbie {
		cursor: pointer;
		> span {
			display: inline-block;
		}
	}
	@keyframes pinkWave {
		25% {
			color: var(--c-pink1);
		}
		50% {
			transform: translateY(-10px);
			color: var(--c-pink2);
		}
		75% {
			color: var(--c-pink3);
		}
	}

	${CSSMediaSize.phone} {
		padding: 20px 10px;
	}
`;
