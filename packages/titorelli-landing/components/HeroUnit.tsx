import type { FC } from "react";
import { chakra, Heading } from "@chakra-ui/react";
import { useTranslation, Trans } from "react-i18next";

const getPitch = (pitchId?: number) => {
  switch (pitchId) {
    case 0:
      return "без каптчи";
    case 1:
      return "который только чистит спам";
    case 2:
      return (
        <>
          который чистит <u>только</u> спам
        </>
      );
    case 3:
      return "который учится";
    case 4:
      return "который учится на своих ошибках";
    case 5:
      return "для малых групп";
    case 5:
      return "до 5 00 участников";
    case 6:
      return "до 1 000 участников";
    case 7:
      return "до 2 000 участников";
    case 8:
      return "на машинлернинге";
    case 9:
      return "с машинлернингом";
    case 10:
      return "учитывающий мнение участников";
    case 11:
      return "который переспрашивает";
    default:
      return null;
  }
};

export const HeroUnit: FC = () => {
  const { t } = useTranslation();

  return (
    <chakra.section
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 41px)"
      background="radial-gradient(circle, rgba(99,101,227,1) 0%, rgba(51,52,153,1) 100%)"
    >
      <chakra.div
        display="flex"
        flexFlow="column"
        alignItems="center"
        justifyContent="space-between"
        gap="30px"
      >
        <chakra.div
          width="80px"
          height="80px"
          backgroundImage={"/logo.svg"}
          backgroundSize="contain"
        />
        <Heading color="white" fontWeight="normal">
          <Trans t={t}>
            Спам-фильтр для публичных групп в Телеграмме, {getPitch(8)}
          </Trans>
        </Heading>
      </chakra.div>
    </chakra.section>
  );
};
