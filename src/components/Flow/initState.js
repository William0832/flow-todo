import {
  MarkerType,
} from 'reactflow'


import CardNode from './components/CardNode/index'

export const nodeTypes = { 'card': CardNode }

export const nodes = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'start', type: 'start' },
    position: { x: 65, y: 100 },
    className: 'circle'
  },

]

export const edges = [
]

export const edgeOptions = {
  type: 'step',
  // animated: true,
  style: {
    strokeWidth: '2',
    stroke: '#ccc',
  },
  markerEnd: {
    type: MarkerType.Arrow,
    width: 20,
    height: 20,
    color: '#ccc'
  }
}

export const connectionLineStyle = { stroke: '#646cff' }


