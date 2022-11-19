import type { FC } from "react";
import { chakra, Heading, Button, Icon } from "@chakra-ui/react";
import { useTranslation, Trans } from "react-i18next";
import { signOut } from "next-auth/react";
import { FaBars } from "react-icons/fa"

export const TopBar: FC = () => {
  const { t } = useTranslation();

  return (
    <chakra.div
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "2",
        backgroundColor: "blue.600",
        color: "white",
      }}
    >
      <Button variant="link">
        <Icon as={FaBars} color="white" />
      </Button>
      <Heading size="md" sx={{ flexGrow: 0, flexShrink: 0 }}>
        <Trans t={t}>Titorelli antispam</Trans>
      </Heading>
      <chakra.div sx={{ flexGrow: 1, flexShrink: 1 }} />
      <chakra.div sx={{ flexShrink: 1 }}>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          <Trans t={t}>Sign out</Trans>
        </Button>
      </chakra.div>
    </chakra.div>
  );
};
