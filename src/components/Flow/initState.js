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
  // {
  //   id: 'node1',
  //   type: 'card',
  //   data: { label: 'node1', type: 'todo' },
  //   position: { x: 65, y: 200 },
  // },

]

export const edges = [
  // { id: 1, source: 'node1', target: 'node1' }
]

export const edgeOptions = {
  type: 'step',
  // animated: true,
  // style: {
  //   strokeWidth: '2',
  //   stroke: '#ccc',
  // },
  markerEnd: {
    type: MarkerType.Arrow,
    width: 20,
    height: 20,
    // color: '#ccc'
  }
}

export const connectionLineStyle = { stroke: '#646cff' }


