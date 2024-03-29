import React from 'react'
import { ReactComponent as ArrowButtonLeft } from '../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../assets/arrow_button_right.svg'

type Props = {
  preventBack?: boolean
  onNext?: any
  onBack?: () => void
}

function NavigationArrows({ preventBack, onNext, onBack }: Props) {
  return (
    <div className="arrow-buttons-wrapper">
      <ArrowButtonLeft
        style={{
          visibility: preventBack ? 'hidden' : 'visible',
          cursor: 'pointer',
        }}
        onClick={onBack}
      />
      <ArrowButtonRight onClick={onNext} style={{ cursor: 'pointer' }} />
    </div>
  )
}

export default NavigationArrows
