import { Edge, Node } from 'reactflow'

export interface MindMapRequest {
  iddocument: number
}

export interface PositionNode {
  x: number
  y: number
}
// export interface Node {
//   id: number
//   type: string
//   data: string
//   position: PositionNode
// }

// export interface NodeItem extends Node {
//   parentNode: number
// }

export interface NodesMindMapResponse {
  iddocument: number
  name_document: string
  node_root: Node
  node_items: Node[]
  edges: Edge[]
}
