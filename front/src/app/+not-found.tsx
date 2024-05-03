import { Redirect, useRouter } from "expo-router"
import React from "react"

export default function Missing() {
	const router = useRouter();
	console.log("missing");

	return (
		<Redirect href="/" />
	);
}