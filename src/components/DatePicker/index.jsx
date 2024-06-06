import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "@emotion/styled";

const StyledDatePicker = styled(DatePicker)({
  width: "100%",
  "& .MuiInputBase-root": {
    height: "17px",
    border: "none",
    '& .MuiInputBase-input': {
      color: '#5E6278',
      fontSize: 12,
      fontWeight: 600,
    },
    "& input": {
      padding: "0px 0px 0px 0px",
      border: "none",
      fontSize: "14px",
      fontWeight: 400,
      color: "black",
      height: "17px",
    },
    "& .MuiSvgIcon-root": {
      color: "#2F65CB",
      height: "17px",
      width: "17px",
    },
    "& .MuiIconButton-root": {
      padding: "0px !important",
    },
  },
  "& .MuiPickersDay-day": {
    fontSize: "14px",
    color: "black",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "&.Mui-selected": {
      backgroundColor: "blue",
      color: "white",
      "&:hover": {
        backgroundColor: "blue",
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiButtonBase-root-MuiIconButton-root": {
    padding: "0px",
  },
});

const DatePickerComponent = ({ date, handleInputChange, label }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(date));
  const today = dayjs();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleInputChange(label, date.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setSelectedDate(dayjs(date));
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <StyledDatePicker
          minDate={today}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
