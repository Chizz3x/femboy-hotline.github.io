import React from 'react';
import { DISCORD_INVITE } from '../../const';
import { RedirectPage } from '../../components/redirect-page';

const Discord = () => {
	React.useEffect(() => {
		window.location.href = DISCORD_INVITE;
	}, []);

	return <RedirectPage />;
};

export default Discord;
