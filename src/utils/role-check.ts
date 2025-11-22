import { USER_ROLE } from '../const';

export default (
	minRole: number,
	userRole: number = USER_ROLE.USER,
) => {
	return userRole <= minRole;
};
