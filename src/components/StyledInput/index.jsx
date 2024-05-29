import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const CustomizedTextArea = styled.textarea`
  border: none;
  outline: none;
  padding: 0;
  padding-bottom: 2px;
  background-color: #F9F9F9;
  resize: none;
  font-weight: 600;
  color: #5E6278;
  font-size: 12px;
  height: auto;
  min-height: 32px;
  font-family: "Inter"; 
`;

const StyledInput = ({ inputValue, handleInputChange, label }) => {
  const [data, setData] = useState(inputValue);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setData(event.target.value);
    handleInputChange(label, event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [data]);

  useEffect(() => {
    setData(inputValue);
  }, [inputValue]);

  return (
    <CustomizedTextArea
      ref={textareaRef}
      value={data}
      onChange={handleChange}
      rows={1} 
    />
  );
};

export default StyledInput;
