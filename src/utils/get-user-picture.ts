import { CLOUDINARY_API_ROUTES } from '../routes';
import buildApiRoute from './build-api-route';

export default (user: any) => {
	return user?.picture_custom
		? buildApiRoute(
				CLOUDINARY_API_ROUTES.getUpload,
				{
					folder: 'pictures',
					name: `${user?._id}_${user?.picture_custom}`,
				},
		  )
		: `/img/pictures/${user?.picture || '1.png'}`;
};
