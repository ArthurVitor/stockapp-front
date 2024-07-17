import { AbsoluteCenter, Box, Divider, Flex, Text } from "@chakra-ui/react";
import { ArrayListing } from "../ArrayListing/ArrayListing";
import { ToCapitalize } from "../../utils/ToCapitalize";
import "./DetailedView.css";
import { DetailedViewProps } from "../../lib/interfaces/props/IDetailedViewProps";

export function DetailedView({
	title,
	entity,
	dependencies,
	dependenciesTitles,
	keysBlackList,
}: Readonly<DetailedViewProps>) {
	return (
		<Flex className="flex">
			<Box className="flex-box">
				<Box className="item-box">
					<AbsoluteCenter axis="both">
						<Text fontSize="3xl" fontWeight={"bolder"}>
							{title}
						</Text>

						{Object.keys(entity)
							.filter((key) => !keysBlackList.includes(key))
							.map((key) => (
								<Text fontSize="xl" key={key} wordBreak="break-word">
									{ToCapitalize(key) + `: ${entity[key]}`}
								</Text>
							))}
					</AbsoluteCenter>
				</Box>
			</Box>

			<Divider
				className="divider"
				orientation="vertical"
			/>

			<Box className="array-listing-box" gap={2}>
				{dependencies.map((dependency, index) => (
					<ArrayListing key={index} title={dependenciesTitles[index]} data={dependency} />
				))}
			</Box>
		</Flex>
	);
}
