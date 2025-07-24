import React from 'react';
import { DONATION } from '../../const';
import { RedirectPage } from '../../components/redirect-page';

const Patreon = () => {
	React.useEffect(() => {
		window.location.href =
			DONATION.find((f) => f.id === 'ptrn')
				?.link || '';
	}, []);

	return <RedirectPage />;
};

export default Patreon;
