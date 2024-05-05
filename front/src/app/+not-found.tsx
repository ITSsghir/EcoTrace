import { Redirect } from "expo-router"
import React from "react"

export default function Missing() {
	console.log("missing");

	return (
		<Redirect href="/" />
	);
}