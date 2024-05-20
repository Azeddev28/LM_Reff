import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
const DropDown = ({ dropdownValue, handleInputChange, label }) => {
  const [data, setData] = useState(dropdownValue ? "Yes" : "No");
  const dropDownStyling = {
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "& .MuiSelect-select": {
      padding: "0px",
    },
  };

  const handleChange = (event) => {
    setData(event.target.value);
    const value = event.target.value === "Yes" ? true : false;
    handleInputChange(label, value);
  };

  useEffect(() => {
    setData(dropdownValue ? "Yes" : "No");
  }, [dropdownValue]);

  return (
    <Select
      value={data}
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      onChange={handleChange}
      sx={dropDownStyling}
    >
      <MenuItem value={"Yes"}>Yes</MenuItem>
      <MenuItem value={"No"}>No</MenuItem>
    </Select>
  );
};

export default DropDown;
