import {
	Pagination,
	PaginationProps,
} from '@mui/material';
import React, {
	ComponentPropsWithRef,
} from 'react';
import styled from 'styled-components';
import classes from '../../utils/classes';

const Paginator = (props: NPaginator.IProps) => {
	const {
		props: innerProps,
		paginationProps,
		...rest
	} = props;
	const {
		total,
		perPage,
		autoHide = true,
	} = innerProps;

	const pageCount = Math.ceil(total / perPage);

	if (autoHide && pageCount < 2) return null;

	return (
		<PaginatorStyle
			{...rest}
			className={classes(
				'paginator',
				rest.className,
			)}
		>
			<Pagination
				{...paginationProps}
				count={pageCount || 0}
				siblingCount={0}
				boundaryCount={1}
			/>
		</PaginatorStyle>
	);
};

export { Paginator };

export namespace NPaginator {
	export interface IProps
		extends ComponentPropsWithRef<'div'> {
		props: {
			total: number;
			perPage: number;
			autoHide?: boolean;
		};
		paginationProps?: PaginationProps;
	}
}

const PaginatorStyle = styled.div``;
