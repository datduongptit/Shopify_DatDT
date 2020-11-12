import React from 'react'
import EditManualSales from './ManualSale/EditManualSales';
import DeleteButton from './ManualSale/DeleteButton';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getProducts, getProduct, updateProduct, publishOrders} from '../actions/manualSale';
const Button = ({product, getProducts, publishOrders}) => {
    return (
        <div>
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
        </div>
    )
}

Button.propTypes = {
    getProducts: PropTypes.func.isRequired,
    manualSale: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    publishOrders: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    manualSale: state.manualSale
})

export default connect(mapStateToProps, {getProducts, getProduct, updateProduct, publishOrders})(Button)

