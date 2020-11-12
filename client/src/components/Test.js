import React, {useState, useCallback, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getProducts, getProduct, updateProduct, publishOrders} from '../actions/manualSale';
import Moment from 'react-moment';
import EditManualSales from './ManualSale/EditManualSales';
import DeleteButton from './ManualSale/DeleteButton';
import Spinner from './contents/Spinner';
import Button from './Button'

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'firstName', headerName: 'FIRST NAME	', width: 150 },
  { field: 'city', headerName: 'CITY', width: 100 },
  { field: 'product', headerName: 'PRODUCT SELECTED', width: 220 },
  { field: 'time', headerName: 'ORDER DATE/TIME', width: 160 },
  { field: 'click', headerName: 'CLICKED TIMES', width: 160 },
  { field: 'ignore', headerName: 'IGNORED TIMES', width: 180 },
  { field: 'action', headerName: 'ACTION', width: 270  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const Test = ({getProducts, manualSale: {loading, products}, publishOrders}) => {
    useEffect(() => {
        getProducts();
    }, [getProducts]);
    // const times = (product) => (<Moment format='MM/DD/YYYY  h:mm A'>{product.order}</Moment>)
    

    const rows = [];
    products.map((product, index) => {
        return rows.push({
            id: index,
            firstName: product.lastName,
            city: product.city,
            product: product.product, 
            time: product.order.slice(0, 10),
            click: 0, 
            ignore: 0, 
            action : <Button product={product} />
        })
    })

  return (
      <div>
          {loading ? (<Spinner />) : 
          (  <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
            </div>)
          }
      </div>
  );
}

Test.propTypes = {
    getProducts: PropTypes.func.isRequired,
    manualSale: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    publishOrders: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    manualSale: state.manualSale
})

export default connect(mapStateToProps, {getProducts, getProduct, updateProduct, publishOrders})(Test)