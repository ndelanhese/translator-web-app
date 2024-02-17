import { TextArea } from "@components/text-area";

const Home = () => {
	return (
		<main className="w-full bg-primary h-screen grid sm:grid-cols-2 grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:py-4 px-4 sm:px-0">
			<div className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r px-2 py-4">
				<TextArea id="text-from" label="From" />
			</div>
			<div className="flex flex-1 items-center justify-center px-2 py-4">
				<TextArea id="text-to" label="To" className="bg-zinc-700" readOnly />
			</div>
		</main>
	);
};

export default Home;
