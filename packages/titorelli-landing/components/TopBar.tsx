import type { FC } from "react";
import NextLink from "next/link";
import { chakra, Button } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { useTranslation, Trans } from "react-i18next";

export const TopBar: FC = () => {
  const { t } = useTranslation();

  return (
    <chakra.div
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      minH="40px"
      backgroundColor="#2C2D81"
      borderBottom="1px solid #6466e3"
      paddingX="4"
    >
      <chakra.div
        width="68px"
        height="30px"
        backgroundImage={"/logo-with-caption.svg"}
        backgroundSize="contain"
      />
      <chakra.div flexGrow={1} />
      <chakra.div color="white" display="flex" gap="20px">
        <Button
          as={NextLink}
          variant="unstyled"
          leftIcon={<QuestionOutlineIcon />}
          href="/support"
          display="flex"
        >
          <Trans t={t}>Техподдержка</Trans>
        </Button>
        <Button as={NextLink} variant="unstyled" href="/signin" display="flex">
          <Trans t={t}>Вход</Trans>
        </Button>
      </chakra.div>
    </chakra.div>
  );
};
