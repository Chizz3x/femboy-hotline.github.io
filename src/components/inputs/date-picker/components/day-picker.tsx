import styled from 'styled-components';
import React from 'react';
import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
	IconButton,
	NativeSelect,
} from '@mui/material';
import dayjs, {
	Dayjs,
} from '../../../../utils/dayjs';
import { NDatePicker } from '../date-picker';
import classes from '../../../../utils/classes';

const placeholderMatrix = Array.from({
	length: 42,
});

const monthOptions: NDayPicker.IMonthOption[] = [
	{
		label: 'January',
		value: 1,
	},
	{
		label: 'February',
		value: 2,
	},
	{
		label: 'March',
		value: 3,
	},
	{
		label: 'April',
		value: 4,
	},
	{
		label: 'May',
		value: 5,
	},
	{
		label: 'June',
		value: 6,
	},
	{
		label: 'July',
		value: 7,
	},
	{
		label: 'August',
		value: 8,
	},
	{
		label: 'September',
		value: 9,
	},
	{
		label: 'October',
		value: 10,
	},
	{
		label: 'November',
		value: 11,
	},
	{
		label: 'December',
		value: 12,
	},
];

const DayPicker = (props: NDayPicker.IProps) => {
	const {
		range,
		selectedDate,
		selectedRange,
		setDatePart,
		setDateParts,
		...rest
	} = props;

	const [displayMonth, setDisplayMonth] =
		React.useState<Dayjs>(
			dayjs().startOf('year'),
		);

	const [dateMatrix, setDateMatrix] =
		React.useState<number[][]>([]);

	const onMonthSelect: React.ChangeEventHandler<
		HTMLSelectElement
	> = (e) => {
		const value = Number(e.target?.value);
		if (Number.isNaN(value)) return;
		setDisplayMonth((cv) =>
			cv.set('month', value - 1),
		);
	};

	const onDaySelect = (
		year: number,
		month: number,
		day: number,
	) => {
		const arr: Parameters<NDatePicker.TSetDateParts>[0] =
			[
				{
					value: month,
					part: 'month',
				},
				{
					value: day,
					part: 'date',
				},
			];
		if (selectedDate?.year() !== year)
			arr.push({
				value: year,
				part: 'year',
			});
		setDateParts(arr);
	};

	const nextMonth = () => {
		setDisplayMonth((cv) =>
			cv.add(1, 'month').startOf('month'),
		);
	};

	const previousMonth = () => {
		setDisplayMonth((cv) =>
			cv.subtract(1, 'month').startOf('month'),
		);
	};

	React.useEffect(() => {
		if (!range) {
			const daysInMonth =
				displayMonth.daysInMonth();
			const lastDayBefore = displayMonth.subtract(
				1,
				'day',
			);
			const lastMonthDays =
				lastDayBefore.daysInMonth();
			const firstDayAfter = displayMonth.add(
				1,
				'month',
			);
			const firstDay =
				displayMonth.isoWeekday() - 1;

			const newMatrix = placeholderMatrix.map(
				(_, i) => {
					if (i < firstDay) {
						return [
							lastDayBefore.month(),
							lastMonthDays - firstDay + i + 1,
						];
					}
					if (i >= firstDay + daysInMonth) {
						return [
							firstDayAfter.month(),
							i - (firstDay + daysInMonth) + 1,
						];
					}
					return [
						displayMonth.month(),
						i - firstDay + 1,
					];
				},
			);

			setDateMatrix(newMatrix);
		}
	}, [displayMonth]);

	React.useEffect(() => {
		if (!range) {
			setDisplayMonth(
				selectedDate?.startOf('month') ||
					dayjs().startOf('year'),
			);
		}
	}, [selectedDate]);

	React.useEffect(() => {
		if (range) {
			//
		}
	}, [selectedRange]);

	return (
		<DayPickerStyle {...rest}>
			<div className="calendar">
				<div className="calendar-controls">
					<div className="calendar-controls-left">
						<IconButton
							size="small"
							onClick={previousMonth}
						>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<div className="calendar-controls-middle">
						<div className="calendar-year-display">
							{displayMonth.year()}
						</div>
						<NativeSelect
							inputProps={{
								id: 'month-select',
							}}
							value={displayMonth.month() + 1}
							onChange={onMonthSelect}
						>
							{monthOptions.map((m) => {
								return (
									<option
										key={m.value}
										value={m.value}
									>
										{m.label}
									</option>
								);
							})}
						</NativeSelect>
					</div>
					<div className="calendar-controls-right">
						<IconButton
							size="small"
							onClick={nextMonth}
						>
							<ChevronRightIcon />
						</IconButton>
					</div>
				</div>
				<div className="calendar-days">
					<div className="calendar-weekday">
						<span>Mon</span>
					</div>
					<div className="calendar-weekday">
						<span>Tue</span>
					</div>
					<div className="calendar-weekday">
						<span>Wed</span>
					</div>
					<div className="calendar-weekday">
						<span>Thu</span>
					</div>
					<div className="calendar-weekday">
						<span>Fri</span>
					</div>
					<div className="calendar-weekday">
						<span>Sat</span>
					</div>
					<div className="calendar-weekday">
						<span>Sun</span>
					</div>
					{dateMatrix.map((row, i) => {
						const isOutsideBounds =
							row[0] !== displayMonth.month();
						const selected =
							selectedDate?.year() ===
								displayMonth.year() &&
							selectedDate?.month() === row[0] &&
							selectedDate?.date() === row[1];
						return (
							<div
								key={i}
								className={classes(
									'calendar-day',
									isOutsideBounds
										? 'outside-bounds'
										: '',
									selected ? 'selected' : '',
								)}
								onClick={() =>
									isOutsideBounds || selected
										? null
										: onDaySelect(
												displayMonth.year(),
												row[0],
												row[1],
										  )
								}
							>
								<span>{row[1]}</span>
							</div>
						);
					})}
				</div>
			</div>
		</DayPickerStyle>
	);
};

export { DayPicker };

export namespace NDayPicker {
	export interface IProps
		extends React.HTMLAttributes<HTMLDivElement> {
		range: boolean;
		selectedDate: Dayjs | null;
		selectedRange: Dayjs[];
		setDatePart: NDatePicker.TSetDatePart;
		setDateParts: NDatePicker.TSetDateParts;
	}

	export interface IMonthOption {
		label: string;
		value: number;
	}
}

const DayPickerStyle = styled.div`
	overflow-y: auto;
	.calendar {
		.calendar-days {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			.calendar-weekday {
				text-align: center;
				padding: 3px 6px;
			}
			.calendar-day {
				text-align: center;
				padding: 3px 6px;
				cursor: pointer;
				&:hover:not(.outside-bounds, .selected) {
					background-color: ${({ theme }) =>
						theme?.palette?.background_2
							?.default};
				}
				&.selected {
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};
					background-color: ${({ theme }) =>
						theme?.palette?.primary?.main}30;
					&.outside-bounds {
						color: ${({ theme }) =>
							theme?.palette?.primary?.dark};
						background-color: color-mix(
							in srgb,
							${({ theme }) =>
									theme?.palette?.primary?.dark}
								30%,
							transparent
						);
					}
				}
				&.outside-bounds {
					cursor: default;
					color: ${({ theme }) =>
						theme?.palette?.text?.secondary};
				}
			}
		}
		.calendar-controls {
			display: flex;
			justify-content: space-between;
			.calendar-controls-left {
				//
			}
			.calendar-controls-middle {
				display: flex;
				align-items: center;
				column-gap: 10px;
			}
			.calendar-controls-right {
				//
			}
		}
	}
`;
