import React from 'react'

export const createCustomRadio = (correctAnswer: any, userSelection: any) => {
  return ({ options, onChange }: any) => {
    const { enumOptions } = options
    const _onChange = (event: any) => onChange(event.currentTarget.id)
    return enumOptions.map((option: any, index: number) => {
      return (
        <div
          className={
            'quiz-radio-wrapper ' +
            (option.value === correctAnswer ? 'radio correct' : '')
          }
          key={`quiz-radio-wrapper-${index}`}
        >
          <input
            type="radio"
            id={option.value}
            checked={
              option.value === userSelection || option.value === correctAnswer
                ? true
                : false
            }
            onChange={_onChange as any}
          />
          <div
            id={`label-${option.value}`}
            dangerouslySetInnerHTML={{ __html: option.label }}
            className={
              'radio-button-label' +
              (option.value === userSelection && option.value !== correctAnswer
                ? ' error-message wrong-opt'
                : ' correct-opt')
            }
          />
        </div>
      )
    })
  }
}
