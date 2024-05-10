import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-root": {
    border: "none", // Remove border
    height: "20px",
    "& input": {
      padding: "0px 20px 0px 0px",
      border: "none", // Remove border
      fontSize: "16px",
      color: "black",
      height: "20px",
    },
    // "& .MuiStack-root": {
    //   paddingTop: "0px !important",
    // },

    "& .MuiSvgIcon-root": {
      // Customizing calendar icon
      color: "#2f65cb",
      height: "16px",
      width: "16px",
    },
    "& .MuiIconButton-root": {
      padding: "0px !important",
    },
  },
  "& .MuiPickersDay-day": {
    // Customizing days in calendar
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
    // border: "1px solid red !important",
  },
  //   ".css-1d11lhx-MuiStack-root": {
  //     paddingTop: "0px !important",
  //   },
  "& .MuiStack-root": {
    paddingTop: "0px !important",
  },
  //   "& .MuiPaper-root": {
  //     "& .MuiStack-root": {
  //       paddingTop: "0px !important",
  //     },
  //   },
  "& .MuiButtonBase-root-MuiIconButton-root": {
    padding: "0px",
  },
});

const DatePickerComponent = ({ date, handleInputChange, label }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(date));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleInputChange(label, date.format("YYYY-MM-DD")); // Convert date to desired format
  };

  useEffect(() => {
    setSelectedDate(dayjs(date));
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <StyledDatePicker value={selectedDate} onChange={handleDateChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
