import React, { useState, useCallback } from 'react';
import { Modal } from '@shopify/polaris';
import {deleteProduct} from '../../actions/manualSale';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


const DeleteButton = ({id, deleteProduct}) => {
    const [active, setActive] = useState(false);
    const onChange = useCallback(() => setActive(!active), [active]);
    const activator = <button className="btn btn-danger" onClick={onChange}><span >Delete</span></button>
    return (
        <div>
            <Modal
                    activator={activator}
                    open={active}
                    onClose={onChange}
                    title="Are you sure want to delete this?"
                    primaryAction={{
                    content: 'Delete',
                    onAction: () => {deleteProduct(id); setActive(!active)},
                    }}
                    secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: onChange,
                    },
                    ]}
                ></Modal>
        </div>
    )
}

DeleteButton.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
}


export default connect(null, {deleteProduct})(DeleteButton)
