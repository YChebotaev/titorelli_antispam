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
import { ConsoleShell } from "../../../../components";
import { createApiClient } from "../../../../lib/createApiClient";
import { useApiClient } from "../../../../hooks/useApiClient";
import { useTableControls } from "../../../../hooks/useTableControls";

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const tenant_id = Number(query.tenant_id);
  const apiClient = createApiClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([tenant_id, "models"], async () => {
    const { data } = await apiClient.get(`/api/tenants/${tenant_id}/models`);

    return data;
  });

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ModelsTable: FC<{
  data: {
    model_id: number;
    tenant_id: number;
    lang: string;
    smoothing: number;
    updated_at: number;
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
              <Trans t={t}>Updated at</Trans>
            </Th>
            <Th>
              <Trans t={t}>Language</Trans>
            </Th>
            <Th isNumeric>
              <Trans t={t}>Smoothing</Trans>
            </Th>
            <Th>
              <Trans t={t}>Examples</Trans>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map(({ model_id, tenant_id, lang, smoothing, updated_at }) => (
              <Tr key={`${model_id}/${tenant_id}`}>
                <Td>
                  <Radio {...getRowRadioProps(model_id, tenant_id)} />
                </Td>
                <Td>
                  <Tag variant="outline">
                    <pre>{model_id}</pre>
                  </Tag>
                </Td>
                <Td>
                  <pre>{format(updated_at, "d.L.u k:m:s:S")}</pre>
                </Td>
                <Td>
                  <Tag variant="outline">
                    <pre>{lang}</pre>
                  </Tag>
                </Td>
                <Td isNumeric>
                  <pre>{Number(smoothing).toFixed(2)}</pre>
                </Td>
                <Td>
                  <Link
                    as={NextLink}
                    href={`/tenants/${tenant_id}/models/${model_id}/examples`}
                  >
                    <Trans t={t}>Examples</Trans>
                  </Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default function Models() {
  const { query } = useRouter();
  const tenant_id = Number(query.tenant_id);
  const apiClient = useApiClient();
  const { data } = useQuery([tenant_id, "models"], async () => {
    const { data } = await apiClient.get(`/api/tenants/${tenant_id}/models`);

    return data;
  });

  return (
    <ConsoleShell>
      <ModelsTable data={data} />
    </ConsoleShell>
  );
}
