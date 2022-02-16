const [validationState, dispatchValidation] = useReducer(validationreducer, initialValidationState)


function validationreducer(validationState: ValidationState, action: Action) {
    switch (action.type) {
    case 'setValidation':
          return {
            ...validationState,
            isvalidAddress: action.payload.isValidAddress   
        }
        case 'resetValidation':
          return {
            ...validationState,
            isvalidAddress: action.payload
        }
      default:
        throw new Error();
    }
  }

  const initialValidationState = {
    isValidAddress: "Not validated"
  }

  type initialValidationState = {
    isValidAddress: boolean | string
  }


  type ValidationActions = 
  | {
    type: 'setValidation'
    payload: { isValidAddress: boolean }
    
  }
  | {
    type: 'resetValidation'
    payload: string 
    
  }

  type ValidationState = {
    initialValidationState: object
  }
  