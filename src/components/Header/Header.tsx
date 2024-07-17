import { Box, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { IHeaderKeys } from "../../lib/interfaces/header/IHeaderKeys"

interface HeaderProps{
    items: IHeaderKeys[],
    activatedTag?: string
}

export function Header({ items, activatedTag }: Readonly<HeaderProps>){
    return (
        <Flex justifyContent="space-around" gap="2">
            {
                items.map((item) => (
                    <Box key={item.tag}>
                        <Link to={item.url}>
                            <Text fontSize="3xl" color="#335C67" borderBottom={activatedTag === item.tag ? '3px solid #335C67' : "none"}>{item.name}</Text>
                        </Link>
                    </Box>
                ))
            }
        </Flex>
    )
}