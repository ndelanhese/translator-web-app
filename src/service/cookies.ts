"use server";

import { cookies } from "next/headers";

export const getCookies = async () => {
	return cookies().toString();
};

export const getCookieValue = async (key: string) => {
	return cookies().get(key)?.value;
};

export const deleteCookie = async (key: string) => {
	cookies().delete(key);
};
