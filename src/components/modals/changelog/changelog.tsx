import React from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import { useMediaQuery } from '@mui/material';
import { NModals } from '../modals';
import { ModalLayout } from '../layout';
import {
	localStorageRemove,
	localStorageSet,
} from '../../../utils/local-storage';
import { CSSMediaSize } from '../../../const';

const CHANGELOG_DATE = dayjs('2024-11-24');
const CHANGELOG: NModalChangelog.IChangelogEntry[] =
	[
		{
			title: 'Accounts',
			text: 'Now you can create your own anonymous account for future use. For now account registration is locked under some special keys. If you wish to register on this website, please join our Discord server and claim one of the keys that are not yet taken!',
			images: ['accounts.png'],
		},
		{
			title: 'Changelogs',
			text: 'From now on, you will be met by this modal showing the latest big changes on this website. Keep an eye for it!',
		},
	];

const name = 'ModalChangelog';
const Modal = (props: NModalChangelog.IProps) => {
	const isTablet = useMediaQuery(
		CSSMediaSize.tablet,
	);

	const handleCheckbox = (
		_event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		if (checked) {
			localStorageSet('changelog-hide', 'true');
		} else {
			localStorageRemove('changelog-hide');
		}
	};

	return (
		<ModalLayout {...props} name={name}>
			<ModalChangelogStyle>
				<span className="smol gray">
					{CHANGELOG_DATE.format('YYYY-MM-DD')}
				</span>
				<h2>Changelog</h2>
				{CHANGELOG.map((m, i) => (
					<p key={i} className="row">
						<h3>{m.title}</h3>
						<span>{m.text}</span>
						{m.images?.length ? (
							<div className="images">
								{' '}
								{m.images?.map((im, ii) => (
									<div
										key={`${i}.${ii}`}
										className="image"
										style={{
											backgroundImage: `url(/img/changelog/${im})`,
										}}
									/>
								))}
							</div>
						) : null}
					</p>
				))}
				<FormControlLabel
					className="checkbox"
					label="Don't show again until next update"
					control={
						<Checkbox
							classes={{ checked: 'checked' }}
							onChange={handleCheckbox}
						/>
					}
				/>
				<br />
				{!isTablet ? (
					<span className="smol">
						Click on the overlay to close
					</span>
				) : null}
			</ModalChangelogStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalChangelog {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}

	export interface IChangelogEntry {
		title: string;
		text: string;
		images?: string[];
	}
}

const ModalChangelogStyle = styled.div`
	max-width: 500px;
	text-align: center;
	.row {
		> h3 {
			color: var(--c-pink3);
		}
		> .images {
			margin-top: 10px;
			> .image {
				height: 200px;
				width: 100%;
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
				&:not(:last-child) {
					margin-bottom: 10px;
				}
			}
		}
	}
	> h2 {
		color: var(--c-pink1);
	}
	.gray,
	.grey {
		color: var(--c-p3);
	}
	.brand {
		color: var(--c-pink1);
	}
	.smol {
		font-size: 12px;
		color: var(--c-p3);
	}
	.checkbox {
		span {
			font-size: 14px;
			color: var(--c-p3);
		}
		.checked {
			path {
				color: var(--c-pink1);
			}
		}
		path {
			color: var(--c-p3);
		}
	}
`;
