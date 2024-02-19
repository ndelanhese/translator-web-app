"use client";

import { cn } from "@/lib/utils";
import { Button } from "@components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { SwitchLangButtonProps } from "./switch-lang-button.types";

export const SwitchLangButton = ({
	onChange,
	className,
}: SwitchLangButtonProps) => {
	return (
		<Button
			className={cn(
				"sm:row-start-auto sm:row-end-auto sm:top-1/2 sm:left-[calc(50%-1.25rem)]",
				className,
			)}
			size="icon"
			onClick={onChange}
		>
			<ArrowLeftRight className="w-4 h-4 sm:w-6 sm:h-6" />
		</Button>
	);
};
