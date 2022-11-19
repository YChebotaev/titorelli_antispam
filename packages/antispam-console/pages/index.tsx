import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next/types";
import { Container } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from "react-query";
import { ConsoleShell } from "../components";
import { createApiClient } from '../lib/createApiClient'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const apiClient = createApiClient();
  const queryClient = new QueryClient();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  return (
    <ConsoleShell>
      <Container>

      </Container>
    </ConsoleShell>
  );
}
