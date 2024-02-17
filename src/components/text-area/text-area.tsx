import { cn } from "@/lib/utils";
import { Label } from "@components/ui/label";
import { Textarea as ShadCnTextarea } from "@components/ui/textarea";
import { forwardRef } from "react";
import { TextAreaProps } from "./text-area.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, id, className, ...props }, ref) => (
		<div className="w-full sm:w-[40rem] h-full sm:h-[20rem] flex flex-col gap-2">
			{label && (
				<Label htmlFor={id} className="text-primary-foreground">
					{label}
				</Label>
			)}
			<ShadCnTextarea
				ref={ref}
				id={id}
				{...props}
				className={cn("bg-primary text-primary-foreground h-full", className)}
			/>
		</div>
	),
);
