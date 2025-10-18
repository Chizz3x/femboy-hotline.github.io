import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useSearchParams } from 'react-router-dom';
import {
	Autocomplete,
	TextField,
} from '@mui/material';
import { CSSMediaSize } from '../../const';
import { API_ROUTES } from '../../routes';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import NotifCard from './components/notif-card';
import { useSelector } from '../../store/store';
import { Paginator } from '../../components/paginator';
import { NOTIF_CATEGORIES_OPTIONS } from '../../utils/notif-types';

const perPage = 10;

const Notifs = () => {
	const [searchParams, setSearchParams] =
		useSearchParams();
	const currentPage = Number(
		searchParams.get('page') || 1,
	);

	const [filters, setFilters] = React.useState({
		category: '',
	});

	const [notifsCache, setNotifsCache] =
		React.useState<any[]>([]);

	const { notifs: liveNotifs, total } =
		useSelector((st) => st.notifications);

	const [, getNotifs] = useAxios(
		{
			method: 'GET',
			url: API_ROUTES.getNotifs,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
		},
		{ autoCancel: true, manual: true },
	);

	const onPageChange = (page: number) => {
		if (page === 1) searchParams.delete('page');
		else
			searchParams.set('page', page.toString());
		setSearchParams(searchParams);
	};

	const getPageData = () => {
		if (currentPage === 1) {
			setNotifsCache(liveNotifs);
		} else {
			getNotifs({
				params: {
					offset: (currentPage - 1) * 10,
					limit: 10,
				},
			}).then((res) => {
				setNotifsCache(
					res.data?.data?.notifs || [],
				);
			});
		}
	};

	React.useEffect(() => {
		getPageData();
	}, [liveNotifs, currentPage]);

	return (
		<NotifsStyle>
			<div className="notifs-header">
				<Autocomplete<
					(typeof NOTIF_CATEGORIES_OPTIONS)[number]
				>
					disablePortal
					options={NOTIF_CATEGORIES_OPTIONS}
					size="small"
					value={NOTIF_CATEGORIES_OPTIONS.find(
						(f) => f.value === filters.category,
					)}
					onChange={(_, value) =>
						setFilters((st) => ({
							...st,
							category: value?.value || '',
						}))
					}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Category"
						/>
					)}
				/>
				{/* TODO: also add unread checkbox */}
			</div>
			{!total ? (
				<span className="no-notifs">
					No notifications
				</span>
			) : null}
			<div className="notifs-container">
				{notifsCache?.map((notif: any) => (
					<NotifCard
						key={notif._id}
						notif={notif}
					/>
				))}
				<Paginator
					props={{ total, perPage }}
					paginationProps={{
						page: currentPage,
						onChange: (_, page) =>
							onPageChange(page),
					}}
				/>
			</div>
		</NotifsStyle>
	);
};

export default Notifs;

export namespace NNotifs {
	//
}

const NotifsStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	flex-direction: column;
	display: flex;
	padding: 20px 50px;

	.no-notifs {
		text-align: center;
	}

	.notifs-header {
		margin-bottom: 24px;
		display: flex;
		> * {
			min-width: 200px;
		}
	}

	.notifs-container {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

	.paginator {
		width: fit-content;
		align-self: center;
	}

	${CSSMediaSize.phone_big} {
		padding: 20px 10px;
	}
`;
