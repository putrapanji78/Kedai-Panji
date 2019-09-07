const initialState =[]
  
  const menus = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_MENUS' : 
      if(state.length==0){
        return [...state,action.payload]
      }else{
          for(var index=0; index<state.length; index++){
              if(state[index].id==action.payload.id){
                  state[index]={...state[index], qty: state[index].qty+1}
                  return state
              }
          }
          return [...state,action.payload]
      }
      
      case 'REMOVE_MENUS':
      for(var index=0; index<state.length; index++){
          if(state[index].id==action.payload){
              if(state[index].qty>1){
                  state[index]={...state[index],qty:state[index].qty-1}
                  return state
              }else{
                    return state.filter(array=>
                        array.id!=action.payload
                        )
              }
          }
        
      }
      case 'CLEAR_MENUS':
        return state=[];
      default:
        return state;
    }
  }
  
  export default menus;