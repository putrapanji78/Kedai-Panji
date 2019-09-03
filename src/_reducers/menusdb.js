const initialState = {
    data: [],
    isLoading: false
  }
  
  const menusdb = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_MENUSDB':
        return {
          ...state,
          data: action.payload,
          isLoading: false
        }
      case 'GET_CATEGORIES_PENDING':
        return {
          ...state,
          isLoading: true
        }   
      default:
        return state;
    }
  }
  
  export default menusdb;