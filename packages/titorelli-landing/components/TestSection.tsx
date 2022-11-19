import type { FC } from "react";
import { chakra, Heading, Textarea, Button } from "@chakra-ui/react";
import { useTranslation, Trans } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  text: string;
};

export const TestSection: FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      text: "",
    },
  });

  const handleValid = () => {};

  return (
    <chakra.section display="flex" flexFlow="column" alignItems="center">
      <Heading paddingY={10}>
        <Trans t={t}>Проверка возможностей</Trans>
      </Heading>
      <chakra.div>
        <chakra.form onSubmit={handleSubmit(handleValid)}>
          <chakra.div>
            <Controller
              control={control}
              name="text"
              render={({ field }) => (
                <Textarea
                  {...field}
                  minW={400}
                  minH={100}
                  placeholder={String(t('Введите текст'))}
                />
              )}
            />
          </chakra.div>
          <chakra.div paddingTop={3}>
            <Button variant="outline" type="submit">
              <Trans t={t}>Проверить</Trans>
            </Button>
          </chakra.div>
        </chakra.form>
      </chakra.div>
    </chakra.section>
  );
};
