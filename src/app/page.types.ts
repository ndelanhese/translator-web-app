export type HomePageProps = {
	searchParams?: {
		text_from?: string | null;
		text_to?: string | null;
	};
};

export type TranslateResponse = {
	result: string;
};
