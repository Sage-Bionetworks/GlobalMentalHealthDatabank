import React, { FC, useCallback } from 'react'
import update from 'immutability-helper'
import { Card } from './Card'

export interface Item {
  id: number
  title: string
  text: string
}

export interface ContainerState {
  cards: Item[]
}

export const Container: FC<any> = (params: any) => {
  const { data, setData } = params
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = data[dragIndex]
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [data, setData],
  )

  const renderCard = (
    card: { id: number; title: string; text: string },
    index: number,
  ) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        title={card.title}
        text={card.text}
        moveCard={moveCard}
      />
    )
  }

  return (
    <>
      <div>{data.map((card: Item, i: number) => renderCard(card, i))}</div>
    </>
  )
}
