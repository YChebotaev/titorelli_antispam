import type { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading,
  Link,
} from "@chakra-ui/react";
import { GetStaticProps } from "next/types";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "next-i18next";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { AuthShell } from "../components";

type FormValues = {
  login: string;
  password: string;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const RestoreForm: FC = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    getFieldState,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const handleValid = async (formValues: FormValues) => {
    await signIn("credentials", {
      ...formValues,
      callbackUrl: "/",
    });
  };

  const handleInvalid = () => {};

  return (
    <chakra.div
      sx={{
        display: "flex",
        flexFlow: "column",
        gap: "1rem",
        flexBasis: "300px",
      }}
    >
      <Heading as="h3">
        <Trans t={t}>Restore account</Trans>
      </Heading>
      <chakra.div
        sx={{
          padding: "1rem 1rem",
          boxShadow: "0 3px 6px -3px #0000005c",
          borderRadius: "6px",
          border: "1px solid #00000012",
        }}
      >
        <chakra.form onSubmit={handleSubmit(handleValid, handleInvalid)}>
          <chakra.div sx={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
            <FormControl isInvalid={Boolean(getFieldState("login").error)}>
              <FormLabel>
                <Trans t={t}>Login or email</Trans>
              </FormLabel>
              <Input
                isDisabled={isSubmitting}
                placeholder={t("Login or email")}
                {...register("login", { required: t("This is required") })}
              />
              <FormErrorMessage>
                <Trans t={t}>{getFieldState("login").error}</Trans>
              </FormErrorMessage>
            </FormControl>
          </chakra.div>
          <chakra.div sx={{ display: "flex", gap: "1rem" }}>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              <Trans t={t}>Submit</Trans>
            </Button>
          </chakra.div>
        </chakra.form>
      </chakra.div>
      <chakra.div sx={{ paddingLeft: "1rem" }}>
        <Link as={NextLink} href="/forgot">
          <Trans t={t}>Forgot password?</Trans>
        </Link>
      </chakra.div>
    </chakra.div>
  );
};

export default function Restore() {
  return (
    <AuthShell>
      <RestoreForm />
    </AuthShell>
  );
}

Restore.protected = false
