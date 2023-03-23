// import { useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import {
  Badge, Card, CardMedia, CardContent, Typography,
  // CardActions, Button
} from '@mui/material'
import './style.css'
import { v4 as uuid } from 'uuid'
const nodeWidth = 200
const leftNodeLength = 25
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
    <Badge color="error" badgeContent="!">
      <Card className={`card-node w-[${nodeWidth}px]`}>
        <CardMedia
          className="w-full h-[160px] mt-1"
          image="./factory.jpeg"
          title="node img"
        />
        <CardContent>
          <Typography variant="h5" component="div" align='center'>
            {data.label}
          </Typography>
        </CardContent>
      </Card>
      {defaultHandles.map(e => (
        <Handle
          id={e.id}
          key={e.id}
          type="source"
          position={e.position}
          isConnectable={isConnectable}
          style={e.style}
        />
      ))}
    </Badge>
  )
}

export default CardNode

