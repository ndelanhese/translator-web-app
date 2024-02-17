import { Select } from "@components/shared/select";
import { TextArea } from "@components/shared/text-area";
import { HomePageProps } from "./page.types";

const Home = ({ searchParams }: HomePageProps) => {
	const textFrom = searchParams?.text_from ?? "portuguese";
	const textTo = searchParams?.text_to ?? "english";
	return (
		<main className="w-full bg-background h-screen grid sm:grid-cols-2 grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:py-4 px-4 sm:px-0">
			<div className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r px-2 py-4 flex-col gap-4 sm:gap-8">
				<h1 className="text-primary text-3xl tracking-tighter uppercase font-bold">
					Text from
				</h1>
				<TextArea
					id="text-from"
					label={`Your text in ${textFrom.toLowerCase()}:`}
					placeholder={`Type your ${textFrom.toLowerCase()} text here.`}
				>
					<Select
						searchParamKey="text_from"
						defaultValue={textFrom.toUpperCase()}
					/>
				</TextArea>
			</div>
			<div className="flex flex-1 items-center justify-center px-2 py-4 flex-col gap-4 sm:gap-8">
				<h1 className="text-primary text-3xl tracking-tighter uppercase font-bold">
					Translated text
				</h1>
				<TextArea
					id="text-to"
					label={`Your ${textTo.toLowerCase()} text is:`}
					className="bg-zinc-800"
					readOnly
					placeholder={`Your text in ${textTo.toLowerCase()} will appear here.`}
				>
					<Select
						searchParamKey="text_to"
						defaultValue={textTo.toUpperCase()}
					/>
				</TextArea>
			</div>
		</main>
	);
};

export default Home;
