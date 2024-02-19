"use client";

import { Select } from "@components/shared/select";
import { TextArea } from "@components/shared/text-area";
import { useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FormProps, HandleChangeLanguageProps } from "./form.types";

export const Form = ({ handleTranslateText }: FormProps) => {
	const { get: getSearchParam } = useSearchParams();

	const langFrom = getSearchParam("text_from") ?? "portuguese";
	const langTo = getSearchParam("text_to") ?? "english";

	const [translatedText, setTranslatedText] = useState<string | undefined>(
		undefined,
	);
	const [isTranslating, setIsTranslating] = useState<boolean>(false);

	const textFromRef = useRef<HTMLTextAreaElement>(null);

	const handleChangeInputValue = useCallback(
		async (value: string) => {
			setIsTranslating(true);
			const response = await handleTranslateText(value, langFrom, langTo);
			setTranslatedText(response?.result);
			setIsTranslating(false);
		},
		[langFrom, langTo, handleTranslateText],
	);

	const handleLanguageChange = useCallback(
		async ({ language, searchParamKey }: HandleChangeLanguageProps) => {
			setIsTranslating(true);
			const textFromCurrent = textFromRef?.current?.value;

			if (!textFromCurrent) {
				setIsTranslating(false);
				return;
			}

			const translateTextProps = {
				text_from: textFromCurrent,
				lang_from: searchParamKey === "text_from" ? language : langFrom,
				lang_to: searchParamKey === "text_to" ? language : langTo,
			};

			const response = await handleTranslateText(
				translateTextProps.text_from,
				translateTextProps.lang_from,
				translateTextProps.lang_to,
			);
			setTranslatedText(response?.result);
			setIsTranslating(false);
		},
		[langFrom, langTo, handleTranslateText],
	);

	return (
		<>
			<div className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r px-2 py-4 flex-col gap-4 sm:gap-8">
				<h1 className="text-primary text-3xl tracking-tighter uppercase font-bold">
					Original text
				</h1>
				<TextArea
					id="text-from"
					label={`Your text in ${langFrom.toLowerCase()}:`}
					placeholder={`Type your ${langFrom.toLowerCase()} text here.`}
					handleChangeValue={handleChangeInputValue}
					ref={textFromRef}
				>
					<Select
						searchParamKey="text_from"
						defaultValue={langFrom.toUpperCase()}
						disabled={isTranslating}
						onValueChangeCallback={handleLanguageChange}
					/>
				</TextArea>
			</div>
			<div className="flex flex-1 items-center justify-center px-2 py-4 flex-col gap-4 sm:gap-8">
				<h1 className="text-primary text-3xl tracking-tighter uppercase font-bold">
					Translated text
				</h1>
				<TextArea
					id="text-to"
					label={`Your ${langTo.toLowerCase()} text is:`}
					className="bg-zinc-800"
					readOnly
					placeholder={`Your text in ${langTo.toLowerCase()} will appear here.`}
					value={translatedText}
					isLoading={isTranslating}
				>
					<Select
						searchParamKey="text_to"
						defaultValue={langTo.toUpperCase()}
						disabled={isTranslating}
						onValueChangeCallback={handleLanguageChange}
					/>
				</TextArea>
			</div>
		</>
	);
};
