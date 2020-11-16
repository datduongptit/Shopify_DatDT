import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProducts,
  getProduct,
  updateProduct,
  publishOrders,
} from "../actions/manualSale";
import Spinner from "./contents/Spinner";
import Button from "./Button";
import EditManualSales from "./ManualSale/EditManualSales";
import DeleteButton from "./ManualSale/DeleteButton";

const Test = ({
  getProducts,
  getProduct,
  manualSale: { loading, products },
  publishOrders,
}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "firstName", headerName: "FIRST NAME	", width: 150 },
    { field: "city", headerName: "CITY", width: 100 },
    { field: "product", headerName: "PRODUCT SELECTED", width: 220 },
    { field: "time", headerName: "ORDER DATE/TIME", width: 160 },
    { field: "click", headerName: "CLICKED TIMES", width: 160 },
    { field: "ignore", headerName: "IGNORED TIMES", width: 180 },
    {
      field: "action",
      headerName: "ACTION",
      width: 270,
      renderCell: (product) => (
        <div style={{ display: "flex", padding: 0, alignItems: "center" }}>
          {console.log(product.value.publishOrder)}
          <div>
            <button
              className={
                product.value.publishOrder === 1
                  ? "btn btn-success"
                  : "btn btn-edit"
              }
              onClick={() => {
                publishOrders(product.value.id, {
                  publishOrder: Math.abs(1 - product.publishOrder),
                });
                getProducts();
              }}
            >
              {product.value.publishOrder === 1 ? (
                <span style={{ fontSize: "12px" }}>Unpublish</span>
              ) : (
                <span>Publish</span>
              )}
            </button>
          </div>
          <div style={{ alignItems: "center" }}>
            <EditManualSales products={product.value} />
            <span onClick={() => getProduct(product.value._id)}></span>
          </div>
          <div>
            <DeleteButton id={product.value.id} />
          </div>
        </div>
      ),
    },
  ];

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
      action: product,
    });
  });

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      )}
    </div>
  );
};

Test.propTypes = {
  getProducts: PropTypes.func.isRequired,
  manualSale: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  publishOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  manualSale: state.manualSale,
});

export default connect(mapStateToProps, {
  getProducts,
  getProduct,
  updateProduct,
  publishOrders,
})(Test);
