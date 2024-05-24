import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const CustomizedInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  padding-bottom: 5;
  background-color: #F9F9F9;
  &:focus {
    outline: none;
    border: none;
  }
`;

const StyledInput = ({ inputValue, handleInputChange, label }) => {
  const [data, setData] = useState(inputValue);
  const handleChange = (event) => {
    setData(event.target.value);
    handleInputChange(label, event.target.value);
  };

  useEffect(() => {
    setData(inputValue);
  }, [inputValue]);
  return <CustomizedInput value={data} onChange={handleChange} />;
};

export default StyledInput;
