import React, { useState } from "react";
import "./createNewStockReceipt.css";
import { useNavigate } from "react-router-dom";
import StockComment from "./stockComment";
import StockHistory from "./stockHistory";
import StockAttachment from "./stockAttachment";

export default function () {
  const prevpg = useNavigate();
  const [stockReceiptStatus, setStockReceiptstatus] = useState("");
  const [detail, setDetail] = useState({
    comment: true,
    history: false,
    attachment: false,
  });
  return (
    <>
      <div className="cerateNewStock-container">
        <div className="cerateNewStock-head">
          <nav>
            <p>
              {stockReceiptStatus === ""
                ? "New Stock Receipt"
                : "Stock Receipt"}
            </p>
            {stockReceiptStatus !== "" && (
              <h3
                className={
                  stockReceiptStatus === "Draft"
                    ? "cerateNewStock-Status-draft"
                    : stockReceiptStatus === "Submitted"
                    ? "cerateNewStock-Status-Submitted"
                    : stockReceiptStatus === "Cancelled"
                    ? "cerateNewStock-Status-Cancelled"
                    : stockReceiptStatus === "Returned"
                    ? "cerateNewStock-Status-Returned"
                    : ""
                }
              >
                Status: {stockReceiptStatus}
              </h3>
            )}
          </nav>
          <div>
            <button
              className={
                stockReceiptStatus === "Submitted"
                  ? "cerateNewStock-active-btn"
                  : "cerateNewStock-inactive-btn"
              }
            >
              Stock Return
            </button>
            <nav
              className="cerateNewStock-close"
              onClick={(e) => {
                e.preventDefault();
                prevpg(-1);
              }}
            >
              <svg
                className="cerateNewStock-circle-x-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
              <p>Close</p>
            </nav>
          </div>
        </div>
        <div className="cerateNewStock-input-container">
          <div className="cerateNewStock-input-box">
            <label htmlFor="grn_id">GRN ID {`(Auto Generate)`}</label>
            <input
              id="grn_id"
              type="text"
              placeholder="Auto Generate"
              disabled
            />
          </div>
          <div className="cerateNewStock-input-box">
            <label htmlFor="po_referance_id">
              PO Reference ID<sup>*</sup>
            </label>
            <select id="po_referance_id" required>
              <option value="">Select Referance</option>
              <option value="one">One</option>
            </select>
          </div>
        </div>
        <div className="cerateNewStock-input-container">
          <div className="cerateNewStock-input-box">
            <label htmlFor="received_date">
              Received Date<sup>*</sup>
            </label>
            <input id="received_date" type="date" required />
          </div>
          <div className="cerateNewStock-input-box">
            <label htmlFor="supplier_name">
              Supplier Name<sup>*</sup>
            </label>
            <input
              type="text"
              id="supplier_name"
              placeholder="Enter Supplier Name"
              required
            />
          </div>
        </div>
        <div className="cerateNewStock-input-container">
          <div className="cerateNewStock-input-box">
            <label htmlFor="supplier_dn_no">Supplier DN No.</label>
            <input
              id="supplier_dn_no"
              type="text"
              placeholder="Enter Supplier DN No."
            />
          </div>
          <div className="cerateNewStock-input-box">
            <label htmlFor="supplier_invoice_no">Supplier Invoice No.</label>
            <input
              type="text"
              id="supplier_invoice_no"
              placeholder="Enter Supplier Invoice No."
            />
          </div>
        </div>
        <div className="cerateNewStock-input-container">
          <div className="cerateNewStock-input-box">
            <label htmlFor="received_by">Received By</label>
            <select id="received_by">
              <option value="">Select Referance</option>
              <option value="one">One</option>
            </select>
          </div>
          <div className="cerateNewStock-input-box">
            <label htmlFor="qc_done_by">QC Done By</label>
            <select id="qc_done_by">
              <option value="">Select Referance</option>
              <option value="one">One</option>
            </select>
          </div>
        </div>
        <nav className="cerateNewStock-subtit">
          Line Items<sup>*</sup>
        </nav>
        <div className="cerateNewStock-table-container">
          <table>
            <thead className="cerateNewStock-table-head">
              <tr>
                <th>#</th>
                <th>
                  <pre>Product Name</pre>
                </th>
                <th>
                  <pre>Product ID</pre>
                </th>
                <th>UMO</th>
                <th>
                  <pre>Qty Ordered</pre>
                </th>
                <th>
                  <pre>Qty Received</pre>
                </th>
                <th>
                  <pre>Accepted Qty</pre>
                </th>
                <th>
                  <pre>Rejected Qty</pre>
                </th>
                <th>
                  <pre>Qty Returned</pre>
                </th>
                <th>
                  <pre>Stock Dim.</pre>
                </th>
                <th> Warehouse</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="cerateNewStock-table-body">
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div className="cerateNewStock-hub-container">
          <div className="cerateNewStock-hub-head">
            <p
              className={
                detail.comment
                  ? "cerateNewStock-hub-head-bg-black"
                  : "cerateNewStock-hub-head-tit"
              }
              onClick={() => {
                setDetail({
                  history: false,
                  attachment: false,
                  comment: true,
                });
              }}
            >
              Comments
            </p>
            <p
              className={
                detail.history
                  ? "cerateNewStock-hub-head-bg-black"
                  : "cerateNewStock-hub-head-tit"
              }
              onClick={() => {
                setDetail({
                  history: true,
                  attachment: false,
                  comment: false,
                });
              }}
            >
              History
            </p>
            <p
              className={
                detail.attachment
                  ? "cerateNewStock-hub-head-bg-black"
                  : "cerateNewStock-hub-head-tit"
              }
              onClick={() => {
                setDetail({
                  history: false,
                  attachment: true,
                  comment: false,
                });
              }}
            >
              Attachments
            </p>
          </div>
          <div className="cerateNewStock-hub-body">
            {detail.comment && <StockComment />}
            {detail.history && <StockHistory />}
            {detail.attachment && (
              <StockAttachment
              // inputDisable={purchaseBtn.buttonAcs}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
