import React,{useState} from 'react';
import Switch from '@mui/material/Switch';

interface SwitchButtonProps{
    value:boolean;
}

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const SwitchButton = ({value}:SwitchButtonProps) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (event : ChangeEvent) => {
      setChecked(event.target.checked);
    };
  return (
    <Switch
    checked={value}
    onChange={handleChange}
  />
  )
}

export default SwitchButton;