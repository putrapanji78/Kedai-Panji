export const getMenusDb = (menus) => {
    return {
      type: 'GET_MENUSDB',
      payload: menus
    }
  }
  
  export const getCategoriesPending = () => {
    return {
      type: 'GET_CATEGORIES_PENDING'
    }
  }