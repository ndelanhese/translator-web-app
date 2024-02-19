"use client";

import {
	Select as ShadCnSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { nanoid } from "nanoid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	LanguageObject,
	SearchParamKeyEnum,
	SelectProps,
} from "./select.types";

export const languages = [
	"PERSIAN",
	"KOREAN",
	"GERMAN",
	"DUTCH",
	"UKRAINIAN",
	"CHINESE",
	"CATALAN",
	"ENGLISH",
	"POLISH",
	"CZECH",
	"SPANISH",
	"IRISH",
	"FRENCH",
	"HUNGARIAN",
	"ITALIAN",
	"TURKISH",
	"SLOVAK",
	"ARABIC",
	"JAPANESE",
	"HINDI",
	"RUSSIAN",
	"PORTUGUESE",
	"AZERBAIJANI",
	"ESPERANTO",
	"FINNISH",
	"HEBREW",
	"DANISH",
	"GREEK",
	"INDONESIAN",
	"SWEDISH",
] as const;

export const Select = ({
	searchParamKey,
	defaultValue,
	disabled = false,
	onValueChangeCallback,
}: SelectProps) => {
	const { entries } = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const uniqueLanguages: LanguageObject[] = languages.reduce<LanguageObject[]>(
		(acc, lang) => {
			const capitalizedLang =
				lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
			if (!acc.some((obj) => obj.value === lang)) {
				acc.push({ value: lang, label: capitalizedLang });
			}
			return acc;
		},
		[],
	);

	const handleUpdateLanguage = async (languageInput: string) => {
		const current = new URLSearchParams(Array.from(entries()));

		const lowerCaseLanguageInput = languageInput.toLowerCase();

		current.set(searchParamKey, lowerCaseLanguageInput);

		const search = current.toString();
		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);

		await onValueChangeCallback?.({
			searchParamKey: searchParamKey as SearchParamKeyEnum,
			language: languageInput,
		});
	};

	return (
		<ShadCnSelect
			onValueChange={handleUpdateLanguage}
			value={defaultValue}
			disabled={disabled}
		>
			<SelectTrigger className="w-[10.5rem]">
				<SelectValue placeholder="Select a language" />
			</SelectTrigger>
			<SelectContent>
				{uniqueLanguages.map((item) => (
					<SelectItem key={nanoid()} value={item.value}>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</ShadCnSelect>
	);
};
