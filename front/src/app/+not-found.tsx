import { Redirect, useRouter } from "expo-router"
import React from "react"

export default function Missing() {
	const router = useRouter();
	console.log("missing");

	router.replace("/welcome");
	return (
		<Redirect href="/" />
	);
}