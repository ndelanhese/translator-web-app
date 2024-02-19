"use client";

import { Select } from "@components/shared/select";
import { TextArea } from "@components/shared/text-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { SwitchLangButton } from "../switch-lang-button/switch-lang-button";
import { FormProps, HandleChangeLanguageProps } from "./form.types";

export const Form = ({ handleTranslateText }: FormProps) => {
	const { get: getSearchParam, entries } = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const langFrom = getSearchParam("text_from") ?? "portuguese";
	const langTo = getSearchParam("text_to") ?? "english";

	const [currentText, setCurrentText] = useState<string | undefined>(undefined);
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

	const handleSwitchLangs = useCallback(() => {
		const current = new URLSearchParams(Array.from(entries()));

		current.set("text_from", langTo);
		current.set("text_to", langFrom);

		const search = current.toString();
		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);

		const textFromCurrent = textFromRef?.current?.value;

		if (!textFromCurrent) {
			setIsTranslating(false);
			return;
		}

		setCurrentText(translatedText);
		setTranslatedText(textFromCurrent);
	}, [langFrom, langTo, pathname, entries, router, translatedText]);

	return (
		<>
			<div className="flex flex-1 items-center justify-center sm:border-b-0 sm:border-r px-2 py-4 flex-col gap-4 sm:gap-8">
				<h1 className="text-primary text-3xl tracking-tighter uppercase font-bold">
					Original text
				</h1>
				<TextArea
					id="text-from"
					label={`Your text in ${langFrom.toLowerCase()}:`}
					placeholder={`Type your ${langFrom.toLowerCase()} text here.`}
					handleChangeValue={handleChangeInputValue}
					ref={textFromRef}
					value={currentText}
				>
					<Select
						searchParamKey="text_from"
						defaultValue={langFrom.toUpperCase()}
						disabled={isTranslating}
						onValueChangeCallback={handleLanguageChange}
					/>
				</TextArea>
			</div>
			<SwitchLangButton
				onChange={handleSwitchLangs}
				className="flex sm:hidden self-center"
			/>
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
			<SwitchLangButton
				onChange={handleSwitchLangs}
				className="hidden sm:absolute sm:flex"
			/>
		</>
	);
};
