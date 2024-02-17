import { ReactNode, TextareaHTMLAttributes } from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
	children?: ReactNode;
	handleChangeValue?: (value: string) => Promise<void>;
	isLoading?: boolean;
};
