import { Box, Spinner } from "@chakra-ui/react";

export function Loading() {
	return (
		<Box height="100vh" display="flex" justifyContent="center" alignItems="center">
			<Spinner />
		</Box>
	);
}
