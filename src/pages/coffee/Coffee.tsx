import React from 'react';
// import { COFFEE } from '../../const';
import { RedirectPage } from '../../components/redirect-page';

const Coffee = () => {
	React.useEffect(() => {
		// window.location.href = COFFEE;
	}, []);

	return <RedirectPage />;
};

export default Coffee;
