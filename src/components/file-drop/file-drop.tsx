import { omit } from 'lodash';
import {
	DropzoneArea,
	DropzoneAreaBaseProps,
	DropzoneAreaProps,
} from 'mui-file-dropzone';
import styled from 'styled-components';
import React from 'react';
import classes from '../../utils/classes';

const FileDrop = (props: NFileDrop.IProps) => {
	const { props: innerProps } = props;
	const { dropzoneProps } = innerProps;

	return (
		<FileDropStyle
			{...omit(props, 'props')}
			className={classes(
				'file-drop-container',
				props.className,
			)}
		>
			<DropzoneArea
				showPreviewsInDropzone={false}
				showAlerts={false}
				{...dropzoneProps}
				classes={{
					root: classes(
						'file-drop-root',
						dropzoneProps?.classes?.root,
					),
					active: classes(
						'file-drop-root-active',
						dropzoneProps?.classes?.active,
					),
					invalid: classes(
						'file-drop-root-invalid',
						dropzoneProps?.classes?.invalid,
					),
					textContainer: classes(
						'file-drop-text-container',
						dropzoneProps?.classes?.textContainer,
					),
					text: classes(
						'file-drop-text',
						dropzoneProps?.classes?.text,
					),
					icon: classes(
						'file-drop-icon',
						dropzoneProps?.classes?.icon,
					),
				}}
			/>
		</FileDropStyle>
	);
};

export { FileDrop };

export namespace NFileDrop {
	export interface IProps
		extends React.HTMLAttributes<HTMLDivElement> {
		props: {
			dropzoneProps: DropzoneAreaBaseProps &
				DropzoneAreaProps;
		};
	}
}

const FileDropStyle = styled.div`
	.file-drop-root {
		//
	}
`;
