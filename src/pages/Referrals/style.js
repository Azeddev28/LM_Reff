import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";
const Checked = styled(FormControlLabel)(({}) => ({
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  flex: 1,
  margin: "0px",
  color: "rgba(0, 0, 0, 0.87))",
  // fontFamily: "Nunito",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHight: "20px",
  letterSpacing: 0.1,
}));

export { Checked };
