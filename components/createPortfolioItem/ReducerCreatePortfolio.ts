
import {useReducer} from 'react';


type State = {
    initalState: object;
  }

  type Actions = 
    | {
      type: 'setState',
      payload: {
      field: string
      value: string | number 
    }

    }
    | {
      type: 'reset'
      payload: initialState
      
    }

    type initialState = {
        rooms: number | string,
        size: number | string,
        rent: number | string,
        contract: string,
        
      }

      export const initialState = {
        rooms: "",
        size: "",
        rent: "",
        contract: "",
        
      }


function init(initialState: any) {
    return initialState;
  }
  

function reducer(state: State, action: Actions) {
    switch (action.type) {
      case 'setState':
        return {
          ...state,
          [action.payload.field]: action.payload.value
      }
      case 'reset':
        return init(action.payload);
      default:
        throw new Error();
    }
  }


  export const usePortfolioFormReducer = () => {
    return useReducer(reducer, initialState, init);
  };