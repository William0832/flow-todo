import TextField from '@mui/material/TextField'
import { useEffect, useState, useMemo } from 'react'
import clsx from 'clsx'
import { Stack, Button } from '@mui/material'

export default function ModifySideBar ({ target, modify, remove, setTarget, isEdgeTarget }) {
  const [isOpen, setIsOpen] = useState(true)
  const [name, setName] = useState(target?.data?.label || target?.label || '')

  const isStartNode = useMemo(() => target?.id === 'start', [target])
  const isEdge = useMemo(() =>
    !!target && isEdgeTarget(target || null)
    , [target]
  )
  const TypeName = useMemo(() =>
    isEdge ? 'Edge' : `${(target?.data?.type || '').toUpperCase()} Node`
    , [target]
  )

  useEffect(() => {
    if (!target) return
    setName(() => target?.data?.label || target?.label)
  }, [target])
  return (
    <>
      <div className={clsx('border-2 relative', {
        'w-[400px]': isOpen,
        'w-[60px]': !isOpen
      })}>
        {target ? <Stack spacing={2} className="m-2 h-full">
          <h4>{TypeName}</h4>
          <TextField
            label="name"
            id="name"
            value={name}
            disabled={isStartNode || !target}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              size="small"
              variant="contained"
              disabled={!target}
              color="inherit"
              onClick={() => setTarget(() => null)}
            >Cancel</Button>

            <Button
              size="small"
              variant="contained"
              disabled={isStartNode || !target}
              onClick={() => modify(target, { name })}
            >submit</Button>
            <Button
              size="small"
              onClick={() => remove(target)}
              variant="contained"
              color="error"
              disabled={isStartNode || !target}>remove</Button>
          </Stack>
        </Stack> : null}
      </div>
    </>
  )
}