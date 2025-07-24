import React from 'react';
import { SOCIAL } from '../../const';
import { RedirectPage } from '../../components/redirect-page';

const Discord = () => {
	React.useEffect(() => {
		window.location.href =
			SOCIAL?.find((f) => f.id === 'dc')?.link ||
			'';
	}, []);

	return <RedirectPage />;
};

export default Discord;
