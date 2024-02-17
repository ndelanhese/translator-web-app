import { languages } from "./select";

export type SelectProps = {
	searchParamKey: string;
	defaultValue?: string;
	disabled?: boolean;
	onValueChangeCallback?: () => Promise<void>;
};

export type Language = (typeof languages)[number];

export type LanguageObject = {
	value: Language;
	label: string;
};
