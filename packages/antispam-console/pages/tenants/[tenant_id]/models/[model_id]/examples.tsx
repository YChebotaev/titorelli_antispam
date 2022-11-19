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
  Tag,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next/types";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useTranslation, Trans } from "react-i18next";
import { ConsoleShell } from "../../../../../components";
import { createApiClient } from "../../../../../lib/createApiClient";
import { useApiClient } from "../../../../../hooks/useApiClient";
import { useTableControls } from "../../../../../hooks/useTableControls";

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const tenant_id = Number(query.tenant_id);
  const model_id = Number(query.model_id);
  const apiClient = createApiClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [tenant_id, "models", model_id, "examples"],
    async () => {
      const { data } = await apiClient.get(
        `/api/tenants/${tenant_id}/models/${model_id}/examples`,
      );

      return data;
    },
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ExamplesTable: FC<{
  data: {
    example_id: number;
    model_id: number;
    tenant_id: number;
    author_id?: number;
    text: string;
    label: "spam" | "ham";
    updated_at: Date;
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
              <Trans t={t}>Text</Trans>
            </Th>
            <Th>
              <Trans t={t}>Label</Trans>
            </Th>
            <Th>
              <Trans t={t}>Updated at</Trans>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map(
              ({
                example_id,
                tenant_id,
                author_id,
                text,
                label,
                updated_at,
              }) => (
                <Tr key={`${example_id}/${tenant_id}`}>
                  <Td>
                    <Radio {...getRowRadioProps(example_id, tenant_id)} />
                  </Td>
                  <Td>
                    <Tag variant="outline">
                      <pre>{example_id}</pre>
                    </Tag>
                  </Td>
                  <Td>
                    {author_id && (
                      <Tag variant="outline">
                        <pre>{author_id}</pre>
                      </Tag>
                    )}
                  </Td>
                  <Td>
                    <pre>{text}</pre>
                  </Td>
                  <Td>
                    <Tag variant="outline">
                      <pre>{label}</pre>
                    </Tag>
                  </Td>
                  <Td>
                    <pre>{format(updated_at, "d.L.u k:m:s:S")}</pre>
                  </Td>
                </Tr>
              ),
            )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default function Examples() {
  const { query } = useRouter();
  const tenant_id = Number(query.tenant_id);
  const model_id = Number(query.model_id);
  const apiClient = useApiClient();
  const { data } = useQuery(
    [tenant_id, "models", model_id, "examples"],
    async () => {
      const { data } = await apiClient.get(
        `/api/tenants/${tenant_id}/models/${model_id}/examples`,
      );

      return data;
    },
  );

  return (
    <ConsoleShell>
      <ExamplesTable data={data} />
    </ConsoleShell>
  );
}
