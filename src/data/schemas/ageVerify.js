import React from 'react'
import { TextField } from '@material-ui/core'

export const schemaAgeVerify = {
  type: 'string',
}

export const uiSchemaAgeVerify = {
  'ui:widget': props => {
    return (
      <div className="btm-custom-age-form">
        <TextField
          className="custom-input age"
          variant="outlined"
          InputProps={{
            maxLength: 2,
            type: 'number',
            min: '0',
          }}
          placeholder="Input Age..."
          value={props?.value}
          onChange={event => {
            let value = event?.target?.value
            if (value.length > 2) value = value.slice(0, 2)
            props.onChange(value)
          }}
          required={props.required}
        />
      </div>
    )
  },
}
