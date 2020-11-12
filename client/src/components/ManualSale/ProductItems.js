import React, {useEffect} from 'react';
import { Card, DataTable} from '@shopify/polaris';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getProducts, getProduct, updateProduct, publishOrders} from '../../actions/manualSale';
import Moment from 'react-moment';
import EditManualSales from './EditManualSales';
import DeleteButton from './DeleteButton';
import Spinner from '../contents/Spinner';

const ProductItems = ({getProducts, getProduct, products, manualSale: { loading}, publishOrders}) => {
    useEffect(() => {
        getProducts();
    }, [getProducts]);
    const rows = [];
    products.map((product) => {
    return rows.push([
        product.lastName,
        product.city,
        product.product,
        <Moment format='MM/DD/YYYY  h:mm A'>{product.order}</Moment>,
        0,
        0,
        <div style={{display:'flex', padding: 0}}> 
            <div>
                <div style={{padding: '0 5px 5px 0'}}><button className= {product.publishOrder === 1 ? 'btn btn-success' : 'btn btn-edit'} onClick={ () => { publishOrders(product.id, {publishOrder: Math.abs(1-product.publishOrder)}); getProducts()}} >{product.publishOrder === 1 ? (<span style={{fontSize: '12px'}}>Unpublish</span>) : (<span>Publish</span>)}</button></div> 
                <div><EditManualSales products={product} /><span onClick={() => getProduct(product._id)}></span></div>
            </div>
            <div>
                <div style={{padding: '0 5px 5px 0'}}><DeleteButton id={product.id} /></div>
                <button className="btn btn-light" onClick={() => getProduct(product._id)}><span>Reset</span></button> 
            </div> 
        </div>
    ])
    })

    return (
        <>
        {loading ? (
            <Spinner /> 
            ) : (
            <Card>
                <DataTable
                columnContentTypes={[
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                ]}
                headings={[
                    'FIRST NAME',
                    'CITY',
                    'PRODUCT SELECTED',
                    'ORDER DATE/TIME',
                    'CLICKED TIMES',
                    'IGNORED TIMES',
                    'ACTION',
                ]}
                rows={rows}
                />
                
            </Card>           
            )}
        </>
    )
}

ProductItems.propTypes = {
    getProducts: PropTypes.func.isRequired,
    manualSale: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    publishOrders: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    manualSale: state.manualSale
})

export default connect(mapStateToProps, {getProducts, getProduct, updateProduct, publishOrders})(ProductItems)
