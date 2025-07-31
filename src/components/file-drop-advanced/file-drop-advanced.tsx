import React from 'react';
import styled from 'styled-components';
import {
	FileDrop,
	NFileDrop,
} from '../file-drop/file-drop';
import classes from '../../utils/classes';

const FileDropAdvanced = (
	props: NFileDropAdvanced.IProps,
) => {
	const {
		fileDropProps,
		preview,
		defaultPreviewImage,
		...rest
	} = props;

	const [previewImage, setPreviewImage] =
		React.useState<string | null>(
			defaultPreviewImage || null,
		);

	return (
		<FileDropAdvancedStyle
			{...rest}
			className={classes(
				'file-drop-advanced-container',
				rest.className,
			)}
		>
			<div
				className={classes(
					'upload-container',
					previewImage ? 'has-image' : '',
				)}
			>
				<FileDrop
					{...fileDropProps}
					props={{
						...fileDropProps.props,
						dropzoneProps: {
							...fileDropProps.props
								?.dropzoneProps,
							onChange: (files) => {
								fileDropProps.props?.dropzoneProps?.onChange?.(
									files,
								);
								if (files?.[0]) {
									setPreviewImage(
										URL.createObjectURL(
											files?.[0],
										),
									);
								}
							},
						},
					}}
				/>
				{preview && previewImage ? (
					<div
						className="preview-image"
						style={{
							backgroundImage: `url(${previewImage})`,
						}}
					/>
				) : null}
			</div>
		</FileDropAdvancedStyle>
	);
};

export { FileDropAdvanced };

export namespace NFileDropAdvanced {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends React.HTMLProps<HTMLDivElement> {
		fileDropProps: NFileDrop.IProps;
		preview?: boolean;
		defaultPreviewImage?: string;
	}
}

const FileDropAdvancedStyle = styled.div`
	.upload-container {
		position: relative;
		&.has-image {
			.file-drop-container {
				.file-drop-root {
					opacity: 0;
					&:hover {
						opacity: 0.5;
					}
				}
			}
		}
		.file-drop-container {
			position: relative;
			z-index: 1;
		}
		.preview-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-position: center;
			background-size: contain;
			background-repeat: no-repeat;
		}
	}
`;
