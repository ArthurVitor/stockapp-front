import { Card, CardHeader, Heading, CardBody, Flex } from "@chakra-ui/react";
import { ArrayListingItem } from "./ArrayListingItem";
import { ArrayListingProps } from "../../lib/interfaces/props/IArrayListingProps";

export function ArrayListing({ title, data }: Readonly<ArrayListingProps>) {
	return (
		<Card width="23vw" borderWidth="1px" borderRadius="lg" borderColor={"rgba(102, 179, 186, 0.5)"} overflow="hidden">
			<CardHeader p={4}>
				<Heading size="md" color="black">
					{title}
				</Heading>
			</CardHeader>

			<CardBody p={4} bgColor={"#FFF"} minH={"20vw"} maxH={"20vw"} overflowY={"auto"}>
				<Flex flexDir={"column"} gap={2}>
					{data.map((item, index) => (
						<ArrayListingItem  data={item} key={index} />
					))}
				</Flex>
			</CardBody>
		</Card>
	);
}
