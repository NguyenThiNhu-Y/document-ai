import axios from '@/api/axios'
import { MindMapRequest, NodesMindMapResponse } from './mindmapAPI.types'

export const getMindMaps = async (params: MindMapRequest) => {
  const result: NodesMindMapResponse = await axios.get('/get_mindmap', { params })
  return result
}
