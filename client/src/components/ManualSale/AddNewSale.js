import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import AddModal from './AddModal';
import {connect} from 'react-redux'
import {getProducts} from '../../actions/manualSale'
import ProductItems from './ProductItems';
import Alert from '../Alert';
import Spinner from '../contents/Spinner';

const AddNewSale = ({getProducts, manualSale: {products, loading}}) => {
    useEffect(() => {
        getProducts()
    }, [getProducts]);
    return (
        <div>
            {loading ? (<Spinner />) :
               ( <div>
                <AddModal />
                <Alert />
                <ProductItems products={products} />
                </div>)
            }
        </div>
    )
}

AddNewSale.propTypes = {
    getProducts: PropTypes.func.isRequired,
    manualSale: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    manualSale: state.manualSale
})

export default connect(mapStateToProps, {getProducts})(AddNewSale)
