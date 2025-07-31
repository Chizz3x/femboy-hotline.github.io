import dayjs from 'dayjs';
import * as yup from 'yup';
import { Dayjs } from './utils/dayjs';

yup.addMethod(
	yup.mixed,
	'dayjs',
	function yupDayjs() {
		return this.test({
			name: 'dayjs',
			message: ({ path, message }) =>
				message || `${path} must be a valid date`,
			test: (value) => {
				if (
					(this?.spec?.nullable &&
						value === null) ||
					(value === undefined &&
						this?.spec?.optional)
				) {
					return true;
				}
				return (
					dayjs.isDayjs(value) && value.isValid()
				);
			},
		});
	},
);

yup.addMethod(
	yup.mixed,
	'minDayjs',
	function yupMinDayjs(
		minDate: Dayjs,
		message?: string,
	) {
		return this.test({
			name: 'minDayjs',
			message({ path }) {
				return (
					message ||
					`${path} must be on or after ${minDate.format(
						'YYYY-MM-DD HH:mm:ss',
					)}`
				);
			},
			test: (value) => {
				if (!value) return true;
				const date = dayjs(value as any);
				return (
					date.isValid() &&
					(date.isSame(minDate) ||
						date.isAfter(minDate))
				);
			},
		});
	},
);

yup.addMethod(
	yup.mixed,
	'maxDayjs',
	function yupMaxDayjs(
		maxDate: Dayjs,
		message?: string,
	) {
		return this.test({
			name: 'maxDayjs',
			message({ path }) {
				return (
					message ||
					`${path} must be on or before ${maxDate.format(
						'YYYY-MM-DD HH:mm:ss',
					)}`
				);
			},
			test: (value) => {
				if (!value) return true;
				const date = dayjs(value as any);
				return (
					date.isValid() &&
					(date.isSame(maxDate) ||
						date.isBefore(maxDate))
				);
			},
		});
	},
);
