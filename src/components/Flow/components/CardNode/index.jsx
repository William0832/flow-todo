// import { useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import {
  Box
  // CardActions, Button
} from '@mui/material'

import './style.css'
import { v4 as uuid } from 'uuid'
const nodeWidth = 125
const nodeHeight = 40
const leftNodeLength = 20
const rightNodeLength = nodeWidth - leftNodeLength
const defaultHandles = [
  { id: uuid(), position: Position.Top, style: { left: leftNodeLength } },
  { id: uuid(), position: Position.Top },
  { id: uuid(), position: Position.Top, style: { left: rightNodeLength } },
  { id: uuid(), position: Position.Left },
  { id: uuid(), position: Position.Right },
  { id: uuid(), position: Position.Bottom, style: { left: leftNodeLength } },
  { id: uuid(), position: Position.Bottom },
  { id: uuid(), position: Position.Bottom, style: { left: rightNodeLength } }
]

function CardNode ({ data, isConnectable }) {
  return (
    <>
      <Box
        width={`${nodeWidth}px`}
        height={`${nodeHeight}px`}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {data.label}
      </Box>
      {
        defaultHandles.map(e => (
          <Handle
            id={e.id}
            key={e.id}
            type="source"
            position={e.position}
            isConnectable={isConnectable}
            style={e.style}
          />
        ))
      }
    </>)
}

export default CardNode

