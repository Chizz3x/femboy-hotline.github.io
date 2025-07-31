import React from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useMediaQuery } from '@mui/material';
import dayjs from '../../../utils/dayjs';
import { NModals } from '../modals';
import { ModalLayout } from '../layout';
import {
	localStorageRemove,
	localStorageSet,
} from '../../../utils/local-storage';
import {
	CSSMediaSize,
	VERSION,
} from '../../../const';

const CHANGELOG_DATE = dayjs('2025-07-15');
const CHANGELOG: NModalChangelog.IChangelogEntry[] =
	[
		{
			title: 'Forum',
			text: "Registered users can now visit our forum and start a conversation with other users. Users who don't have an account, can only view certain posts that are marked public by authors. If you wish to comment on posts or reply to comments, please register an account on this platform!",
			images: ['forum.png'],
		},
		{
			title: 'Accounts',
			text: 'From now on anyone can register on this website and view, participate in the activities related to this website.',
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
			localStorageSet('changelog-hide', VERSION);
		} else {
			localStorageRemove('changelog-hide');
		}
	};

	return (
		<ModalLayout
			{...props}
			showHeader
			name={name}
		>
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
	text-align: center;
	max-width: 1000px;
	.row {
		> h3 {
			color: ${({ theme }) =>
				theme?.palette?.primary?.dark};
		}
		> .images {
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			row-gap: 10px;
			> .image {
				height: 200px;
				width: 100%;
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
	}
	> h2 {
		color: ${({ theme }) =>
			theme?.palette?.primary?.main};
	}
	.gray,
	.grey {
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
