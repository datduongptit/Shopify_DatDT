import React, {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Modal, Layout, TextStyle, Select} from '@shopify/polaris';
import {updateProduct, getProducts} from '../../actions/manualSale';
import {connect} from 'react-redux';

const EditManualSales = ({products, updateProduct, getProducts}) => {
  // useEffect(() => {
  //   setChecked(products.publishOrder);
  // }, [products.publishOrder])
  const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const optionsProduct = [
      {label: 'Select Product', value: 'Select Product'},
      {label: 'Waiting API', value: 'Waiting API'},
      {label: 'Waiting me', value: 'Waiting me'},
      {label: 'Waiting API', value: 'Waiting API'},
      {label: 'Computer', value: 'Computer'},
      {label: 'Mouse', value: 'Mouse'},
    ]
    
    const [checked, setChecked] = useState(products.publishOrder);
    // const handleChangeCheck = useCallback((newChecked) => setChecked(newChecked), []);
    const options = [
      {label: 'Select Customer', value: 'Select Customer'},
      {label: 'Edit Customer', value: 'Edit Customer'}
    ];

    const [selected, setSelected] = useState('Edit Customer');
    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const initialState = {
      publishOrder: '',
      firstName: '',
      lastName: '',
      city: '', 
      product: '',
      order: ''
    }
    const [formData, setFormData] = useState(initialState);
    formData.publishOrder = JSON.stringify(checked);
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async (e) => {
      e.preventDefault();
      await updateProduct(products.id, formData);
      getProducts();
      handleChange();
    }
  const activator = <button className="btn btn-dark" onClick={handleChange}><span>Edit</span></button>;
  return (
    <>
          <div className='mb-3'>
            <Modal
              large
              activator={activator}
              open={active}
              onClose={handleChange}
              title="Edit Order Product"
              primaryAction={{
                content: 'OK',
                onAction: onSubmit,
              }}
              secondaryActions={[
                {
                  content: 'Cancel',
                  onAction: handleChange,
                },
              ]}
            >
              <Modal.Section>
                <div className='mb-3'>
                  <Layout>
                      <Layout.Section secondary>
                          <TextStyle variation='strong'>Publish Order</TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                          <input type='checkbox' name='pulishOrder' value={products.publishOrder} defaultChecked={Boolean(checked)} onChange={() => setChecked(!checked)} />
                      </Layout.Section> 
                  </Layout>
                </div>
                {/* <Customer /> */}
                <div className='mb-3'>
                  <Layout >
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Customer</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                        <div style={{width:'250px'}}>
                            <Select
                                options={options}
                                onChange={handleSelectChange}
                                value={selected}
                            />
                        </div>
                    </Layout.Section>
                  </Layout> 
                    {selected === 'Edit Customer' ? (
                    <div className="mt-3">
                      <Layout >
                        <Layout.Section secondary>
                                <TextStyle variation='strong'>Edit Customer</TextStyle>
                        </Layout.Section>
                        <Layout.Section>
                            <div className="mb-3">
                                <input required className=" input-form" name='firstName' defaultValue={products.firstName} onChange={onChange} placeholder='First name' />
                            </div>
                            <div className="mb-3">
                                <input className=" input-form" name='lastName' defaultValue={products.lastName} onChange={onChange} placeholder='Last name' />
                            </div>
                            <div className="mb-3">
                                <input className=" input-form" name='city' defaultValue={products.city} onChange={onChange} placeholder='City' />
                            </div>
                        </Layout.Section>
                      </Layout>
                    </div> ) : '' }
                  </div>

                {/* <SelectCustomer /> */}
                <div>
                  <Layout >
                      <Layout.Section secondary>
                          <TextStyle variation='strong'>Select Customer</TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                          <div style={{width:'250px'}}>
                            <div className='form-group'>
                              <select className='form-select' name='Customer' >
                                <option value='0'>Select Customer</option>
                              </select>
                            </div>
                          </div>
                      </Layout.Section>
                  </Layout> 
                </div>

                {/* <SelectProduct /> */}
                <div className='mt-3'>
                  <Layout >
                      <Layout.Section secondary>
                          <TextStyle variation='strong'>Select Products</TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                          <div style={{width:'250px'}}>
                            <div className='form-group'>
                              <select className='form-select' name='product' defaultValue={products.product} onChange={onChange}>
                                {optionsProduct.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                      </Layout.Section>
                  </Layout> 
                </div>

                {/* <OrderDate /> */}
                <div className='mt-3'>
                  <Layout>
                    <Layout.Section secondary>
                        <TextStyle variation='strong'>Custom Text</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                        <input onChange={onChange} name='order'  style={{width: '90%', height: '40px', backgroundColor: '#fcfdfd', borderRadius: '4px', border: '1px solid rgb(209, 202, 202)', boxShadow: '-2px 4px 19px 1px rgba(230, 227, 227, 0.75)'}} type='datetime-local' />
                    </Layout.Section> 
                  </Layout> 
                </div>
              </Modal.Section>
            </Modal>
          </div>
        </>
  )
}

EditManualSales.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
}

export default connect(null, {updateProduct, getProducts})(EditManualSales)
