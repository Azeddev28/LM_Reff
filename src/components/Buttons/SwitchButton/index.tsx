import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {MenuItem,FormControl} from '@mui/material';

interface SwitchButtonProps {
  value: string;
  setSwitchValue:React.Dispatch<React.SetStateAction<string >>;
  // handleInputChange: (label: string, value: string) => void;
  // label:string;

}

const SwitchButton = ({ value, setSwitchValue  }: SwitchButtonProps) => {
  

  const handleChange = (event: SelectChangeEvent) => {
    setSwitchValue(event.target.value);
    // handleInputChange('switchValue', value);

  };

  return (
    
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={value}
      
      onChange={handleChange}
      sx={{
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
          '& .MuiSelect-select': {
            padding:"0px",
         }

      }}
    >
      <MenuItem value={"Yes"}>Yes</MenuItem>
      <MenuItem value={"No"}>No</MenuItem>
    </Select>
    
  );
};

export default SwitchButton;
