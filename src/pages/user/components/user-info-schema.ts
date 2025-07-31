import * as yup from 'yup';
import dayjs from '../../../utils/dayjs';
import { NUserInfo } from './user-info';

export default () => {
	return yup.object<NUserInfo.IForm>({
		gender: yup
			.string()
			.transform((curr, orig) =>
				!orig ? null : curr,
			)
			.nullable()
			.min(2)
			.max(12)
			.label('Gender'),
		nationality: yup
			.string()
			.transform((curr, orig) =>
				!orig ? null : curr,
			)
			.nullable()
			.length(2)
			.label('Nationality'),
		birthDate: yup
			.mixed()
			.transform((curr, orig) =>
				!orig ? null : curr,
			)
			.nullable()
			.dayjs()
			.minDayjs(dayjs().subtract(200, 'years'))
			.maxDayjs(dayjs().subtract(18, 'year'))
			.label('Birth date'),
	});
};
