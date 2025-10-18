import axios from 'axios';
import React from 'react';
import {
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { API_ROUTES, ROUTES } from '../../routes';
import { fetchUser } from '../../store/slices/user';
import { useDispatch } from '../../store/store';

const ChangeEmail = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const token = params.get('token');

	const dispatch = useDispatch();

	const [emailChanged, setEmailChanged] =
		React.useState(false);

	React.useEffect(() => {
		if (!emailChanged && token) {
			axios
				.post(
					API_ROUTES.changeEmail,
					{
						token,
					},
					{
						headers: {
							'grecaptcha-token': token,
						},
					},
				)
				.then((resp) => {
					setEmailChanged(true);
					if (
						resp?.data?.statusCode ===
						StatusCodes.OK
					) {
						toast('Email changed', {
							type: 'success',
						});
						dispatch(fetchUser());
						navigate(ROUTES.login);
					} else {
						toast('Failed to change email', {
							type: 'error',
						});
					}
				});
		}
	}, []);

	return (
		<ChangeEmailStyle>
			<div className="change-email-container">
				Changing your email address...
				<br />
				If you see this page hanging, that means
				something has went wrong :(
			</div>
		</ChangeEmailStyle>
	);
};

export default ChangeEmail;

export namespace NChangeEmail {
	//
}

const ChangeEmailStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	.change-email-container {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		padding: 20px 30px;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;
	}
`;
