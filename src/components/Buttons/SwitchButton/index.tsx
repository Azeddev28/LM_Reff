import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SwitchButtonProps {
  value: string;
  onChange: (value: boolean) => void;
}

const SwitchButton = ({ value, onChange }: SwitchButtonProps) => {
  const [checked, setChecked] = useState(value === "Yes");

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value === "Yes";
    setChecked(newValue);
    if (typeof onChange === 'function') { // Check if onChange is a function before invoking
      onChange(newValue);
    }
  };

  return (
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={checked ? "Yes" : "No"}
      onChange={handleChange}
    >
      <MenuItem value={"Yes"}>Yes</MenuItem>
      <MenuItem value={"No"}>No</MenuItem>
    </Select>
  );
};

export default SwitchButton;
