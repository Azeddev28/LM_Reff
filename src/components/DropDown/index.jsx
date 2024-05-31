import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
const DropDown = ({ dropdownValue, handleInputChange, label , datatype }) => {

  const [data, setData] = useState('');

    // Sync state with dropdownValue prop
    useEffect(() => {
      if (datatype) {
        setData(dropdownValue ? dropdownValue : '');
      } else {
        setData(dropdownValue ? 'Yes' : 'No');
      }
    }, [dropdownValue, datatype]);


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
    let value;
    switch (datatype) {
      case 'visitType':
        value = event.target.value;
        break;
      default:
        value = event.target.value === "Yes" ? true : false;
        break;
    }
    handleInputChange(label, value);
  };


  const getDropdownItems = () => {
    switch (datatype) {
      case 'visitType':
        return [
          { value: 'In Person', label: 'In Person' },
          { value: 'Virtual', label: 'Virtual' },
        ];
      default:
        return [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ];
    }
  };
  const dropdownItems = getDropdownItems();

  return (
    <Select
      value={data}
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      onChange={handleChange}
      sx={{
        ...dropDownStyling,
        color: '#5E6278',
        fontWeight: '600',
        fontSize: 12,
      }}
    >
      {dropdownItems.map((item) => (
        <MenuItem
          key={item.value}
          value={item.value}
          style={{ fontSize: 12, fontWeight: 600, color: "#5E6278" }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Select>

  );
};

export default DropDown;
