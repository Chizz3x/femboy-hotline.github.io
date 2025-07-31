import React from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NModals } from '../modals';
import { ModalLayout } from '../layout';
import {
	localStorageRemove,
	localStorageSet,
} from '../../../utils/local-storage';

const name = 'ModalSwitchingDomains';
const Modal = (
	props: NModalSwitchingDomains.IProps,
) => {
	const handleCheckbox = (
		_event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		if (checked) {
			localStorageSet(
				'switching-domains',
				'true',
			);
		} else {
			localStorageRemove('switching-domains');
		}
	};

	return (
		<ModalLayout {...props} name={name}>
			<ModalSwitchingDomainsStyle>
				<h2>ATTENTION!</h2>
				<p>
					<b className="brand">
						femboy-hotline.ml
					</b>{' '}
					will cease to exist on{' '}
					<b className="brand">2023-10-24</b>{' '}
					because we are switching to{' '}
					<b className="brand">
						femboy-hotline.com
					</b>
					.
				</p>
				<p className="gray">
					This redirect will be operational until
					the provided date.
				</p>
				<FormControlLabel
					className="checkbox"
					label="Don't show again"
					control={
						<Checkbox
							classes={{ checked: 'checked' }}
							onChange={handleCheckbox}
						/>
					}
				/>
				<br />
				<span className="smol">
					Click on the overlay to close
				</span>
			</ModalSwitchingDomainsStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalSwitchingDomains {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}
}

const ModalSwitchingDomainsStyle = styled.div`
	max-width: 400px;
	h2 {
		color: var(--c-red1);
	}
	.gray {
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}
	.brand {
		color: ${({ theme }) =>
			theme?.palette?.primary?.main};
	}
	.smol {
		font-size: 12px;
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}
	.checkbox {
		span {
			font-size: 14px;
			color: ${({ theme }) =>
				theme?.palette?.text?.secondary};
		}
		.checked {
			path {
				color: ${({ theme }) =>
					theme?.palette?.primary?.main};
			}
		}
		path {
			color: ${({ theme }) =>
				theme?.palette?.text?.secondary};
		}
	}
`;
