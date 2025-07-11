import React from "react";
import "./stockSerialNumber.css";

export default function stockSerialNumber() {
  return (
    <>
      <div className="createNewStockSerial-container">
        <h3>Generate Serial Numbers</h3>
        <div className="createNewStockSerial-input-container">
          <div>
            <label htmlFor="product_name">Product Name</label>
            <input id="product_name" disabled />
          </div>
          <div>
            <label htmlFor="product_id">Product ID</label>
            <input id="product_id" disabled />
          </div>
          <div>
            <label htmlFor="uom">UOM</label>
            <input id="uom" disabled />
          </div>
          <div>
            <label htmlFor="stock_dim">Stock Dim.</label>
            <select id="stock_dim">
              <option value="Serial">Serial</option>
              <option value="Batch">Batch</option>
            </select>
          </div>
          <div>
            <label htmlFor="qty_received">Qty Received</label>
            <input id="qty_received" disabled />
          </div>
          <div>
            <label htmlFor="accepted_qty">Accepted Qty</label>
            <input id="accepted_qty" disabled />
          </div>
          <div>
            <label htmlFor="serials_generated">Serials Generated</label>
            <input id="serials_generated" disabled />
          </div>
        </div>
        <div className="createNewStockSerial-division">
          <nav>
            <form className="createNewStockSerial-serial-inp">
              <div className="createNewStockSerial-serial-inp-box">
                <label htmlFor="serial_no">Serial No :</label>
                <input
                  type="text"
                  id="serial_no"
                  placeholder="Enter Serial Number"
                />
              </div>
              <button>Add Serial</button>
            </form>
            <p className="createNewStockSerial-imp-serialnum">
              Import Serial Numbers
            </p>
          </nav>
          <div className="createNewStockSerial-table">
            <table>
              <thead className="cerateNewStock-table-head">
                <tr>
                  <th>S.No</th>
                  <th>Serial No</th>
                  <th>Qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="cerateNewStock-table-body">
                <tr>
                  <td>1</td>
                  <td>UK-001</td>
                  <td>1</td>
                  <td>D</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
