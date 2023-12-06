import React, { useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  Controls,
  OnConnectEnd,
  OnConnectStart,
  Panel,
  useStoreApi,
  Node,
  useReactFlow,
  NodeOrigin,
  ConnectionLineType,
  Edge,
} from 'reactflow'

import styled from '@emotion/styled'

import useStore from './store'
import MindMapNode from './components/MindMapNode'
import MindMapEdge from './components/MindMapEdge'

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css'
import { useParams } from 'react-router-dom'
import { useMindMap } from '@/api/mindmapAPI/mindmapAPI.hooks'
import { type } from 'os'

const nodeTypes = {
  mindmap: MindMapNode,
}

const edgeTypes = {
  mindmap: MindMapEdge,
}

const nodeOrigin: NodeOrigin = [0.5, 0.5]
const connectionLineStyle = { strokeWidth: 1 }
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' }

function Flow() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode, initNodes } = useStore()
  const connectingNodeId = useRef<string | null>(null)
  const store = useStoreApi()
  const { project, fitView } = useReactFlow()

  const getChildNodePosition = (event: MouseEvent, parentNode?: Node) => {
    const { domNode } = store.getState()

    if (
      !domNode ||
      // we need to check if these properites exist, because when a node is not initialized yet,
      // it doesn't have a positionAbsolute nor a width or height
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return
    }

    const { top, left } = domNode.getBoundingClientRect()

    // we need to remove the wrapper bounds, in order to get the correct mouse position
    const panePosition = project({
      x: event.clientX - left,
      y: event.clientY - top,
    })

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
    }
  }

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId
  }, [])

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState()
      const targetIsPane = (event.target as Element).classList.contains('react-flow__pane')
      const node = (event.target as Element).closest('.react-flow__node')

      if (node) {
        node.querySelector('input')?.focus({ preventScroll: true })
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current)
        const childNodePosition = getChildNodePosition(event as MouseEvent, parentNode)

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition)
        }
      }
    },
    [getChildNodePosition]
  )

  const { iddocument = -1 } = useParams()
  const { data } = useMindMap({ iddocument: +iddocument })

  useEffect(() => {
    if (!data) return

    const nodes = [
      // {
      //   id: String(data?.iddocument),
      //   type: data?.node_root.type,
      //   data: { label: data?.node_root.data },
      //   position: {
      //     x: 0,
      //     y: 0,
      //   },
      // },
      data.node_root,
      ...data.node_items,
    ]

    const edges: Edge[] = data.edges
    console.log('nodes', nodes)
    initNodes(nodes, edges)
  }, [data])

  // useEffect(() => {
  //   const nodes = [
  //     {
  //       id: 'root',
  //       type: 'input',
  //       data: { label: String(iddocument) },
  //       position: { x: 0, y: 0 },
  //     },
  //     {
  //       id: 'children',
  //       type: 'mindmap',
  //       data: { label: String(iddocument) },
  //       position: { x: 200, y: 200 },
  //       parentNode: 'root',
  //     },
  //   ]

  //   const edges = [
  //     {
  //       id: 'edgeId',
  //       source: 'root',
  //       target: 'children',
  //     },
  //   ]
  //   initNodes(nodes, edges)
  // }, [])

  return (
    <ReactFlowStyled
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position='top-left'>{data?.name_document}</Panel>
    </ReactFlowStyled>
  )
}

const ReactFlowStyled = styled(ReactFlow)((props) => ({
  backgroundColor: props.theme.colors.gray3,
}))

export default Flow
