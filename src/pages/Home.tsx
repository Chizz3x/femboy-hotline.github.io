import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { CSSMediaSize } from "../const";
import weekday from "dayjs/plugin/weekday";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import useScrollIntoView from "../utils/use-scroll-into-view";
//import { ConfettiGun } from "../components/confetti-gun";

dayjs.extend(weekday);
dayjs.extend(duration);

const donatorClassNames: NHome.IDonatorClasses = {
  0: {
    class: "first",
    subtext: "Diamond",
    children: (props) => {
      return <img {...props} src="img/materials/diamond.jpg" />;
    }
  },
  1: {
    class: "second",
    subtext: "Platinum",
    children: (props) => <div {...props}>
      <div className='glare-cursor-1'>
        <div className='glare-object' />
      </div>
      <div className='glare-cursor-2'>
        <div className='glare-object' />
      </div>
      <div className='glare-cursor-3'>
        <div className='glare-object' />
      </div>
    </div>
  },
  2: { class: "third" } 
};
const donatorWall: NHome.IDonatorWall[] = [ { text: "Andy 0-0" }, { text: "Pathy Boi" } ];

const Home = () => {
  const [ time, setTime ] = React.useState(0); // seconds
  const [ timeRemaining, setTimeRemaining ] = React.useState(0);
  //const confettiState = React.useState(true);

  const date = dayjs().startOf("day");
  const weekdayNow = date.weekday();
  const lastFriday = weekdayNow >= 5 ? date.weekday(5) : date.subtract(1, "week").weekday(5);
  const nextFriday = weekdayNow < 5 ? date.weekday(5) : date.add(1, "week").weekday(5);
  const fridayDiff = Math.abs(nextFriday.diff(lastFriday, "second"));
  const isFriday = weekdayNow === 5;
  const fridayPercent = isFriday ? 100 : Math.floor(100 / fridayDiff * (fridayDiff - time));
  const timeRemainingPercent = isFriday ? Math.ceil(100 / 86400 * timeRemaining) : 100;

  const fridayRef = React.useRef<HTMLDivElement>(null);

  const fridayScrollIntoView = useScrollIntoView(fridayRef, 0.6);

  React.useEffect(() => {
    let interval: NodeJS.Timer | undefined;

    const updateTime = () => {
      if(isFriday) {
        if(time !== 0) setTime(0);
        const dur = Math.abs(dayjs().diff(date.endOf("day"), "second"));
        setTimeRemaining(dur);
      } else {
        if(timeRemaining !== 0) setTimeRemaining(0);
        const dur = Math.abs(dayjs().diff(nextFriday, "second"));
        setTime(dur);
      }
    };

    const initTimeout = setTimeout(() => {
      interval = setInterval(updateTime, 1000);
    }, new Date().getTime() % 1000);

    updateTime();

    return () => {
      clearInterval(initTimeout);
      clearInterval(interval);
    };
  }, []);

  // Unused for now
  React.useEffect(() => {
    if(fridayScrollIntoView.scrolledIntoView) {
      //
    }
  }, [fridayScrollIntoView.scrolledIntoView]);

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
            <span>Our goal is to support Femboys in this cruel and unforgiving world.</span>
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
            <span className='content3-profile-quote'>&quot;Gave a call, was not disappointed&quot;</span>
            <span className='content3-profile-name'>Walter Hartwell White</span>
            <span className='content3-profile-country'>- Albuquerque, New Mexico</span>
          </div>
        </div>
      </div>
      <div ref={fridayRef} className='femboy-day-schedule'>
        {/*<ConfettiGun
          className='confetti-gun-bottom-left'
          state={confettiState}
          portal={document.body}
          style={{
            top: "50%",
            left: "50%"
          }}
        />*/}
        <div className='femboy-day-schedule-box'>
          <span className='femboy-day-title'>{isFriday ? "It is" : "Time left until"} <span className='pinkish-text'>Femboy Friday</span>!</span>
          <span className='femboy-day-time-text'>{isFriday ? `Literally now [ ${date.format("YYYY-MM-DD")} ]` : dayjs.duration(time, "seconds").format("D [days] H [hours] m [minutes] s [seconds]")}</span>
          {isFriday ? <span className='femboy-day-remaining-text'>Remaining of Femboy Friday</span> : null}
          <div className='process-bar-box'>
            <div className='progress-bar'>
              <div className='progress-bar-fill' style={{ width: `${isFriday ? timeRemainingPercent : fridayPercent}%` }} />
              <div className='progress-bar-text'>
                <span>{isFriday ? timeRemainingPercent : fridayPercent}%</span>
              </div>
            </div>
          </div>
          <span>Let us celebrate each Friday like it is the last one!</span>
        </div>
      </div>
      <div className='country-ranks-box'>
        <h3>Country ranking by visits</h3>
        <span>Here you can see which countries visit this site the most!</span>
        <a target="_blank" href="https://info.flagcounter.com/LOnc" rel="noreferrer"><img src="https://s01.flagcounter.com/countxl/LOnc/bg_404040/txt_FFFFFF/border_404040/columns_2/maxflags_10/viewers_0/labels_1/pageviews_0/flags_0/percent_0/" alt="Flag Counter" /></a>
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
        <span className='smol gray'>Here is our donators and what they left to hang</span>
        {
          donatorWall.length
            ? donatorWall.map((m, i) => {
              const cn = donatorClassNames[i] || "";
              return <div key={i} className={[ "donator-box", `${cn.class}-donator` ].join(" ")}>
                <div className={[ "donator-name", m.comment ? "has-comment" : "" ].join(" ")}>
                  <p>{m.text}</p>
                </div>
                {m.comment ?
                  <div className='donator-comment'>
                    <span>{m.comment}</span>
                  </div>
                  : null}
                {cn.subtext ? <div className='donator-subtext'><span>{cn.subtext}</span></div> : null}
                {cn.children ? <cn.children className={`${cn.class}-child`} /> : null}
              </div>;
            })
            : <>
              <p>Oh well, they didn&apos;t leave anything after all...</p>
              <span>:(</span>
            </>
        }
      </div>
    </HomeStyle>
  );
};

export namespace NHome {
	export interface IDonatorWall {
		text: string;
		comment?: string;
	}
	export interface IDonatorClasses {
		[key: number]: {
			class: string;
			subtext?: string;
			children?: React.FunctionComponent<any>;
		}
	}
}

export default Home;

const HomeStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;

	.pinkish-text {
		color: var(--c-pink3);
		font-weight: 600;
	}
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
		@keyframes glow {
			0% {
				box-shadow: 0 -5px 6px -4px var(--c-pink1), 0 5px 6px -4px var(--c-pink3);
			}
			25% {
				box-shadow: 0 -5px 10px -4px var(--c-pink1), 0 5px 10px -4px var(--c-pink3);
			}
			50% {
				box-shadow: 0 -5px 7px -4px var(--c-pink1), 0 5px 7px -4px var(--c-pink3);
			}
			75% {
				box-shadow: 0 -5px 6px -4px var(--c-pink1), 0 5px 6px -4px var(--c-pink3);
			}
			100% {
				box-shadow: 0 -5px 5px -4px var(--c-pink1), 0 5px 5px -4px var(--c-pink3);
			}
		}
		.content2-box {
			padding: 10px 30px;
			background-color: var(--c-p2);
			min-width: 400px;
			animation: glow 5s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite alternate;
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

		> span {
			display: block;
			margin-bottom: 20px;
		}

		.donator-box {
			overflow: hidden;
			position: relative;
			max-width: 500px;
			background-color: var(--c-p2);
			background-image: linear-gradient(45deg, var(--c-p1) 0%, var(--c-p2) 100%);
			border-radius: 10px;
			padding: 15px 0;
			:not(:last-child) {
				margin-bottom: 30px;
			}
			:has([class$="-child"]) {
				background-image: none;
				background-color: rgba(0, 0, 0, 0.2);
			}
			.donator-name {
				font-size: 24px;
				&.has-comment {
					> p {
						margin-bottom: 10px;
					}
				}
				> p {
					margin-bottom: 0;
					margin-top: 0;
				}
			}
			.donator-comment {
				font-weight: 500;
			}
			.donator-subtext {
				position: absolute;
				top: 0;
				right: 0;
				font-weight: 800;
				font-size: 12px;
				letter-spacing: 0;
				margin-right: 8px;
				margin-top: 3px;
			}

			@keyframes shine {
				0% {
					filter: invert(0) hue-rotate(0) contrast(0.8) brightness(1.1);
				}
				25% {
					filter: invert(0.1) hue-rotate(90deg) contrast(0.9) brightness(1.5);
				}
				50% {
					filter: invert(0.2) hue-rotate(45deg) contrast(0.8) brightness(1.4);
				}
				75% {
					filter: invert(0) hue-rotate(130deg) contrast(0.7) brightness(1.5);
				}
				100% {
					filter: invert(0.2) hue-rotate(180deg) contrast(1.5) brightness(1.2);
				}
			}

			@keyframes glare {
				0% {
					left: -100px;
					top: 50%;
				}
				100% {
					left: calc(100% + 100px);
					top: 50%;
				}
			}

			[class$="-child"] {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
			}

			.${donatorClassNames[0]?.class}-child {
				object-position: center;
				object-fit: cover;
				animation: shine 6s ease-in-out infinite alternate;
			}
			&.${donatorClassNames[0]?.class}-donator {
				color: rgba(0,0,0,0.7);
				box-shadow: 0 0 10px white, 0 0 20px rgb(180,180,255);
				.donator-name {
					font-weight: 700;
				}
			}
			.${donatorClassNames[1]?.class}-child {
				background-color: rgb(220, 220, 220);
				> .glare-cursor-1 {
					width: 0;
					height: 0;
					position: relative;
					animation: glare 6s ease-in-out infinite alternate;
					transform: rotate(70deg);
					> .glare-object {
						position: absolute;
						width: 100vw;
						height: 50px;
						background-color: white;
						transform: translate(-50%, -50%);
					}
				}
				> .glare-cursor-2 {
					width: 0;
					height: 0;
					position: relative;
					animation: glare 5.5s ease-in-out infinite alternate;
					transform: rotate(70deg);
					> .glare-object {
						position: absolute;
						width: 100vw;
						height: 20px;
						background-color: white;
						transform: translate(-50%, -50%);
						filter: blur(5px);
					}
				}
				> .glare-cursor-3 {
					width: 0;
					height: 0;
					position: relative;
					animation: glare 6s ease-in-out infinite alternate;
					transform: rotate(70deg);
					> .glare-object {
						position: absolute;
						width: 100vw;
						height: 100px;
						background-color: white;
						transform: translate(-50%, -50%);
						filter: blur(20px);
					}
				}
			}
			&.${donatorClassNames[1]?.class}-donator {
				color: rgba(0,0,0,0.7);
				box-shadow: 0 0 10px white, 0 0 20px rgb(180,180,180);
				.donator-name {
					font-weight: 600;
				}
			}
			.${donatorClassNames[2]?.class}-child {
				//
			}
			&.${donatorClassNames[2]?.class}-donator {
				.donator-name {
					font-weight: 500;
				}
			}
		}
	}

	.progress-bar {
		position: relative;
		height: 20px;
		min-width: 50px;
		background-color: var(--c-p2);
		border-radius: 10px;
		overflow: hidden;
		.progress-bar-fill {
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 10px;
			background-color: var(--c-pink1);
			height: 100%;
		}
		.progress-bar-text {
			position: absolute;
			width: 100%;
			height: 100%;
			line-height: 0;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			mix-blend-mode: difference;
		}
	}

	.femboy-day-schedule {
		width: 100%;
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		.femboy-day-schedule-box {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			* {
				:not(:last-child) {
					margin-bottom: 10px;
				}
				text-align: center;
			}
			.femboy-day-title {
				font-size: 24px;
			}
			.process-bar-box {
				display: flex;
				justify-content: center;
				width: 100%;
				.progress-bar {
					margin: 0 20px;
					max-width: 500px;
					flex-grow: 1;
				}
			}
			.femboy-day-time-text {
				font-size: 14px;
				color: var(--c-p6);
			}
			.femboy-day-remaining-text {
				font-size: 16px;
				color: var(--c-p6);
			}
		}
	}

	.country-ranks-box {
		width: 100%;
		min-height: 300px;
		background-color: var(--c-p2);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		> h3 {
			margin: 0;
		}
		> span {
			color: var(--c-p5)
		}
		> a {
			margin-top: 20px;
		}
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
				flex-grow: 1;
				margin: 0 20px;
				max-width: 500px;
				min-width: 200px;
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
