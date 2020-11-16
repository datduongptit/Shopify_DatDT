import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  PUBLISH_PRODUCT
} from '../constants/constants'

// Get all product
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/notification_manual_sales');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    })
    // dispatch(setAlert('Update the product success', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// publish
export const publishOrders = (id, value) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.put(`/api/notification_manual_sales/publish_status/${id}`, value, config);
    dispatch({
      type: PUBLISH_PRODUCT,
      payload: res.data,
    })
    dispatch(setAlert('Change publish the product successful', 'success'));

  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add product
export const addProduct = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post('/api/notification_manual_sales', formData, config)

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    })

    dispatch(setAlert('Product Created', 'success'));
  } catch (err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
}

// Get product by params id
export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notification_manual_sales/${id}`)

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    })
    dispatch(setAlert('Reset the statistic successful', 'success'))
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Update product
export const updateProduct = (id, formData) => async (dispatch) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.put(`/api/notification_manual_sales/${id}`, formData, config);
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data
    })
    dispatch(setAlert('Update the product success', 'success'))
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/notification_manual_sales/${id}`)

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    })

    dispatch(setAlert('Remove product successful', 'success'))
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
