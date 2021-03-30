import React from 'react'
import { default as Form } from 'react-jsonschema-form'
import Button from '@material-ui/core/Button'

export type FormSchema = {
  properties?: any
  definitions?: any
}

const schema = {
  type: 'object',
  properties: {
    country_chooser: {
      title: ' ',
      type: 'object',
      properties: {
        your_country: {
          type: 'string',
          title: ' ',
          enum: ['UK', 'India', 'South Africa', 'Other'],
        },
      },
    },
  },
}

const uiSchema = {
  country_chooser: {
    your_country: {
      'ui:widget': 'radio',
    },
  },
}

export default function SageForm({ formId, onSubmit }: any) {
  const getSchemaFromId = (id: string) => {
    if (id === 'countrySelector') return schema
    return null
  }

  const getUISchemaFromId = (id: string) => {
    if (id === 'countrySelector') return uiSchema
    return null
  }

  return (
    <div className="sageForm">
      <Form
        onSubmit={onSubmit}
        schema={getSchemaFromId(formId) as FormSchema}
        uiSchema={getUISchemaFromId(formId) as FormSchema}
      >
        <div className="text-center">
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            className="wideButton"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}
