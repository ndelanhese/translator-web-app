"use client";

import { cn } from "@/lib/utils";
import { Label } from "@components/ui/label";
import { Skeleton } from "@components/ui/skeleton";
import { Textarea as ShadCnTextarea } from "@components/ui/textarea";
import { forwardRef, useState } from "react";
import { TextAreaProps } from "./text-area.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{ label, id, className, children, handleChangeValue, isLoading, ...props },
		ref,
	) => {
		const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

		const handleChange = (value: string) => {
			if (searchTimeout) {
				clearTimeout(searchTimeout);
			}

			setSearchTimeout(
				setTimeout(async () => {
					await handleChangeValue?.(value);
				}, 500) as unknown as number,
			);
		};

		return (
			<div className="w-full sm:max-w-[40rem] h-full sm:h-[20rem] flex flex-col gap-2">
				{label && (
					<Label
						htmlFor={id}
						className="text-primary inline-flex w-full justify-between items-center sm:items-end"
					>
						{label}
						{children}
					</Label>
				)}
				{isLoading ? (
					<Skeleton className="w-full h-full" />
				) : (
					<ShadCnTextarea
						{...props}
						ref={ref}
						id={id}
						className={cn("bg-background text-primary h-full", className)}
						onChange={(e) => handleChange(e?.currentTarget?.value)}
					/>
				)}
			</div>
		);
	},
);
