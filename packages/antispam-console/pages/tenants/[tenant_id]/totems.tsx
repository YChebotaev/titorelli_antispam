import type { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Radio,
  Link,
  Tag,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next/types";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import { format } from "date-fns";
import NextLink from "next/link";
import { useTranslation, Trans } from "react-i18next";
import { ConsoleShell } from "../../../components";
import { createApiClient } from "../../../lib/createApiClient";
import { useApiClient } from "../../../hooks/useApiClient";
import { useTableControls } from "../../../hooks/useTableControls";

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const tenant_id = Number(query.tenant_id);
  const apiClient = createApiClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([tenant_id, "totems"], async () => {
    const { data } = await apiClient.get(`/api/tenants/${tenant_id}/totems`);

    return data;
  });

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const TotemsTable: FC<{
  data: {
    totem_id: number;
    tenant_id: number;
    model_id: number;
    author_id: number;
    granted_at: number;
  }[];
}> = ({ data }) => {
  const { t } = useTranslation();
  const { headerRadioProps, getRowRadioProps } = useTableControls();

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>
              <Radio {...headerRadioProps} />
            </Th>
            <Th>
              <Trans t={t}>#</Trans>
            </Th>
            <Th>
              <Trans t={t}># Author</Trans>
            </Th>
            <Th>
              <Trans t={t}>Granted at</Trans>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map(({ totem_id, tenant_id, granted_at }) => (
              <Tr key={`${totem_id}/${tenant_id}`}>
                <Td>
                  <Radio {...getRowRadioProps(totem_id, tenant_id)} />
                </Td>
                <Td>
                  <Tag variant="outline">
                    <pre>{totem_id}</pre>
                  </Tag>
                </Td>
                <Td>
                  <pre>{format(granted_at, "d.L.u k:m:s:S")}</pre>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default function Totems() {
  const { query } = useRouter();
  const tenant_id = Number(query.tenant_id);
  const apiClient = useApiClient();
  const { data } = useQuery([tenant_id, "totems"], async () => {
    const { data } = await apiClient.get(`/api/tenants/${tenant_id}/totems`);

    return data;
  });

  return (
    <ConsoleShell>
      <TotemsTable data={data} />
    </ConsoleShell>
  );
}
