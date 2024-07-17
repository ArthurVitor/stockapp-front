import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { FloatingButton } from "../../components/FloatingButton/FloatingButton";
import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { IHeaderKeys } from "../../lib/interfaces/header/IHeaderKeys";
import { useHeaderData } from "../../hooks/useHeaderData";
import { IHeaders } from "../../lib/interfaces/header/IHeaders";


type HeaderKeys = keyof IHeaders;

export function HomePage() {
  const [ pagina, setPagina ] = useState<HeaderKeys>();
  const [ headerData, setHeaderData ] = useState<IHeaderKeys[]>();
  const [ activatedTag, setActivatedTag ] = useState<string>();
  const [ selectedSidebarItem, setSelectedSideBarItem ] = useState<string | null>(null);

  useHeaderData({ pagina, setHeaderData });


  return(
    <Grid templateColumns="25% 75%" height="100vh">
      <GridItem>
        <SideBar selectedSidebarItem={selectedSidebarItem} setSelectedSideBarItem={setSelectedSideBarItem}/>
      </GridItem>
      <GridItem backgroundColor="#E3E1E1">
        <Box padding={5}>
          {
            headerData && (
              <Header items={headerData} activatedTag={activatedTag} />
            )
          }
          <Outlet context={{setPagina, setActivatedTag}} />
        </Box>
      </GridItem>
      <Box
        position="fixed"
        bottom="4"
        right="4"
        zIndex="10"
        p={7}
      >
        <FloatingButton setSelectedSideBarItem={setSelectedSideBarItem}/>
      </Box>
    </Grid>
  );
}
