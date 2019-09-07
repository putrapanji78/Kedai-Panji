export const getOrders = (orders) => {
    return {
      type: 'GET_ORDERS',
      payload: orders
    }
  }
  
  export const getOrdersPending = () => {
    return {
      type: 'GET_ORDERS_PENDING'
    }
  }
  export const clearOrders = () => {
    return {
      type: 'CLEAR_ORDERS'
    }
  }