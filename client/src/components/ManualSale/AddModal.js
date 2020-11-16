import React, { useCallback, useState } from "react";
import { Modal, Layout, TextStyle, Select } from "@shopify/polaris";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct, getProducts } from "../../actions/manualSale";

const AddModal = ({ addProduct, getProducts }) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const optionsProduct = [
    { label: "Select Product", value: "Select Product" },
    { label: "Waiting API", value: "Waiting API" },
    { label: "Waiting me", value: "Waiting me" },
    { label: "Waiting API", value: "Waiting API" },
    { label: "Computer", value: "Computer" },
    { label: "Mouse", value: "Mouse" },
  ];

  const [selected, setSelected] = useState("Select Customer");

  const [checked, setChecked] = useState(true);

  const options = [
    { label: "Select Customer", value: "Select Customer" },
    { label: "Add Customer", value: "Add Customer" },
  ];

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const initialState = {
    publish_status: "",
    first_name: "",
    last_name: "",
    city: "",
    product: "",
    order_date: "",
    click_product: "0",
    close_popup: "0",
  };

  const [formData, setFormData] = useState(initialState);

  formData.publish_status = checked;
  const { first_name, last_name, city, product, order } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    setFormData(initialState);
    getProducts();
    handleChange();
  };
  console.log(formData);
  const activator = (
    <button className="btn-add" onClick={handleChange}>
      Add new manual sale
    </button>
  );
  return (
    <div className="mb-3">
      <Modal
        large
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Add Order Product"
        primaryAction={{
          content: "OK",
          onAction: onSubmit,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <div className="mb-3">
            <Layout>
              <Layout.Section secondary>
                <TextStyle variation="strong">Publish Order</TextStyle>
              </Layout.Section>
              <Layout.Section>
                <input
                  type="checkbox"
                  name="publishOrder"
                  value={checked}
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </Layout.Section>
            </Layout>
          </div>
          {/* <Customer /> */}
          <div className="mb-3">
            <Layout>
              <Layout.Section secondary>
                <TextStyle variation="strong">Customer</TextStyle>
              </Layout.Section>
              <Layout.Section>
                <div style={{ width: "250px" }}>
                  <Select
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </div>
              </Layout.Section>
            </Layout>
            {selected === "Add Customer" ? (
              <div className="mt-3">
                <Layout>
                  <Layout.Section secondary>
                    <TextStyle variation="strong">Add Customer</TextStyle>
                  </Layout.Section>
                  <Layout.Section>
                    <div className="mb-3">
                      <input
                        required
                        className="input-form"
                        name="first_name"
                        value={first_name}
                        onChange={onChange}
                        placeholder="First name"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="input-form"
                        name="last_name"
                        value={last_name}
                        onChange={onChange}
                        placeholder="Last name"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="input-form"
                        name="city"
                        value={city}
                        onChange={onChange}
                        placeholder="City"
                      />
                    </div>
                  </Layout.Section>
                </Layout>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* <SelectCustomer /> */}
          <div>
            <Layout>
              <Layout.Section secondary>
                <TextStyle variation="strong">Select Customer</TextStyle>
              </Layout.Section>
              <Layout.Section>
                <div style={{ width: "250px" }}>
                  <div className="form-group">
                    <select
                      className="form-select"
                      name="Customer"
                      onChange={onChange}
                    >
                      <option value="0">Select Customer</option>
                    </select>
                  </div>
                </div>
              </Layout.Section>
            </Layout>
          </div>

          {/* <SelectProduct /> */}
          <div className="mt-3">
            <Layout>
              <Layout.Section secondary>
                <TextStyle variation="strong">Select Products</TextStyle>
              </Layout.Section>
              <Layout.Section>
                <div style={{ width: "250px" }}>
                  <div className="form-group">
                    <select
                      className="form-select"
                      name="product"
                      value={product}
                      onChange={onChange}
                    >
                      {optionsProduct.map((product, index) => (
                        <option key={index} value={product.value}>
                          {product.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Layout.Section>
            </Layout>
          </div>

          {/* <OrderDate /> */}
          <div className="mt-3">
            <Layout>
              <Layout.Section secondary>
                <TextStyle variation="strong">Custom Text</TextStyle>
              </Layout.Section>
              <Layout.Section>
                <input
                  onChange={onChange}
                  name="order_date"
                  value={order}
                  style={{
                    width: "90%",
                    height: "40px",
                    backgroundColor: "#fcfdfd",
                    borderRadius: "4px",
                    border: "1px solid rgb(209, 202, 202)",
                    boxShadow: "-2px 4px 19px 1px rgba(230, 227, 227, 0.75)",
                  }}
                  type="datetime-local"
                />
              </Layout.Section>
            </Layout>
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  addProduct: PropTypes.func.isRequired,
  manualSale: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  manualSale: state.manualSale,
});

export default connect(mapStateToProps, { addProduct, getProducts })(AddModal);
