import { Tr, Td, Icon } from "@chakra-ui/react";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { LiaUndoAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

interface TableRowProps {
    row: Record<string, any>,
    detailedListUrl?: string,
    keys: string[]
    onClickIcon?: (id: any) => void
    icon?: "Reverse"| "Delete"
}

export function TableRow({ row,  detailedListUrl, keys, onClickIcon, icon }: Readonly<TableRowProps>){
    return (
            <Tr>
                {detailedListUrl && (
                    <Td textAlign="center">
                        <Link to={`/${detailedListUrl}/${row.id}`} style={{ display: "flex", justifyContent: "center" }}>
                            <FaRegEye />
                        </Link>
                    </Td>
                )}   

                {keys.map((key) => (
                    <Td key={key}>
                        {
                            typeof row[key] === 'boolean' ? 
                            row[key] ? "Yes" : "No" 
                            :   
                            row[key]
                        }
                    </Td>
                ))}
                <Td><Icon as={icon == "Reverse" ? LiaUndoAltSolid: FaRegTrashAlt} onClick={() => onClickIcon && onClickIcon(row.id)} style={{ cursor: "pointer" }} /></Td>
            </Tr>
    )
}