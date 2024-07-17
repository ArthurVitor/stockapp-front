import { ListIcon, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SidebarItemProps } from "../../lib/interfaces/props/ISideBarItemProps";

export function SidebarItem({ item, selectedItem, handleItemClick }: Readonly<SidebarItemProps>) {
    const { name, label, icons } = item;
    const Icon = selectedItem === name ? icons[1] : icons[0];
  
    return (
      <Link to={name}>
        <ListItem
          bg={selectedItem === name ? "#66B3BA" : "transparent"}
          className="side-bar-links"
          onClick={() => handleItemClick(name)}
        >
          <ListIcon as={Icon} className="icons" />
          {label}
        </ListItem>
      </Link>
    );
  }
  