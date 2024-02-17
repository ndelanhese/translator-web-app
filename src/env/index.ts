import { z } from "zod";

const envSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.string().url().default("http://127.0.0.1"),
	NEXT_PUBLIC_APP_PORT: z.coerce.number().default(3000),
	NEXT_PUBLIC_API_URL: z.string().url().default("http://127.0.0.1"),
	NEXT_PUBLIC_API_PORT: z.coerce.number().default(3333),
	NEXT_PUBLIC_API_DELAY: z.coerce
		.string()
		.transform((value) => value === "true"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	throw new Error("❌ Invalid environment variables!");
}

export const env = _env.data;
