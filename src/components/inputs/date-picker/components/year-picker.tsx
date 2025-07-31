import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { Dayjs } from '../../../../utils/dayjs';
import { NDatePicker } from '../date-picker';
import classes from '../../../../utils/classes';

const currentYear = new Date().getFullYear();
const defaultYears = Array.from({
	length: 200,
}).map(
	(_, i, a) => currentYear - a.length / 2 + i + 1,
);
const defaultYearsGrouped = defaultYears.reduce(
	(acc, _, i) => {
		if (i % 3 === 0)
			acc.push(defaultYears.slice(i, i + 3));
		return acc;
	},
	[] as number[][],
);

const YearPicker = (
	props: NYearPicker.IProps,
) => {
	const {
		range,
		selectedDate,
		selectedRange,
		setDatePart,
		setDateParts,
		...rest
	} = props;

	const selectedYearRef =
		React.useRef<HTMLDivElement>(null);

	const [open, setOpen] =
		React.useState<NDatePicker.TRangePos | null>(
			'start',
		);

	const onExpand = (
		place: NDatePicker.TRangePos | null,
	) => {
		setOpen(place);
	};

	const onSelectYear = (value: number) => {
		setDatePart(value, 'year');
	};

	const onSelectStart = (value: number) => {
		setDatePart(value, 'year', 'start');
	};

	const onSelectEnd = (value: number) => {
		setDatePart(value, 'year', 'end');
	};

	React.useEffect(() => {
		if (selectedYearRef?.current) {
			selectedYearRef.current.scrollIntoView({
				block: 'center',
			});
		}
	}, []);

	return (
		<YearPickerStyle {...rest}>
			<Accordion
				className={classes(
					'year-select-accordion',
					'year-select-date',
					range ? 'year-select-start' : '',
				)}
				expanded={open === 'start'}
				onChange={() =>
					open === 'start' && range
						? onExpand(null)
						: onExpand('start')
				}
			>
				<AccordionSummary>
					<span>
						{range
							? `From - ${
									selectedRange?.[0]?.year() ||
									'None'
							  }`
							: `${
									selectedDate?.year() || 'None'
							  }`}
					</span>
				</AccordionSummary>
				<AccordionDetails>
					{defaultYearsGrouped.map((row, i) => (
						<div
							key={`year-row-${i}`}
							className="year-row"
						>
							{row.map((year, j) => (
								<div
									ref={
										selectedDate?.year() === year
											? selectedYearRef
											: null
									}
									key={`year-row-inner-${j}`}
									className={classes(
										'year-row-inner',
										range
											? selectedRange?.[0]?.year() ===
													year
											: selectedDate?.year() ===
											  year
											? 'active'
											: '',
									)}
									onClick={() =>
										range
											? onSelectStart(year)
											: onSelectYear(year)
									}
								>
									{year}
								</div>
							))}
						</div>
					))}
				</AccordionDetails>
			</Accordion>
			{range ? (
				<Accordion
					className={classes(
						'year-select-accordion',
						'year-select-end',
					)}
					expanded={open === 'end'}
					onChange={() =>
						open === 'end' && range
							? onExpand(null)
							: onExpand('end')
					}
				>
					<AccordionSummary>
						<span>
							To -{' '}
							{selectedRange?.[1]?.year() ||
								'None'}
						</span>
					</AccordionSummary>
					<AccordionDetails>
						{defaultYearsGrouped.map((row, i) => (
							<div
								key={`year-row-${i}`}
								className="year-row"
							>
								{row.map((year, j) => {
									const active =
										selectedRange?.[1]?.year() ===
										year;
									return (
										<div
											key={`year-row-inner-${j}`}
											className={classes(
												'year-row-inner',
												active ? 'active' : '',
											)}
											onClick={() =>
												active
													? null
													: onSelectEnd(year)
											}
										>
											{year}
										</div>
									);
								})}
							</div>
						))}
					</AccordionDetails>
				</Accordion>
			) : null}
		</YearPickerStyle>
	);
};

export { YearPicker };

export namespace NYearPicker {
	export interface IProps
		extends React.HTMLAttributes<HTMLDivElement> {
		range: boolean;
		selectedDate: Dayjs | null;
		selectedRange: Dayjs[];
		setDatePart: NDatePicker.TSetDatePart;
		setDateParts: NDatePicker.TSetDateParts;
	}
}

const YearPickerStyle = styled.div`
	overflow-y: auto;
	.year-select-accordion {
		.MuiAccordionSummary-root {
			position: sticky;
			background-color: ${({ theme }) =>
				theme?.palette?.background?.paper};
			top: 0;
			border-radius: 4px;
		}
		.year-row {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			.year-row-inner {
				padding: 3px 6px;
				text-align: center;
				font-size: 24px;
				cursor: pointer;
				&.active {
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};
					background-color: ${({ theme }) =>
						theme?.palette?.primary
							?.main}30 !important;
				}
				&:hover {
					background-color: ${({ theme }) =>
						theme?.palette?.background?.paper};
				}
			}
		}
	}
`;
