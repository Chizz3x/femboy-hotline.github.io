import { CustomEditor } from '../types/overrides/slate';

export default (editor?: CustomEditor | null) => {
	if (editor) {
		editor.delete({
			at: {
				anchor: editor.start([]),
				focus: editor.end([]),
			},
			voids: true,
			hanging: true,
		});
		editor.setNodes({
			type: 'paragraph',
		});
	}
};
