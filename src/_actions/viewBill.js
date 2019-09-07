export const getBill = (bill) => {
    return {
      type: 'GET_BILL',
      payload: {...bill}
    }
  }
  
  export const getBillPending = () => {
    return {
      type: 'GET_BILL_PENDING'
    }
  }
  export const clearBill = () => {
    return {
      type: 'CLEAR_BILL'
    }
  }