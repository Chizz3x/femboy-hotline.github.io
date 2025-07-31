import 'react-toastify/dist/ReactToastify.css';
import './icons.css';

import './setup-yup';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Index from './pages';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<HashRouter>
			<Index />
		</HashRouter>
	</React.StrictMode>,
);
