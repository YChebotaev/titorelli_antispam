import { chakra, Link } from "@chakra-ui/react";
import { useTranslation, Trans } from "react-i18next";
import NextLink from "next/link";
import type { FC } from "react";

export const SideBar: FC = () => {
  const { t } = useTranslation();
  const tenant_id = 0;

  return (
    <chakra.div
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexFlow="column"
      minW={250}
      minH="100%"
      paddingY={1}
      backgroundColor="#fafafa"
    >
      <Link
        as={NextLink}
        href={`/tenants/${tenant_id}/models`}
        width="100%"
        textAlign="left"
        padding={1}
        paddingX={4}
      >
        <Trans t={t}>Models</Trans>
      </Link>
      <Link
        as={NextLink}
        href={`/tenants/${tenant_id}/totems`}
        width="100%"
        textAlign="left"
        padding={1}
        paddingX={4}
      >
        <Trans t={t}>Totems</Trans>
      </Link>
    </chakra.div>
  );
};
