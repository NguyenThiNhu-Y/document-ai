import { useQuery } from '@tanstack/react-query'
import { MindMapRequest } from './mindmapAPI.types'
import { getMindMaps } from './mindmapAPI.api'

export const useMindMap = (params: MindMapRequest) => {
  return useQuery({
    queryKey: ['getMindMaps', params],
    queryFn: () => getMindMaps(params),
  })
}
