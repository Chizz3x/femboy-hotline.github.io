import {
	BaseEditor,
	Descendant,
	BaseRange,
} from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type BlockQuoteElement = {
	type: 'block-quote';
	align?: string;
	children: Descendant[];
};

export type BulletedListElement = {
	type: 'bulleted-list';
	align?: string;
	children: Descendant[];
};

export type HeadingOneElement = {
	type: 'heading-one';
	align?: string;
	children: Descendant[];
};

export type HeadingTwoElement = {
	type: 'heading-two';
	align?: string;
	children: Descendant[];
};

export type HeadingThreeElement = {
	type: 'heading-three';
	align?: string;
	children: Descendant[];
};

export type HeadingFourElement = {
	type: 'heading-four';
	align?: string;
	children: Descendant[];
};

export type HeadingFiveElement = {
	type: 'heading-five';
	align?: string;
	children: Descendant[];
};

export type HeadingSixElement = {
	type: 'heading-six';
	align?: string;
	children: Descendant[];
};

export type ListItemElement = {
	type: 'list-item';
	children: Descendant[];
};

export type ParagraphElement = {
	type: 'paragraph';
	align?: string;
	children: Descendant[];
};

export type CodeLineElement = {
	type: 'code-line';
	children: Descendant[];
};

export type CustomElement =
	| BlockQuoteElement
	| BulletedListElement
	| HeadingOneElement
	| HeadingTwoElement
	| HeadingThreeElement
	| HeadingFourElement
	| HeadingFiveElement
	| HeadingSixElement
	| ListItemElement
	| ParagraphElement
	| CodeLineElement;

export type CustomText = {
	bold?: boolean;
	strike?: boolean;
	italic?: boolean;
	code?: boolean;
	blockquote?: boolean;
	hr?: boolean;
	list?: boolean;
	title?: boolean;
	text: string;
	type?: string;
};

export type CustomEditor = BaseEditor &
	ReactEditor &
	HistoryEditor & {
		nodeToDecorations?: Map<Element, Range[]>;
	};

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
		Range: BaseRange & {
			[key: string]: unknown;
		};
	}
}
