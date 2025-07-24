import React from 'react';
import styled from 'styled-components';

const SafePlace = () => {
	return (
		<SafePlaceStyle>
			<div className="safe-place-container">
				<h1>Safe Place</h1>
				<span>
					Please come back once you are a big
					boy/girl
				</span>
			</div>
		</SafePlaceStyle>
	);
};

export default SafePlace;

const SafePlaceStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 50px;
	justify-content: center;
	align-items: center;
	.safe-place-container {
		text-align: center;
	}
`;
