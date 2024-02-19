import { api } from "@/service/api";
import { Form } from "@components/shared/form";
import { HomePageProps, TranslateResponse } from "./page.types";

const Home = ({ searchParams }: HomePageProps) => {
	const textFrom = searchParams?.text_from ?? "portuguese";
	const textTo = searchParams?.text_to ?? "english";

	const handleTranslateText = async (
		value: string,
		langFrom: string,
		langTo: string,
	): Promise<{ result: string } | undefined> => {
		"use server";

		try {
			const response = await api<TranslateResponse>(
				"/translate",
				{
					lang_from: langFrom.toUpperCase(),
					lang_to: langTo.toUpperCase(),
					text: value,
				},
				{ method: "POST" },
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className="w-full bg-background h-screen flex flex-col sm:grid sm:grid-cols-2 grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:py-4 px-4 sm:px-0">
			<Form
				handleTranslateText={handleTranslateText}
				textFrom={textFrom}
				textTo={textTo}
			/>
		</main>
	);
};

export default Home;
