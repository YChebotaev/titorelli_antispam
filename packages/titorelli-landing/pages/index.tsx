import type { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next/types";
import { chakra, Heading } from "@chakra-ui/react";
import { useTranslation, Trans } from "react-i18next";

import { TopBar, HeroUnit, TestSection } from '../components'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

// const getPitch = (pitchId?: number) => {
//   switch (pitchId) {
//     case 0:
//       return "без каптчи";
//     case 1:
//       return "который только чистит спам";
//     case 2:
//       return (
//         <>
//           который чистит <u>только</u> спам
//         </>
//       );
//     case 3:
//       return "который учится";
//     case 4:
//       return "который учится на своих ошибках";
//     case 5:
//       return "для малых групп";
//     case 5:
//       return "до 5 00 участников";
//     case 6:
//       return "до 1 000 участников";
//     case 7:
//       return "до 2 000 участников";
//     case 8:
//       return "на машинлернинге";
//     case 9:
//       return "с машинлернингом";
//     case 10:
//       return "учитывающий мнение участников";
//     case 11:
//       return "который переспрашивает";
//     default:
//       return null;
//   }
// };

// const HeroUnit: FC<{ pitchId?: number }> = ({ pitchId }) => {
//   const { t } = useTranslation();

//   return (
//     <chakra.section
//       display="flex"
//       flexFlow="column"
//       alignItems="center"
//       justifyContent="space-evenly"
//       minHeight="100vh"
//       backgroundColor="#6667AB"
//     >
//       <Heading size="4xl" textAlign="center" color="white" maxW="90vw">
//         <Trans t={t}>
//           Спам-фильтр для&nbsp;публичных групп в&nbsp;Телеграмме
//         </Trans>
//         {Boolean(getPitch(pitchId)) ? (
//           <>
//             , <Trans>{getPitch(pitchId)}</Trans>
//           </>
//         ) : (
//           ""
//         )}
//       </Heading>
//     </chakra.section>
//   );
// };

// const ExamplesBlock: FC = () => {
//   const { t } = useTranslation();

//   return (
//     <chakra.section display="flex" flexFlow="column" alignItems="center">
//       <Heading size="3xl" paddingY={12}>
//         <Trans t={t}>Примеры работы</Trans>
//       </Heading>
//       <chakra.div display="grid" gridTemplateColumns="1fr 1fr">
//         <chakra.div>
//           <chakra.img src="/examples/example-1.jpg" alt="" />
//         </chakra.div>
//         <chakra.div>
//           <chakra.div
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             height="100%"
//             paddingX="20"
//             fontSize="4xl"
//           >
//             <Trans t={t}>
//               Бот видит сообщение и сверяет его с базой подобных сообщений
//             </Trans>
//           </chakra.div>
//         </chakra.div>
//       </chakra.div>
//       <chakra.div display="grid" gridTemplateColumns="1fr 1fr">
//         <chakra.div>
//           <chakra.div
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             height="100%"
//             paddingX="20"
//             fontSize="4xl"
//           >
//             <Trans t={t}>
//               Если бот не уверен, что сообщение — именно спам, переспрашивает у
//               аудитории
//             </Trans>
//           </chakra.div>
//         </chakra.div>
//         <chakra.div>
//           <chakra.img src="/examples/example-2.jpg" alt="" />
//         </chakra.div>
//       </chakra.div>
//     </chakra.section>
//   );
// };

// const Promises: FC = () => {
//   const { t } = useTranslation();

//   return (
//     <chakra.section display="flex" flexFlow="column" alignItems="center">
//       <Heading size="3xl" paddingY={12}>
//         <Trans t={t}>Как начать?</Trans>
//       </Heading>
//       <chakra.div display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="4">
//         <chakra.div>
//           <chakra.div
//             display="flex"
//             flexFlow="column"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Heading padding="4">Шаг 1</Heading>
//             <chakra.figure>
//               <chakra.img src="/examples/instruction-1.png" alt="" maxH="600" />
//               <chakra.figcaption textAlign="center" padding="4" fontSize="2xl">
//                 Добавьте бота в группу
//               </chakra.figcaption>
//             </chakra.figure>
//           </chakra.div>
//         </chakra.div>
//         <chakra.div>
//           <chakra.div
//             display="flex"
//             flexFlow="column"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Heading padding="4">Шаг 2</Heading>
//             <chakra.figure>
//               <chakra.img src="/examples/instruction-2.png" alt="" maxH="600" />
//               <chakra.figcaption textAlign="center" padding="4" fontSize="2xl">
//                 Сделайте бота администратором
//               </chakra.figcaption>
//             </chakra.figure>
//           </chakra.div>
//         </chakra.div>
//         <chakra.div>
//           <chakra.div
//             display="flex"
//             flexFlow="column"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Heading padding="4">Шаг 2</Heading>
//             <chakra.figure>
//               <chakra.img src="/examples/instruction-3.png" alt="" maxH="600" />
//               <chakra.figcaption textAlign="center" padding="4" fontSize="2xl">
//                 Перейдите в <chakra.a href="#" textDecor="underline">панель управления</chakra.a>,
//                 чтобы уточнить настройки при необходимости
//               </chakra.figcaption>
//             </chakra.figure>
//           </chakra.div>
//         </chakra.div>
//       </chakra.div>
//     </chakra.section>
//   );
// };

export default function Home() {
  return (
    <chakra.div>
      <TopBar />
      <HeroUnit />
      <TestSection />
    </chakra.div>
  )

  // return (
  //   <chakra.div>
  //     <HeroUnit pitchId={11} />
  //     <ExamplesBlock />
  //     <Promises />
  //   </chakra.div>
  // );
}
