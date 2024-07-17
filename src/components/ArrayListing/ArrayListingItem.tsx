import { Box, Text } from "@chakra-ui/react";
import { ToCapitalize } from "../../utils/ToCapitalize";

interface ArrayListingItemProps{
    data: Record<string, any>
}

export function ArrayListingItem({ data }: Readonly<ArrayListingItemProps>) {
    return (
        <Box minH={"3rem"} bgColor={"rgba(102, 179, 186, 0.5)"} px={3} borderRadius={"10"} py={1}>
            {Object.entries(data).map(([key, value], index) => (
                <Text fontWeight="bold" key={index}>{ToCapitalize(key)}: {value}</Text>
            ))}
        </Box>
    )
}