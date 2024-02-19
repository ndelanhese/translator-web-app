import { languages } from "./select";

export type SearchParamKeyEnum = "text_from" | "text_to";

export type OnValueChangeCallbackProps = {
	searchParamKey: SearchParamKeyEnum;
	language: string;
};

export type SelectProps = {
	searchParamKey: string;
	defaultValue?: string;
	disabled?: boolean;
	onValueChangeCallback?: (value: OnValueChangeCallbackProps) => Promise<void>;
};

export type Language = (typeof languages)[number];

export type LanguageObject = {
	value: Language;
	label: string;
};
