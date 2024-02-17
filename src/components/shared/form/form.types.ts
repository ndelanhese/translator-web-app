export type FormProps = {
	textFrom: string;
	textTo: string;
	handleTranslateText: (
		value: string,
		langFrom: string,
		langTo: string,
	) => Promise<{ result: string } | undefined>;
};
