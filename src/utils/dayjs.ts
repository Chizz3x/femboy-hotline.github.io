import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import duration from 'dayjs/plugin/duration';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(duration);

type Dayjs = ReturnType<typeof dayjs>;

export default dayjs;
export type { Dayjs };
