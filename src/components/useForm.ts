import { useState, useEffect, useCallback } from 'react'

function useForm(
  stateSchema: any,
  validationSchema: any = {},
  callback: Function,
) {
  const [state, setState] = useState(stateSchema)
  const [disable, setDisable] = useState(true)
  const [isDirty, setIsDirty] = useState(false)

  // Disable button in initial render.
  useEffect(() => {
    setDisable(true)
  }, [])

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isDirty])

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required
      const stateValue = state[key].value // state value
      const stateError = state[key].error // state error

      return (isInputFieldRequired && !stateValue) || stateError
    })

    return hasErrorInState
  }, [state, validationSchema])

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    event => {
      setIsDirty(true)
      let name: any
      let value: any
      try {
        name = event.target.name
        value = event.target.value
      } catch (e) {
        setState((prevState: any) => ({
          ...prevState,
          [name]: { value, error },
        }))
      }

      let error = ''
      if (validationSchema[name].required) {
        if (!value) {
          error = 'This is required field.'
        }
      }

      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === 'object'
      ) {
        if (validationSchema[name].validator.regEx !== undefined) {
          if (value && !validationSchema[name].validator.regEx.test(value)) {
            error = validationSchema[name].validator.error
          }
        }

        if (validationSchema[name].validator.fn !== undefined) {
          if (value && !validationSchema[name].validator.fn(value)) {
            error = validationSchema[name].validator.error
          }
        }
      }

      setState((prevState: any) => ({
        ...prevState,
        [name]: { value, error },
      }))
    },
    [validationSchema],
  )

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault()

      // Make sure that validateState returns false
      // Before calling the submit callback function
      if (!validateState()) {
        callback(state)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  )

  return { state, disable, handleOnChange, handleOnSubmit }
}

export default useForm
