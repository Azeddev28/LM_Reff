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
      sx={{
        ...dropDownStyling,
        ...(data === 'Yes' && {
          color: '#5E6278',
          fontWeight: '600',
          fontSize: 12,
        }),
        ...(data === 'No' && {
          color: '#5E6278',
          fontWeight: '600',
          fontSize: 12,
        }),
      }}
    >
      <MenuItem value={"Yes"} style={{ fontSize: 12, fontWeight: 600, color: "#5E6278" }}>Yes</MenuItem>
      <MenuItem value={"No"} style={{ fontSize: 12, fontWeight: 600, color: "#5E6278" }}>No</MenuItem>
    </Select>

  );
};

export default DropDown;
