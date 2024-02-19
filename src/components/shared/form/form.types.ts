export type FormProps = {
	textFrom: string;
	textTo: string;
	handleTranslateText: (
		value: string,
		langFrom: string,
		langTo: string,
	) => Promise<{ result: string } | undefined>;
};

export type HandleChangeLanguageProps = {
	searchParamKey: "text_from" | "text_to";
	language: string;
};
