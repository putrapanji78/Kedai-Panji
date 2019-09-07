const initialState = []
  
  const orders = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ORDERS':
        return state=action.payload
      case 'GET_ORDERS_PENDING':
        return {
          ...state
        }  
        case 'CLEAR_ORDERS':
        return state=[]; 
      default:
        return state;
    }
  }
  
  export default orders;