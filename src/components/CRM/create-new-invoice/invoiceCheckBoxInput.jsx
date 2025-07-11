import React, { useState, useEffect } from "react";

export default function InvoiceTagsSelector({
  buttonAcs,
  value = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(value);

  const options = ["All", "Monthly", "Recurring", "Urgent"];

  useEffect(() => {
    setSelectedTags(value);
  }, [value]);

  const handleCheckboxChange = (option) => {
    let newSelectedTags;

    if (option === "All") {
      newSelectedTags =
        selectedTags.length === options.length ? [] : [...options];
    } else {
      newSelectedTags = selectedTags.includes(option)
        ? selectedTags.filter((item) => item !== option)
        : [...selectedTags, option];
    }

    setSelectedTags(newSelectedTags);
    onChange(newSelectedTags);
  };

  return (
    <div className="createNewInvoice-input-checkbox">
      <label htmlFor="invoice_tags">Invoice Tags</label>
      <div className="createNewInvoice-dropdown-wrapper">
        <div
          className="createNewInvoice-dropdown-header"
          onClick={() => !buttonAcs && setOpen(!open)}
        >
          {selectedTags.length > 0 ? selectedTags.join(", ") : "Select Tags"}
          <span>
            {open ? (
              <svg
                className="createNewInvoice-down-arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
              </svg>
            ) : (
              <svg
                className="createNewInvoice-down-arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            )}
          </span>
        </div>
        {open && (
          <div className="createNewInvoice-dropdown-body">
            {options.map((option) => (
              <label key={option} className="createNewInvoice-dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  disabled={buttonAcs}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
