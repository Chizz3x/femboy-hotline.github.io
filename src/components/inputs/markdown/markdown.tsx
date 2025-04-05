import React from 'react';
import {
	createEditor,
	Editor,
	Descendant,
	Text,
	Range,
	Element as SlateElement,
	Transforms,
	Point,
	Node as SlateNode,
} from 'slate';
import { withHistory } from 'slate-history';
import {
	Editable,
	RenderLeafProps,
	Slate,
	withReact,
	ReactEditor,
	RenderElementProps,
	DefaultPlaceholder,
} from 'slate-react';
import styled from 'styled-components';
import Prism, { Grammar, Token } from 'prismjs';
import 'prismjs/components/prism-markdown';
import { BulletedListElement } from '../../../types/overrides/slate';
import omit from '../../../utils/omit';
import classes from '../../../utils/classes';
import slateCreateInline from '../../../utils/slate-create-inline';

const SHORTCUTS: Record<string, string> = {
	'*': 'list-item',
	'-': 'list-item',
	'+': 'list-item',
	'>': 'block-quote',
	'#': 'heading-one',
	'##': 'heading-two',
	'###': 'heading-three',
	'####': 'heading-four',
	'#####': 'heading-five',
	'######': 'heading-six',
};

const defaultValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [
			{
				text: '',
			},
		],
	},
];

const md = Prism.languages.markdown as any;

const customGrammar: Grammar = {
	...omit(md, [
		'title',
		'blockquote',
		'cdata',
		'comment',
		'doctype',
		'entity',
		'front-matter-block',
		'prolog',
		'script',
		'style',
		'table',
		'tag',
		'url-reference',
	]),
	// underline: {
	//  pattern: /__(.*?)__/g,
	// },
	strike: {
		pattern: slateCreateInline(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			/(~~)(?:(?!~)<inner>)+\2/.source,
		),
		lookbehind: true,
		greedy: true,
		inside: {
			content: {
				pattern: /(^~~?)[\s\S]+(?=\1$)/,
				lookbehind: true,
				inside: {}, // see below
			},
			punctuation: /~~?/,
		},
	},
	// bold: {
	//  ...md.bold,
	//  pattern:
	//    /((?:^|[^\\])(?:\\{2})*)(?:\*\*(?:(?!\*)(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))|\*(?:(?!\*)(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n])))+\*)+\*\*|__(?:(?!_)(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n])))+__)/g,
	// },
};

const withShortcuts = (editor: Editor) => {
	const { deleteBackward, insertText } = editor;

	editor.insertText = (text) => {
		const { selection } = editor;

		if (
			text.endsWith(' ') &&
			selection &&
			Range.isCollapsed(selection)
		) {
			const { anchor } = selection;
			const block = Editor.above(editor, {
				match: (n) =>
					SlateElement.isElement(n) &&
					Editor.isBlock(editor, n),
			});
			const path = block ? block[1] : [];
			const start = Editor.start(editor, path);
			const range = { anchor, focus: start };
			const beforeText =
				Editor.string(editor, range) +
				text.slice(0, -1);
			const type = SHORTCUTS[beforeText];

			if (type) {
				Transforms.select(editor, range);

				if (!Range.isCollapsed(range)) {
					Transforms.delete(editor);
				}

				const newProperties: Partial<SlateElement> =
					{
						type: type as any,
					};
				Transforms.setNodes<SlateElement>(
					editor,
					newProperties,
					{
						match: (n) =>
							SlateElement.isElement(n) &&
							Editor.isBlock(editor, n),
					},
				);

				if (type === 'list-item') {
					const list: BulletedListElement = {
						type: 'bulleted-list',
						children: [],
					};
					Transforms.wrapNodes(editor, list, {
						match: (n) =>
							!Editor.isEditor(n) &&
							SlateElement.isElement(n) &&
							n.type === 'list-item',
					});
				}

				return;
			}
		}

		insertText(text);
	};

	editor.deleteBackward = (...args) => {
		const { selection } = editor;

		if (
			selection &&
			Range.isCollapsed(selection)
		) {
			const match = Editor.above(editor, {
				match: (n) =>
					SlateElement.isElement(n) &&
					Editor.isBlock(editor, n),
			});

			if (match) {
				const [block, path] = match;
				const start = Editor.start(editor, path);

				if (
					!Editor.isEditor(block) &&
					SlateElement.isElement(block) &&
					block.type !== 'paragraph' &&
					Point.equals(selection.anchor, start)
				) {
					const newProperties: Partial<SlateElement> =
						{
							type: 'paragraph',
						};
					Transforms.setNodes(
						editor,
						newProperties,
					);

					if (block.type === 'list-item') {
						Transforms.unwrapNodes(editor, {
							match: (n) =>
								!Editor.isEditor(n) &&
								SlateElement.isElement(n) &&
								n.type === 'bulleted-list',
							split: true,
						});
					}

					return;
				}
			}

			deleteBackward(...args);
		}
	};

	return editor;
};

export const InputMarkdown = (
	props: NInputMarkdown.IProps,
) => {
	const { props: innerProps } = props;

	const {
		slateProps,
		editableProps,
		editable = false,
		getEditor,
		submitOnEnter,
		onSubmit,
	} = innerProps;

	const [value, setValue] = React.useState<
		Descendant[]
	>(slateProps?.initialValue || defaultValue);

	const renderElement = React.useCallback(
		(renderElementProps: any) => (
			<CustomElement {...renderElementProps} />
		),
		[],
	);
	const [editor] = React.useState(() =>
		withShortcuts(
			withHistory(withReact(createEditor())),
		),
	);

	const handleDOMBeforeInput = React.useCallback(
		(e: InputEvent) => {
			queueMicrotask(() => {
				const pendingDiffs =
					ReactEditor.androidPendingDiffs(editor);

				const scheduleFlush = pendingDiffs?.some(
					({ diff, path }) => {
						if (!diff.text.endsWith(' ')) {
							return false;
						}

						const { text } = SlateNode.leaf(
							editor,
							path,
						);
						const beforeText =
							text.slice(0, diff.start) +
							diff.text.slice(0, -1);
						if (!(beforeText in SHORTCUTS)) {
							return false;
						}

						const blockEntry = Editor.above(
							editor,
							{
								at: path,
								match: (n) =>
									SlateElement.isElement(n) &&
									Editor.isBlock(editor, n),
							},
						);
						if (!blockEntry) {
							return false;
						}

						const [, blockPath] = blockEntry;
						return Editor.isStart(
							editor,
							Editor.start(editor, path),
							blockPath,
						);
					},
				);

				if (scheduleFlush) {
					ReactEditor.androidScheduleFlush(
						editor,
					);
				}
			});
		},
		[editor],
	);

	const decorate = React.useCallback(
		([node, path]: [any, any]) => {
			const ranges: Range[] = [];

			if (!Text.isText(node)) {
				return ranges;
			}

			const getRanges = (
				token: string | Token,
				tempRanges: Range[] = [],
				types: string[] = [],
				start = 0,
			): any[] => {
				const newRanges: Range[] = [
					...tempRanges,
				];
				let newStart = Number(start);

				if (typeof token === 'string') {
					newRanges.push({
						type: 'text',
						...types.reduce(
							(prev, curr) => ({
								...prev,
								[curr]: true,
							}),
							{},
						),
						anchor: { path, offset: newStart },
						focus: {
							path,
							offset: newStart + token.length,
						},
					});
					newStart += token.length;
					return newRanges;
				}

				const newTypes = [...types, token.type];

				if (typeof token.content === 'string') {
					newRanges.push({
						...(token.type === 'punctuation'
							? { type: token.type }
							: newTypes.reduce(
									(prev, curr) => ({
										...prev,
										[curr]: true,
									}),
									{},
							  )),
						anchor: { path, offset: newStart },
						focus: {
							path,
							offset: newStart + token.length,
						},
					});
					newStart += token.length;
					return newRanges;
				}

				return Object.values(token.content)
					.map((m: string | Token) => {
						const recursiveRanges = getRanges(
							m,
							newRanges,
							newTypes,
							newStart,
						);
						newStart += m.length;
						return recursiveRanges;
					})
					.flat();
			};

			const tokens = Prism.tokenize(
				node.text,
				customGrammar,
			);

			let start = 0;

			for (const token of tokens) {
				const tokenRanges = getRanges(
					token,
					[],
					[],
					start,
				);

				start =
					tokenRanges[tokenRanges.length - 1]
						?.focus?.offset || 0;

				if (typeof token !== 'string') {
					ranges.push(...tokenRanges);
				}
			}

			return ranges;
		},
		[],
	);

	React.useEffect(() => {
		if (getEditor) {
			getEditor(editor);
		}
	}, [getEditor]);

	return (
		<InputMarkdownStyle className="input-markdown">
			<Slate
				initialValue={
					slateProps?.initialValue || defaultValue
				}
				{...slateProps}
				editor={editor}
				onValueChange={(newValue) => {
					setValue(newValue);
					slateProps?.onValueChange?.(newValue);
				}}
			>
				<Editable
					readOnly={!editable}
					renderPlaceholder={(
						placeholderProps,
					) => {
						return (
							<div
								{...placeholderProps.attributes}
								className={classes(
									'slate-placeholder',
								)}
							>
								{placeholderProps.children}
							</div>
						);
					}}
					placeholder="text"
					onDOMBeforeInput={handleDOMBeforeInput}
					renderElement={renderElement}
					{...editableProps}
					className={classes(
						'editable-root',
						editable ? 'is-editable' : '',
						editableProps?.className,
					)}
					decorate={decorate}
					renderLeaf={Leaf}
					onSubmit={(event) => {
						onSubmit?.(value);
						editableProps?.onSubmit?.(event);
					}}
					{...(submitOnEnter
						? {
								onKeyDown: (event) => {
									if (
										!event.shiftKey &&
										event.code === 'Enter'
									) {
										event.preventDefault();
										onSubmit?.(value);
									}
									editableProps?.onKeyDown?.(
										event,
									);
								},
						  }
						: {})}
				/>
			</Slate>
		</InputMarkdownStyle>
	);
};

const Leaf = ({
	attributes,
	children,
	leaf,
}: RenderLeafProps) => {
	return (
		<LeafStyle
			{...attributes}
			className={classes(
				leaf.bold && 'bold',
				leaf.italic && 'italic',
				leaf.strike && 'strike',
				leaf.list && 'list',
				leaf.hr && 'hr',
				leaf.code && 'code',
				// leaf['code-snippet'] && 'code-snippet',
				leaf.type === 'punctuation' &&
					'punctuation',
			)}
		>
			{children}
		</LeafStyle>
	);
};

const CustomElement = (
	elementProps: RenderElementProps,
) => {
	const { attributes, children, element } =
		elementProps;

	switch (element.type) {
		case 'block-quote':
			return (
				<BlockquoteStyle {...attributes}>
					{children}
				</BlockquoteStyle>
			);
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>;
		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>;
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>;
		case 'heading-three':
			return <h3 {...attributes}>{children}</h3>;
		case 'heading-four':
			return <h4 {...attributes}>{children}</h4>;
		case 'heading-five':
			return <h5 {...attributes}>{children}</h5>;
		case 'heading-six':
			return <h6 {...attributes}>{children}</h6>;
		case 'list-item':
			return <li {...attributes}>{children}</li>;
		default:
			return (
				<div {...attributes}>{children}</div>
			);
	}
};

export namespace NInputMarkdown {
	export interface IProps {
		props: {
			editable?: boolean;
			submitOnEnter?: boolean;
			onSubmit?: (nodes: Descendant[]) => any;
			getEditor?: (editor: Editor) => any;
			slateProps?: Partial<
				React.ComponentProps<typeof Slate>
			>;
			editableProps?: Partial<
				React.ComponentProps<typeof Editable>
			>;
		};
	}
}

const BlockquoteStyle = styled.blockquote`
	border-left: 2px solid
		${({ theme }) =>
			theme?.palette?.text?.secondary};
	padding-left: 10px;
	margin: 0;
`;

const InputMarkdownStyle = styled.div`
	min-height: 100px;
	display: flex;
	font-family: inherit;
	.editable-root {
		flex-grow: 1;
		border: 1px solid var(--c-p5);
		border-radius: 4px;
		&:hover {
			border-color: var(--c-pink1);
		}
		&:focus {
			border-color: var(--c-pink1);
			border-width: 2px;
			padding: 7.5px 13px;
		}
		padding: 8.5px 14px;
		font: inherit;
		letter-spacing: inherit;
		&:focus-visible {
			outline: none;
		}
		.slate-placeholder {
			color: var(--c-p5);
			opacity: 1 !important;
		}
		> * {
			position: relative;
		}
		&:not(.is-editable) {
			.punctuation {
				display: none;
			}
		}
	}
	h1 {
		font-size: 32px;
	}
	h2 {
		font-size: 30px;
	}
	h3 {
		font-size: 28px;
	}
	h4 {
		font-size: 26px;
	}
	h5 {
		font-size: 24px;
	}
	h6 {
		font-size: 22px;
	}
`;

const LeafStyle = styled.span`
	&.bold {
		font-weight: bold;
	}
	&.italic {
		font-style: italic;
	}
	&.strike {
		/*position: relative;*/
		text-decoration: line-through;
		/*&:before {
			content: '';
			height: 2px;
			width: 100%;
			position: absolute;
			top: 50%;
			background-color: ${({ theme }) =>
			theme?.palette?.text?.primary};
		}*/
	}
	&.title {
		display: inline-block;
		font-weight: bold;
		font-size: 20px;
		margin: 20px 0 10px 0;
	}
	&.list {
		padding-left: 10px;
		font-size: 20px;
		line-height: 10px;
	}
	&.hr {
		display: block;
		text-align: center;
		border-bottom: 2px solid
			${({ theme }) =>
				theme?.palette?.text?.secondary};
	}
	&.blockquote {
		display: inline-block;
		border-left: 2px solid
			${({ theme }) =>
				theme?.palette?.text?.secondary};
		padding-left: 10px;
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
		font-style: italic;
	}
	&.code {
		font-family: monospace;
		background-color: #eee;
		padding: 3px;
	}
	&.code-snippet {
		background-color: ${({ theme }) =>
			theme?.palette?.colors?.tertiary?.[80]};
		padding: 1px 4px;
		border-radius: 4px;
	}
	&.punctuation {
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}
	&:not(.punctuation) + &.punctuation {
		margin-left: 1px;
	}
	&.punctuation + &:not(.punctuation) {
		margin-left: -1px;
	}
`;
