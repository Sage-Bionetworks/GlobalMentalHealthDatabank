import React from 'react'
import Collapsible from 'react-collapsible'
import { Typography } from '@material-ui/core'
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg'
import { ReactComponent as ChevronDown } from '../../assets/chevron-down.svg'

type Props = {
  children: React.ReactNode
  title: string
}

function Accordion({ children, title }: Props) {
  return (
    <Collapsible
      trigger={<Trigger title={title} />}
      triggerWhenOpen={<Trigger title={title} open />}
    >
      {children}
    </Collapsible>
  )
}

type TriggerProps = {
  title: string
  open?: boolean
}
function Trigger({ title, open }: TriggerProps) {
  return (
    <>
      {open ? (
        <ChevronDown width={12} height={14} />
      ) : (
        <ChevronRight width={14} height={12} />
      )}
      <Typography variant="h6">{title}</Typography>
    </>
  )
}

export default Accordion
