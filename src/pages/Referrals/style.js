import styled from "@emotion/styled";
import { FormControlLabel, Typography, Button, Divider } from "@mui/material";
export const Styled = {
  ProgressWrapper: styled("div")(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  })),
  Checked: styled(FormControlLabel)(({}) => ({
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    flex: 1,
    margin: "0px",
    color: "#5E6278",
    fontFamily: "inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHight: "20px",
    letterSpacing: 0.1,
  })),

  Heading: styled(Typography)(({ theme }) => ({
    color: "#5E6278",
    fontFamily: "inter",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "28.8px",
    marginBottom: "47px",
    [theme.breakpoints.down("md")]: {
      marginBottom: "20px",
    },
  })),

  Container: styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    flex: 1,
    height: "fit-content",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  })),

  CheckWrapper: styled("div")(({}) => ({
    margin: "13px 25px 0px 16px",
  })),

  Column: styled("div")(({ theme }) => ({
    width: "33.33%",
    display: "flex",
    height: "auto",
    paddingBottom: "40px",
    flexDirection: "column",
    borderRadius: 10,
    background: "#FFFFFF",
    border: "1px solid #F1F1F2",
    boxShadow: "0px 0px 14px 0px rgba(53, 64, 82, 0.05)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  })),

  ColumnHeader: styled(Typography)(({}) => ({
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "inter",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20.4px",
    letterSpacing: 0.06,
    padding: "16px",
  })),

  Card: styled("div")(({ value }) => ({
    height: "auto",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    backgroundColor: "#F9F9F9",
    borderRadius: '8px',
    padding: "5px",
    margin: "0px 25px",
    border: "1px solid #E1E3EA;",
  })),

  ContentWrapper: styled("div")(({}) => ({
    padding: "20px 0px 0px 0px",
    display: "flex",
    flexDirection: "column",
    gap: "13px",
  })),
  ContentWrapperV2: styled("div")(({}) => ({
    padding: "20px 0px 0px 0px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  })),

  Label: styled("p")(({}) => ({
    color: "#A1A5B7",
    fontFamily: "inter",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "12px",
    letterSpacing: 0.4,
    margin: "0px",
  })),


  Value: styled("p")(({}) => ({
    color: "#7E8299",
    fontFamily: "inter",
    fontSize: 12,
    margin: "0px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "21px",
    letterSpacing: 0.079,
  })),

  MainWrapper: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "column",
  })),

  CutomizedDivider: styled(Divider)(({ theme }) => ({
    background: "#E0E0E0",
    height: "1px",
    marginBottom: "72px",
    [theme.breakpoints.down("md")]: {
      marginBottom: "35px",
    },
  })),

  VisuallyHiddenInput: styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  }),

  FileUploadWrapper: styled("div")(({}) => ({
    margin: "0px 24px",
    gap: "12px",
    display: "flex",
    flexDirection: "column",
  })),

  FileUploadButton: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    height: "36px",
    alignItems: "center",
  })),

  DescriptionWrapper: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "70px",
    margin: "0px 25px 0px 25px",
    gap: "12px",
  })),

  ValueWrapper: styled("div")(({}) => ({
    borderRadius: 8,
    border: "1px solid #E1E3EA",
    background: "#F9F9F9",
    padding: "9px 100px 7px 14px",
    color: "#7E8299",
    fontWeight: 600,
    fontSize: "12px",
  })),

  DropzoneText: styled("section")(({}) => ({
    color: "#5E6278",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: 0.4,
    marginBottom: "8px",
  })),

  DropZoneContent: styled("section")(({}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "11px",
    justifyContent: "end",
    width: "100%",
    alignItems: "center",
    borderRadius: 4,
    padding: "0px 16px",
    border: "1px solid rgba(0, 0, 0, 0.42)",
    background: "#F5F6F8",
    paddingBottom: "10px",
  })),

  UploadButton: styled(Button)(({}) => ({
    display: "flex",
    justifyContent: "start",
    gap: "6px",
  })),

  UploadedFileSection: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "column",
    margin: "0px 25px",
    gap: "10px",
  })),

  FileUploadTextWrapper: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  })),

  FileUploadText: styled("div")(({}) => ({
    color: "#263238",
    fontFamily: "inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "12px",
    letterSpacing: 0.4,
  })),

  UploadedFiles: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  })),

  UploadedFile: styled("div")(({}) => ({
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    minHeight: "55px",
    cursor: "pointer",
    padding: "11px 5px 11px 13px",
    borderRadius: 4,
    background: "#F9F9F9",
    alignItems: "center",
    border: "1px solid #E1E3EA",
    boxShadow: "0px 0px 14px 0px rgba(53, 64, 82, 0.05)",
  })),

  FileText: styled("p")(({}) => ({
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20.4px",
    letterSpacing: 0.06,
    margin: "0px",
    wordBreak: "break-all",
  })),

  ButtonWrapper: styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "end",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  })),

  
};
