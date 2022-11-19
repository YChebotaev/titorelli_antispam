import type { FC, ReactNode } from 'react'
import { Center } from '@chakra-ui/react'

export const AuthShell: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <Center sx={{ minHeight: '100vh' }}>
      {children}
    </Center>
  )
}
