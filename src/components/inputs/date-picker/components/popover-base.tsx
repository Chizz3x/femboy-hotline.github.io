import {
	Popover,
	PopoverProps,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { Dayjs } from '../../../../utils/dayjs';
import { YearPicker } from './year-picker';
import { NDatePicker } from '../date-picker';
import classes from '../../../../utils/classes';
import { DayPicker } from './day-picker';

const tabsOptions: NPopoverBase.IPageOption[] = [
	{
		label: 'Year',
		value: 'year',
	},
	{
		label: 'Date',
		value: 'date',
	},
	{
		label: 'Time',
		value: 'time',
	},
];

const PopoverBase = (
	props: NPopoverBase.IProps,
) => {
	const {
		selectedDate,
		selectedRange,
		range,
		defaultTab,
		previewFormat,
		tabs,
		setDatePart,
		setDateParts,
		...rest
	} = props;

	const [page, setPage] =
		React.useState<NPopoverBase.TTabs>(
			tabs.includes(defaultTab)
				? defaultTab
				: tabs[0],
		);

	return (
		<PopoverBaseStyle {...rest}>
			<div className="selected-date-preview">
				{selectedDate?.format?.(previewFormat) ||
					previewFormat}
			</div>
			<div className="popover-tabs">
				{tabsOptions.map((tab) => {
					if (tabs.length < 2) return null;
					if (!tabs.includes(tab.value))
						return null;
					return (
						<div
							key={tab.value}
							className={classes(
								'popover-tab',
								tab.value === page
									? 'active'
									: '',
							)}
							onClick={() => {
								setPage(tab.value);
							}}
						>
							{tab.label}
						</div>
					);
				})}
			</div>
			{page === 'year' &&
			tabs.includes('year') ? (
				<YearPicker
					selectedDate={selectedDate}
					selectedRange={selectedRange}
					range={range}
					setDatePart={setDatePart}
					setDateParts={setDateParts}
				/>
			) : null}
			{page === 'date' &&
			tabs.includes('date') ? (
				<DayPicker
					selectedDate={selectedDate}
					selectedRange={selectedRange}
					range={range}
					setDatePart={setDatePart}
					setDateParts={setDateParts}
				/>
			) : null}
		</PopoverBaseStyle>
	);
};

export { PopoverBase };

export namespace NPopoverBase {
	export interface IProps extends PopoverProps {
		selectedDate: Dayjs | null;
		selectedRange: Dayjs[];
		range: boolean;
		defaultTab: TTabs;
		previewFormat: string;
		tabs: TTabs[];
		setDatePart: NDatePicker.TSetDatePart;
		setDateParts: NDatePicker.TSetDateParts;
	}
	export type TTabs = 'year' | 'date' | 'time';
	export interface IPageOption {
		label: string;
		value: TTabs;
	}
}

const PopoverBaseStyle = styled(Popover)`
	> .MuiPaper-root {
		width: 280px;
		height: 300px;
		padding: 6px 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.popover-tabs {
			display: flex;
			justify-content: space-evenly;
			column-gap: 10px;
			margin-bottom: 5px;
			.popover-tab {
				text-align: center;
				width: 100%;
				padding: 6px 12px;
				border-radius: 4px;
				background-color: ${({ theme }) =>
					theme?.palette?.background?.paper};
				cursor: pointer;
				&:hover {
					background-color: ${({ theme }) =>
						theme?.palette?.background?.default};
				}
				&.active {
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};
				}
			}
		}
		.selected-date-preview {
			text-align: center;
			font-size: 18px;
			font-weight: 500;
			padding: 6px 12px;
		}
	}
`;
