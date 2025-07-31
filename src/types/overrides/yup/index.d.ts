declare module 'yup' {
	interface MixedSchema<
		TType = any,
		TContext = any,
		TOut = TType,
		TIn = TType,
	> {
		dayjs(
			message?: string,
		): MixedSchema<TType, TContext, TOut, TIn>;
		minDayjs(
			minDate: Dayjs,
			message?: string,
		): MixedSchema<TType, TContext, TOut, TIn>;
		maxDayjs(
			maxDate: Dayjs,
			message?: string,
		): MixedSchema<TType, TContext, TOut, TIn>;
	}
}

export {};
