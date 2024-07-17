import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface ErrorProps {
	errorMessage: string;
}

export function ErrorAlert({ errorMessage }: Readonly<ErrorProps>) {
	return (
		<Alert status="error">
			<AlertIcon />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{errorMessage}</AlertDescription>
		</Alert>
	);
}
