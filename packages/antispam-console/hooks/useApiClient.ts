import { useMemo } from 'react'
import { createApiClient } from '../lib/createApiClient'

export const useApiClient = () => {
  const apiClient = useMemo(createApiClient, [])

  return apiClient
}
