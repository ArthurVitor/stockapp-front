import { Box, Heading, List } from "@chakra-ui/react";
import "./SideBar.css";
import { SidebarItem } from "./SideBarItem";
import { items } from "./SideBarItems";
import { ISideBarProps } from "../../lib/interfaces/props/ISideBarProps";

export default function SideBar({ selectedSidebarItem, setSelectedSideBarItem }: ISideBarProps) {
  
  return (
    <Box as="nav" className="side-bar-box">
      <Heading className="stock-app">StockApp</Heading>
      <List className="list-links">
        {items.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            selectedItem={selectedSidebarItem}
            handleItemClick={setSelectedSideBarItem}
          />
        ))}
      </List>
    </Box>
  );
}
