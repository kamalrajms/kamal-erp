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
        <div className="cerateNewStock-btn-container">
          <button
            className={
              stockReceiptStatus === "Submitted" ||
              stockReceiptStatus === "Cancelled"
                ? "cerateNewStock-order-active-btn"
                : "cerateNewStock-inactive-btn"
            }
          >
            {stockReceiptStatus === "Cancelled"
              ? "Cancelled GRN"
              : "Cancel GRN"}
          </button>
          <nav>
            <button className="cerateNewStock-cancel-btn">Cancel</button>
            <button
              className={
                stockReceiptStatus === "" || stockReceiptStatus === "Draft"
                  ? "cerateNewStock-active-btn"
                  : "cerateNewStock-completed-btn"
              }
            >
              Save Draft
            </button>
            <button
              className={
                stockReceiptStatus === "" || stockReceiptStatus === "Draft"
                  ? "cerateNewStock-active-btn"
                  : "cerateNewStock-completed-btn"
              }
            >
              {stockReceiptStatus === "Submitted" ? "Submitted" : "Submit"}
            </button>
            <svg
              className={
                stockReceiptStatus !== ""
                  ? "cerateNewStock-pdf-mail-activelogo"
                  : "cerateNewStock-pdf-mail-futurelogo"
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.600098 2.4C0.600098 1.76348 0.852954 1.15303 1.30304 0.702944C1.75313 0.252856 2.36358 0 3.0001 0L16.1313 0L21.4001 5.2688V21.6C21.4001 22.2365 21.1472 22.847 20.6972 23.2971C20.2471 23.7471 19.6366 24 19.0001 24H3.0001C2.36358 24 1.75313 23.7471 1.30304 23.2971C0.852954 22.847 0.600098 22.2365 0.600098 21.6V2.4ZM4.6001 9.6H2.2001V17.6H3.8001V14.4H4.6001C5.23662 14.4 5.84707 14.1471 6.29715 13.6971C6.74724 13.247 7.0001 12.6365 7.0001 12C7.0001 11.3635 6.74724 10.753 6.29715 10.3029C5.84707 9.85286 5.23662 9.6 4.6001 9.6ZM11.0001 9.6H8.6001V17.6H11.0001C11.6366 17.6 12.2471 17.3471 12.6972 16.8971C13.1472 16.447 13.4001 15.8365 13.4001 15.2V12C13.4001 11.3635 13.1472 10.753 12.6972 10.3029C12.2471 9.85286 11.6366 9.6 11.0001 9.6ZM15.0001 17.6V9.6H19.8001V11.2H16.6001V12.8H18.2001V14.4H16.6001V17.6H15.0001Z"
              />
            </svg>
            <svg
              className={
                stockReceiptStatus !== ""
                  ? "cerateNewStock-pdf-mail-activelogo"
                  : "cerateNewStock-pdf-mail-futurelogo"
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 16"
              fill="none"
            >
              <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM10 8.825C10.0833 8.825 10.171 8.81233 10.263 8.787C10.355 8.76167 10.4423 8.72433 10.525 8.675L17.6 4.25C17.7333 4.16667 17.8333 4.06267 17.9 3.938C17.9667 3.81333 18 3.67567 18 3.525C18 3.19167 17.8583 2.94167 17.575 2.775C17.2917 2.60833 17 2.61667 16.7 2.8L10 7L3.3 2.8C3 2.61667 2.70833 2.61267 2.425 2.788C2.14167 2.96333 2 3.209 2 3.525C2 3.69167 2.03333 3.83767 2.1 3.963C2.16667 4.08833 2.26667 4.184 2.4 4.25L9.475 8.675C9.55833 8.725 9.646 8.76267 9.738 8.788C9.83 8.81333 9.91733 8.82567 10 8.825Z" />
            </svg>
          </nav>
        </div>
      </div>
    </>
  );
}
