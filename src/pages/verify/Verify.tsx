import React from 'react';
import {
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { CircularProgress } from '@mui/material';
import { API_ROUTES, ROUTES } from '../../routes';

const Verify = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const token = params.get('token');

	const [success, setSuccess] =
		React.useState(false);
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] =
		React.useState('');
	const [errorCode, setErrorCode] =
		React.useState(0);

	React.useEffect(() => {
		(async () => {
			if (token) {
				const res = await axios.post(
					API_ROUTES.verify,
					{
						token,
					},
				);
				if (
					res.data.statusCode === StatusCodes.OK
				) {
					setSuccess(true);
					setTimeout(() => {
						navigate(ROUTES.login);
					}, 5000);
				} else {
					setError(true);
					setErrorMessage(res.data.message);
					setErrorCode(res.data.statusCode);
				}
			} else {
				setError(true);
				setErrorMessage('No token provided');
				setErrorCode(StatusCodes.BAD_REQUEST);
			}
		})();
	}, [token]);

	return (
		<RegisterStyle>
			{success ? (
				<div className="verify-success">
					<span className="success-text">
						Verification success, redirecting in 5
						seconds...
					</span>
				</div>
			) : error ? (
				<div className="verify-error">
					<span className="error-code">
						{errorCode}
					</span>
					<span className="error-message">
						{errorMessage}
					</span>
					<span className="error-text">
						Something went wrong, could not verify
						your account
					</span>
				</div>
			) : (
				<div className="verify-loading">
					<CircularProgress
						style={{ color: 'var(--c-pink1)' }}
					/>
					<span className="loading-text">
						Verifying
					</span>
				</div>
			)}
		</RegisterStyle>
	);
};

export namespace NVerify {
	//
}

export default Verify;

const RegisterStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;

	.verify-loading {
		display: flex;
		flex-direction: column;
		align-items: center;

		.loading-text {
			margin-top: 20px;
		}
	}

	.verify-success {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.verify-error {
		display: flex;
		flex-direction: column;
		align-items: center;

		.error-code {
			color: var(--c-pink1);
			font-size: 2em;
		}

		.error-text {
			color: var(--c-p4);
		}
	}
`;
