const Home = () => {
	return (
		<main className="w-full bg-primary h-screen grid sm:grid-cols-2 grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:py-4 px-4 sm:px-0">
			<div className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r">
				<h1 className="text-primary-foreground">from</h1>
			</div>
			<div className="flex flex-1 items-center justify-center">
				<h1 className="text-primary-foreground">to</h1>
			</div>
		</main>
	);
};

export default Home;
