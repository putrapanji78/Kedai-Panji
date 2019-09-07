const initialState = []
  
  const bill = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_BILL':
        return [...state,action.payload]
      case 'GET_BILL_PENDING':
        return {
          ...state
        }  
        case 'CLEAR_BILL':
        return state=[]; 
      default:
        return state;
    }
  }
  
  export default bill;