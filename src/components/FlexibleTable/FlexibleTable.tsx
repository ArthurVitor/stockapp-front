import { TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react"
import { TableRow } from "./TableRow";

type Sizes = "sm" | "md" | "lg";
type Variants = "simple" | "striped" | "unstyled"

interface FlexibleTableProps {
    /**
     * The data to be displayed in the table.
     * An array of records where each record is an object with string keys and any type of values.
     * Example: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]
     */
    data: Record<string, any>[]

    /**
     * A list of keys to be excluded from the table display.
     * An array of strings representing the keys that should not be displayed in the table.
     * Example: ['password', 'ssn']
     */
    keysBlackList: string[]
    size: Sizes
    variant: Variants
    bgColor: string
    thColor: string
    detailedListUrl?: string
    icon?: "Reverse" | "Delete"
    onClickIcon?: (id: number) => void /* optional for now but after the implementation is complete turn back to mandatory */
}

export function FlexibleTable(props: Readonly<FlexibleTableProps>){
    let keys: string[] = [];
    if (props.data.length > 0){
        keys = Object.keys(props.data[0]).filter(key => !props.keysBlackList.includes(key));
    }

    return (
            <TableContainer>
                <Table variant={props.variant} size={props.size} bgcolor={props.bgColor}>
                    <Thead bgColor={props.thColor}>
                        <Tr>
                            {
                                props.detailedListUrl && (<Th> </Th>) 
                            }

                            {
                                keys.map((key) => (
                                    <Th key={key}>
                                        {key}
                                    </Th>
                                ))
                            }
                            <Th> </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.data.map((row, rowIndex) => (
                            <TableRow icon={props.icon} key={rowIndex} keys={keys} row={row} detailedListUrl={props.detailedListUrl} onClickIcon={props.onClickIcon} />
                        ))}
                    </Tbody>
                    
                </Table>
            </TableContainer>
    )
}