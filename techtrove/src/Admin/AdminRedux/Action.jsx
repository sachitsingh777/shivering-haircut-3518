import axios from 'axios'
import { ADMIN_DELETE_PRODUCT, ADMIN_FAILURE, ADMIN_FILTER_PRODUCT, ADMIN_GET_PRODUCT, ADMIN_PATCH_PRODUCT, ADMIN_POST_PRODUCT, ADMIN_REQUEST, GET_ORDER_DATA, GET_USER_DATA, POST_USER_DATA } from './ActionType'



export const AdminGetProduct = (value,paramObj) => (dispatch) => {
    dispatch({ type: ADMIN_REQUEST })
     axios.get(`https://json-server-bestbuy.onrender.com/products?q=${value}`,paramObj)
     .then(res=>dispatch({ type: ADMIN_GET_PRODUCT, payload: res.data }))
    .catch( error=>dispatch({ type:ADMIN_FAILURE }))
         
}


export const AdminDeleteProduct = (id) => (dispatch) => {
    axios.delete(`https://json-server-bestbuy.onrender.com/${id}`)
      .then((res) => {
        dispatch({ type: ADMIN_DELETE_PRODUCT, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: ADMIN_FAILURE, payload: error });
      });
  };
export const AdminUpdateProduct = (id, updateData) => (dispatch) => {
    axios.patch(`https://json-server-bestbuy.onrender.com/products/${id}`,updateData)
        .then(res => {
            if (res.data) {
                dispatch({ type:ADMIN_PATCH_PRODUCT, payload: res.data })
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const AddProduct = (details) => (dispatch) => {
    axios.post(`https://json-server-bestbuy.onrender.com/products`, details)
        .then(res => {
            if (res.data) {
                dispatch({ type:ADMIN_POST_PRODUCT, payload: res.data })
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const GetUserData = () => (dispatch) => {
    dispatch({ type: ADMIN_REQUEST })
    axios.get(`https://63f5d74059c944921f678f16.mockapi.io/UserData`)
        .then(res => {
            dispatch({ type: GET_USER_DATA, payload: res.data })
        })
        .catch(error => {
            dispatch({ type: ADMIN_FAILURE })
        })
}

export const PostUserData = (details) => (dispatch) => {
    axios.post(`https://63f5d74059c944921f678f16.mockapi.io/UserData/`, details)
        .then(res => {
            if (res.data) {
                dispatch({ type: POST_USER_DATA, payload: res.data })
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const GetOrdersData = () => (dispatch) => {
    dispatch({ type:ADMIN_REQUEST })
    axios.get(`https://63f5d74059c944921f678f16.mockapi.io/OrderData`)
        .then(res => {
            dispatch({ type: GET_ORDER_DATA, payload: res.data })
        })
        .catch(error => {
            dispatch({ type: ADMIN_FAILURE })
        })
}

export const PostOrdersData = (details) => (dispatch) => {
    axios.post(`https://63f5d74059c944921f678f16.mockapi.io/OrderData`, details)
        .then(res => {
            if (res.data) {
                dispatch({ type: types.POSTORDERSDATA, payload: res.data })
            }
        })
        .catch(error => {
            console.log(error)
        })
}