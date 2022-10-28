import React from "react";
import styled from "styled-components";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

const range = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from) + from);
};

const imgs = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png"
];

const getImg = (exclude: string[] = []) => {
  const filtered = imgs.filter(f => !exclude.includes(f));
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const getNUniqueImgs = (n: number) => {
  const _imgs: string[] = [];
  for(let i = 0; i < n; i++)
    _imgs.push(getImg(_imgs));
  return _imgs;
};

const Content = () => {
  return <ContentStyle>
    <h1>Hi to Femboys!</h1>
    <p>{"It's okay to be yourself, but this is a bit too much..."}</p>
    <div className='main-container'>
      <h2>Hotline:</h2>
      <div className="hotline">
        <ul className='center'>
          {
            (new Array(Math.round(Math.random() * (50 - 20) + 20)))
              .fill(undefined)
              .map((m, i) => <li key={i}>{`+48 (${range(10, 80)}) ${range(120, 190)} ${range(10, 99)} ${range(10, 99)}`}</li>)
          }
        </ul>
      </div>
    </div>
  </ContentStyle>;
};

const BG = () => {
  const uimgs = getNUniqueImgs(2);

  return <BGStyle>
    <div className="container left"><img src={`img/${uimgs[0]}`}></img></div>
    <div className='container right'><img src={`img/${uimgs[1]}`}></img></div>
  </BGStyle>;
};

const App = () => {
  return (
    <AppStyle className="App">
      <BG />
      <Header />
      <Content />
      <Footer />
    </AppStyle>
  );
};

export default App;

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;

	@function hexToRGB($hex) {
		@return red($hex), green($hex), blue($hex);
	}
`;

const BGStyle = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	z-index: -1;
	display: flex;
	flex-direction: row;
	filter: brightness(.5);
	overflow: hidden;
	.container {
		position: relative;
		height: 100%;
		width: 50%;
		&.left img {
			left: 0;
		}
		&.right img {
			right: 0;
		}
		img {
			position: absolute;
			bottom: 0;
			width: 500px;
		}
	}
`;

const ContentStyle = styled.div`
	flex-grow: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		text-align: center;
	}

	ul {
		list-style: none;
		padding: 0;
		li {
			line-height: 30px;
		}
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		width: 500px;
		box-shadow: 0 0 5px var(--c-p);
		border-radius: 30px;
		padding: 25px;
		padding-top: 0;
		overflow: hidden;
		margin-bottom: 20px;
		background-color: var(--c-p1-aa);

		h2 {
			text-align: center;
		}
		.hotline {
			overflow-y: scroll;
			height: 100%;
			::-webkit-scrollbar {
				width: 10px;
			}
			::-webkit-scrollbar-track {
				background: transparent;
			}
			::-webkit-scrollbar-thumb {
				background: var(--c-p4);
				border-radius: 5px;
			}
			::-webkit-scrollbar-thumb:hover {
				background: var(--c-p3);
			}
		}
	}
`;
