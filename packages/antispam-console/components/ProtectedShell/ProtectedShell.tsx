import { useRef } from "react";
import {
  chakra,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation, Trans } from "react-i18next";
import { useSession } from "next-auth/react";
import type { FC, ReactNode } from "react";

export const ProtectedShell: FC<{
  isDisabled: boolean;
  children: ReactNode;
}> = ({ isDisabled, children }) => {
  const { t } = useTranslation();
  const { status } = useSession({ required: !isDisabled });
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = useRef<any>();

  if (status === "authenticated" || status === "loading" || isDisabled)
    return <>{children}</>;

  return (
    <chakra.div>
      {children}
      <AlertDialog
        isCentered
        isOpen={isOpen}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            <Trans t={t}>You need to be signed-in</Trans>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Trans t={t}>Proceed to sign-in screen?</Trans>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              as={NextLink}
              href="/signin"
              colorScheme="green"
              ml={3}
              onClick={() => onClose()}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </chakra.div>
  );
};
