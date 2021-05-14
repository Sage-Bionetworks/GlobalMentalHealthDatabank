import React from 'react'
import { TextField } from '@material-ui/core'

export const schemaAgeVerify = {
  type: 'string',
}

export const uiSchemaAgeVerify = {
  'ui:widget': props => {
    return (
      <TextField
        type="number"
        min="0"
        variant="outlined"
        inputProps={{
          type: 'number',
          min: '0',
        }}
        placeholder="Input Age..."
        className="custom-input age"
        value={props.value}
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      />
    )
  },
}
