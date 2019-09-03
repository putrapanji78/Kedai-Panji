export const getMenus = (menus) => {
    return {
      type: 'GET_MENUS',
      payload: {...menus,qty:1}
    }
  }
  
  export const removeMenus = (menus) => {
    return {
      type: 'REMOVE_MENUS',
      payload: menus
    }
  }