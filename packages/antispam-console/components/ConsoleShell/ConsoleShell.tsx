import type { FC, ReactNode } from "react";
import { chakra } from "@chakra-ui/react";
import { TopBar } from "../TopBar";
import { SideBar } from "../SideBar";

export const ConsoleShell: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <chakra.div
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateAreas: `
        'top-bar top-bar'
        'side-bar main'
        'side-bar main'
      `,
        gridTemplateColumns: "min-content 1fr",
        gridTemplateRows: "min-content 1fr",
      }}
    >
      <chakra.div sx={{ gridArea: "top-bar" }}>
        <TopBar />
      </chakra.div>
      <chakra.div sx={{ gridArea: "side-bar" }}>
        <SideBar />
      </chakra.div>
      <chakra.div sx={{ gridArea: "main" }}>{children}</chakra.div>
    </chakra.div>
  );
};
