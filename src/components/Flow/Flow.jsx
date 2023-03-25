import { v4 as uid } from 'uuid'

import { useState, useCallback } from 'react'
import ReactFlow, {
  isEdge as isEdgeTarget,
  addEdge, Panel, Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges,
  ReactFlowProvider, useReactFlow,
  ConnectionMode
} from 'reactflow'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ModifySideBar from './components/ModifySideBar'
import Dialog from './components/Dialog'

import { nodes as defaultNodes, edges as defaultEdges, nodeTypes, edgeOptions, connectionLineStyle } from './initState.js'
import { getNodeStyle } from './utils'

import 'reactflow/dist/style.css'
import './flow.css'


function Flow ({
  nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, clickTarget
}) {

  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [isEdge, setIsEdge] = useState(false)
  const reactFlow = useReactFlow();

  const createNode = useCallback((type, name) => {
    const maxX = Math.max(...nodes.map(e => e.position.x), 0)
    const maxY = Math.max(...nodes.map(e => e.position.y), 0)
    const addX = 180
    const newNode = {
      id: uid(),
      position: {
        x: maxX + addX,
        y: maxY,
      },
      data: {
        label: name,
        type
      },
      style: getNodeStyle(type),
      type: 'card'
    }
    setNodes((nds) => nds.concat(newNode))
  }, [nodes])
  const createEdge = useCallback((sourceId, targetId, name) => {
    // console.log(sourceId, targetId, name)
    const newEdge = {
      id: uid(), source: sourceId, target: targetId, label: name || ''
    }
    setEdges((egs) => egs.concat(newEdge))
  }, [])

  const openCreateModal = useCallback((nodeType) => {
    setOpen(() => true)
    setIsEdge(() => true)

    if (nodeType) {
      setIsEdge(() => false)
      setType((ov) => nodeType)
      return
    }
  }, [])
  const onNodeClick = (evt, node) => {
    console.log(node)
    clickTarget(node)
  }
  const onEdgeClick = (evt, edge) => {
    console.log(edge)
    clickTarget(edge)
  }
  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      className="transition"
      style={{
        backgroundColor: '#fff',
      }}
      defaultEdgeOptions={edgeOptions}
      connectionLineStyle={connectionLineStyle}
    >
      <Controls />
      {/* <MiniMap zoomable pannable /> */}
      <Background />
      <Panel>
        <Stack spacing={2} direction="row">
          <Button
            size="small"
            variant="contained" onClick={() => openCreateModal('todo')} >
            + todo node
          </Button>
          <Button
            variant="contained" onClick={() => openCreateModal('progress')}>
            + progress node
          </Button>
          <Button size="small"
            variant="contained" onClick={() => openCreateModal('done')}>
            + done node
          </Button>
          <Button size="small"
            variant="contained" onClick={() => openCreateModal()}>
            + edges
          </Button>
        </Stack>
      </Panel>
      <Dialog
        open={open}
        setOpen={setOpen}
        type={type}
        nodes={nodes}
        isEdge={isEdge}
        createNode={createNode}
        createEdge={createEdge}
      />
    </ReactFlow>
  )
}

export default function () {
  const [nodes, setNodes] = useState(
    defaultNodes.map(e => ({
      ...e, style: getNodeStyle(e.data.type)
    })))
  const [edges, setEdges] = useState(defaultEdges)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds))
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds))
  )
  const onConnect = useCallback(
    (connection) => {
      const res = prompt('連接名稱(可略過)', '')
      console.log(connection)
      if (res == null) return
      return setEdges((eds) => addEdge({ ...connection, label: res }, eds))
    },
    [setEdges]
  )

  const [target, setTarget] = useState()
  const modify = (target, payload) => {
    const { id } = target
    const { name: newName } = payload
    const isNode = !!nodes.find(e => e.id === id)
    if (isNode) {
      if (newName === '' || newName == null) return
      setNodes(
        (nds) => {
          const res = nds.map(e => ({
            ...e,
            data: {
              ...e.data,
              label: e.id === id ? newName : e.data.label
            }
          }))
          return res
        }
      )
      setTarget(() => null)
    }
    setEdges((edg) => edg.map(e => ({
      ...e,
      label: e.id === id ? newName : e.label
    })))

  }
  const remove = (target) => {
    const { id } = target
    const isNode = !!nodes.find(e => e.id === id)
    if (isNode) {
      setNodes((nds) => nds.filter(e => e.id !== id))
      setTarget(() => null)
      return
    }
    setEdges((edg) => edg.filter(e => e.id !== id))
    setTarget(() => null)
  }
  return (
    <>
      <Stack
        direction="row"
        style={{ width: '100vw', height: '100vh' }}>
        <ReactFlowProvider>
          <Flow
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            clickTarget={(node) => setTarget(() => node)}
          />
        </ReactFlowProvider>
        <ModifySideBar
          isEdgeTarget={isEdgeTarget}
          target={target}
          modify={modify}
          remove={remove}
          setTarget={setTarget}
        />
      </Stack>
    </>
  );
}