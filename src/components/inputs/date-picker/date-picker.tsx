/* eslint-disable camelcase */
import {
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import {
	Clear as ClearIcon,
	EditCalendar as EditCalendarIcon,
} from '@mui/icons-material';
import dayjs, {
	Dayjs,
} from '../../../utils/dayjs';
import { CustomInput } from './components/custom-input';
import {
	NPopoverBase,
	PopoverBase,
} from './components/popover-base';

const DatePicker = (
	props: NDatePicker.IProps,
) => {
	const {
		fieldProps,
		range = false,
		defaultDate,
		defaultRange,
		defaultTab = 'year',
		previewFormat = 'YYYY-MM-DD | HH:mm:ss',
		displayFormat = 'YYYY-MM-DD | HH:mm:ss',
		tabs = ['year', 'date', 'time'],
		onChange,
		onChangeRange,
		value,
		valueRange,
		clearable,
		controlled,
		...rest
	} = props;

	const [popoverAnchorEl, setPopoverAnchorEl] =
		React.useState<HTMLElement | null>(null);

	const [selectedDate, setSelectedDate] =
		React.useState<Dayjs | null>(
			defaultDate || null,
		);
	const [selectedRange, setSelectedRange] =
		React.useState<Dayjs[]>(defaultRange || []);

	const isControlled =
		controlled ||
		!!(
			(value || valueRange) &&
			onChange &&
			onChangeRange
		);

	const openPopover = (
		e: React.MouseEvent<HTMLDivElement>,
	) => {
		setPopoverAnchorEl(e.currentTarget);
	};

	const closePopover = () => {
		setPopoverAnchorEl(null);
	};

	const clearValues: React.MouseEventHandler<
		HTMLButtonElement
	> = (e) => {
		e.stopPropagation();

		setSelectedDate(null);
		setSelectedRange([]);
	};

	const setDatePart: NDatePicker.TSetDatePart = (
		v,
		part,
		pos,
	) => {
		if (range) {
			setSelectedRange((cv) => {
				const newRange = [
					pos === 'start'
						? (cv[0] || dayjs()).set(part, v)
						: cv[0] || dayjs(),
					pos === 'end'
						? (cv[1] || dayjs()).set(part, v)
						: cv[1] || dayjs(),
				];
				return newRange;
			});
		} else {
			setSelectedDate((cv) => {
				const newDate = (cv || dayjs())?.set(
					part,
					v,
				);
				return newDate;
			});
		}
	};

	const setDateParts: NDatePicker.TSetDateParts =
		(arr) => {
			if (range) {
				setSelectedRange((cv) => {
					const newRange = arr.reduce(
						(prev, curr) => {
							const {
								value: v,
								part,
								pos,
							} = curr;
							return [
								pos === 'start'
									? (prev[0] || dayjs()).set(
											part,
											v,
									  )
									: prev[0] || dayjs(),
								pos === 'end'
									? (prev[1] || dayjs()).set(
											part,
											v,
									  )
									: prev[1] || dayjs(),
							];
						},
						cv,
					);
					return newRange;
				});
			} else {
				setSelectedDate((cv) => {
					const newDate = arr.reduce(
						(prev, curr) => {
							const { value: v, part } = curr;
							return (prev || dayjs()).set(
								part,
								v,
							);
						},
						cv,
					);
					return newDate;
				});
			}
		};

	React.useEffect(() => {
		if (range) {
			setSelectedDate(null);
			if (defaultRange) {
				setSelectedRange(defaultRange);
			}
		} else {
			setSelectedRange([]);
			if (defaultDate) {
				setSelectedDate(defaultDate);
			}
		}
	}, [range]);

	React.useEffect(() => {
		// console.log('isControlled', isControlled);
		if (isControlled) {
			if (range) {
				setSelectedRange(valueRange || []);
				// onChangeRange?.(valueRange || []);
			} else {
				setSelectedDate(value || null);
				// onChange?.(value || null);
			}
		} else if (range) {
			setSelectedRange(valueRange || []);
		} else {
			setSelectedDate(value || null);
		}
	}, [value, valueRange]);

	React.useEffect(() => {
		// if (isControlled) {
		if (range) {
			onChangeRange?.(selectedRange || []);
		} else {
			onChange?.(selectedDate || null);
		}
		// }
	}, [selectedDate, selectedRange]);

	return (
		<DatePickerStyle {...rest}>
			<TextField
				{...fieldProps}
				onClick={openPopover}
				value={
					!range ? selectedDate : selectedRange
				}
				InputProps={{
					inputComponent: CustomInput,
					endAdornment: (
						<InputAdornment position="end">
							{clearable &&
							(range
								? selectedRange[0] ||
								  selectedRange[1]
								: selectedDate) ? (
								<IconButton
									size="small"
									onClick={clearValues}
								>
									<ClearIcon fontSize="small" />
								</IconButton>
							) : null}
							<IconButton size="small">
								<EditCalendarIcon fontSize="small" />
							</IconButton>
						</InputAdornment>
					),
					inputProps: {
						displayFormat,
					},
				}}
				InputLabelProps={{
					shrink:
						!!selectedDate ||
						!!selectedRange?.[0] ||
						!!selectedRange?.[1],
				}}
			/>
			<PopoverBase
				open={!!popoverAnchorEl}
				anchorEl={popoverAnchorEl}
				onClose={closePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				selectedDate={selectedDate}
				selectedRange={selectedRange}
				range={range}
				setDatePart={setDatePart}
				setDateParts={setDateParts}
				defaultTab={defaultTab}
				previewFormat={previewFormat}
				tabs={tabs}
			/>
		</DatePickerStyle>
	);
};

export { DatePicker };

export namespace NDatePicker {
	export interface IProps
		extends Omit<
			React.HTMLAttributes<HTMLDivElement>,
			'onChange'
		> {
		fieldProps?: TextFieldProps;
		range?: boolean;
		defaultDate?: Dayjs;
		defaultRange?: Dayjs[];
		defaultTab?: NPopoverBase.TTabs;
		tabs?: NPopoverBase.TTabs[];
		previewFormat?: string;
		displayFormat?: string;
		onChange?: (date: Dayjs | null) => any;
		onChangeRange?: (range: Dayjs[]) => any;
		value?: Dayjs | null;
		valueRange?: Dayjs[];
		clearable?: boolean;
		controlled?: boolean;
	}
	export type TRangePos = 'start' | 'end';
	export type TSetDatePart = (
		value: number,
		part: dayjs.UnitType,
		pos?: NDatePicker.TRangePos,
	) => any;
	export type TSetDateParts = (
		arr: {
			value: number;
			part: dayjs.UnitType;
			pos?: NDatePicker.TRangePos;
		}[],
	) => any;
}

const DatePickerStyle = styled.div`
	> .MuiTextField-root {
		width: 100%;
	}
`;
