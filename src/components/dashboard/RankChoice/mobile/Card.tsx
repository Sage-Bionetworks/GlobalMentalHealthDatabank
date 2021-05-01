import React from 'react'
import { ReactComponent as ArrowUp } from '../../../../assets/arrowUp.svg'
import { ReactComponent as ArrowDown } from '../../../../assets/arrowDown.svg'

type CardProps = {
  active?: boolean
  onClick?: () => void
  moveUp?: () => void
  moveDown?: () => void
  disableUp?: boolean
  disableDown?: boolean
  title?: string
  text?: string
}

function Card({
  active,
  title,
  text,
  onClick,
  moveUp,
  moveDown,
  disableUp,
  disableDown,
}: CardProps) {
  return (
    <div className={`card ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="card__content">
        <h5 className="card__content__title">{title}</h5>
        <p className="card__content__text">{text}</p>
      </div>
      <div className="card__buttons">
        <button
          className="card__button__up"
          onClick={moveUp}
          disabled={disableUp}
        >
          <ArrowUp />
        </button>
        <button
          className="card__button__down"
          onClick={moveDown}
          disabled={disableDown}
        >
          <ArrowDown />
        </button>
      </div>
    </div>
  )
}

Card.defaultProps = {
  active: false,
  onClick: () => {},
  moveUp: () => {},
  moveDown: () => {},
  disableUp: false,
  disableDown: false,
  title: '',
  text: '',
}

export default Card
