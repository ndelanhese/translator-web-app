"use client";

import { Select } from "@components/shared/select";
import { TextArea } from "@components/shared/text-area";
import { useState } from "react";
import { FormProps } from "./form.types";

export const Form = ({ handleTranslateText, textFrom, textTo }: FormProps) => {
	const [translatedText, setTranslatedText] = useState<string | undefined>(
		undefined,
	);
	const [isTranslating, setIsTranslating] = useState<boolean>(false);

	const handleChangeInputValue = async (value: string) => {
		setIsTranslating(true);
		const response = await handleTranslateText(value, textFrom, textTo);
		setTranslatedText(response?.result);
		setIsTranslating(false);
	};

	return (
		<>
			<div className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r px-2 py-4 flex-col gap-4 sm:gap-8">
				<h1 className="text-primary text-3xl tracking-tighter uppercase font-bold">
					Original text
				</h1>
				<TextArea
					id="text-from"
					label={`Your text in ${textFrom.toLowerCase()}:`}
					placeholder={`Type your ${textFrom.toLowerCase()} text here.`}
					handleChangeValue={handleChangeInputValue}
				>
					<Select
						searchParamKey="text_from"
						defaultValue={textFrom.toUpperCase()}
						disabled={isTranslating}
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
					value={translatedText}
					isLoading={isTranslating}
				>
					<Select
						searchParamKey="text_to"
						defaultValue={textTo.toUpperCase()}
						disabled={isTranslating}
					/>
				</TextArea>
			</div>
		</>
	);
};
