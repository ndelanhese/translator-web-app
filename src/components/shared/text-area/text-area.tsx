import { cn } from "@/lib/utils";
import { Label } from "@components/ui/label";
import { Textarea as ShadCnTextarea } from "@components/ui/textarea";
import { forwardRef } from "react";
import { TextAreaProps } from "./text-area.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, id, className, children, ...props }, ref) => (
		<div className="w-full sm:w-[40rem] h-full sm:h-[20rem] flex flex-col gap-2">
			{label && (
				<Label
					htmlFor={id}
					className="text-primary inline-flex w-full justify-between items-center sm:items-end"
				>
					{label}
					{children}
				</Label>
			)}
			<ShadCnTextarea
				ref={ref}
				id={id}
				className={cn("bg-background text-primary h-full", className)}
				{...props}
			/>
		</div>
	),
);
