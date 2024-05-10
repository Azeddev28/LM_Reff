import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  CircularProgress,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  useGetReferralDetailQuery,
  useLazyGetReferralDetailQuery,
} from "../../redux/slices/referralAPiSlice";
import { REFERRAL_DETAIL_DATA } from "../../utils/constants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";
import { useUpdateReferralMutation } from "../../redux/slices/referralAPiSlice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DatePickerComponent from "../../components/DatePicker";

const Heading = styled(Typography)(({ theme }) => ({
  color: "rgba(0, 0, 0, 0.87)",
  // fontFamily: "Nunito",
  fontSize: 24,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "28.8px",
  marginBottom: "47px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "20px",
  },
}));

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  flex: 1,
  height: "fit-content",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

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
const CheckWrapper = styled("div")(({}) => ({
  margin: "13px 25px 0px 16px",
}));

const Column = styled("div")(({ theme }) => ({
  width: "33.33%",
  display: "flex",
  height: "auto",
  paddingBottom: "40px",
  flexDirection: "column",
  borderRadius: 15,
  background: "#FFF",
  boxShadow: "0px 0px 14px 0px rgba(53, 64, 82, 0.05)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const ColumnHeader = styled(Typography)(({}) => ({
  color: "rgba(0, 0, 0, 0.87)",
  // fontFamily: "Nunito",
  fontSize: 17,
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20.4px",
  letterSpacing: 0.06,
  padding: "16px",
}));

const Card = styled("div")(({ value }) => ({
  height: "50px",
  borderBottom: typeof value === "boolean" ? "none" : "1px solid black",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  paddingBottom: "5px",
  margin: "0px 25px",
}));

const ContentWrapper = styled("div")(({}) => ({
  padding: "20px 0px 0px 0px",
  display: "flex",
  flexDirection: "column",
  gap: "13px",
}));
const ContentWrapperV2 = styled("div")(({}) => ({
  padding: "20px 0px 0px 0px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
}));

const Label = styled("p")(({}) => ({
  color: "#263238",
  // fontFamily: "Nunito",
  fontSize: 12,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "12px",
  letterSpacing: 0.4,
  margin: "0px",
}));

const Value = styled("p")(({}) => ({
  color: "rgba(0, 0, 0, 0.87)",
  // fontFamily: "Nunito",
  fontSize: 14,
  margin: "0px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "21px",
  letterSpacing: 0.079,
}));

const MainWrapper = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
}));

const CutomizedDivider = styled(Divider)(({ theme }) => ({
  background: "#E0E0E0",
  height: "1px",
  marginBottom: "72px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "35px",
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploadWrapper = styled("div")(({}) => ({
  margin: "0px 24px",
  gap: "12px",
  display: "flex",
  flexDirection: "column",
}));

const FileUploadButton = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  height: "36px",
  alignItems: "center",
}));

const DescriptionWrapper = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "70px",
  margin: "0px 25px 0px 25px",
  gap: "12px",
}));

const ValueWrapper = styled("div")(({}) => ({
  borderRadius: 2,
  border: "1px solid rgba(0, 0, 0, 0.42)",
  background: "#F5F6F8",
  padding: "9px 100px 7px 14px",
}));

const DropzoneText = styled("section")(({}) => ({
  color: "#263238",
  textAlign: "center",
  // fontFamily: "Nunito",
  fontSize: 16,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
  letterSpacing: 0.4,
}));

const DropZoneContent = styled("section")(({}) => ({
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
}));

const UploadButton = styled(Button)(({}) => ({
  display: "flex",
  justifyContent: "start",
  gap: "6px",
}));

const UploadedFileSection = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  margin: "0px 25px",
  gap: "10px",
}));

const FileUploadTextWrapper = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const FileUploadText = styled("div")(({}) => ({
  color: "#263238",
  // fontFamily: "Nunito",
  fontSize: 12,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "12px",
  letterSpacing: 0.4,
}));

const UploadedFiles = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const UploadedFile = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
  minHeight: "55px",
  // height: "fit-content",
  padding: "11px 5px 11px 13px",
  borderRadius: 4,
  background: "#D9D9D9",
  alignItems: "center",
  boxShadow: "0px 0px 14px 0px rgba(53, 64, 82, 0.05)",
}));

const FileText = styled("p")(({}) => ({
  color: "rgba(0, 0, 0, 0.87)",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20.4px",
  letterSpacing: 0.06,
  margin: "0px",
  wordBreak: "break-all",
}));

const StyledInput = styled.input`
  border: none;
  outline: none;

  &:focus {
    outline: none;
    border: none;
  }
`;

const ButtonWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const DetailPage = () => {
  const { id } = useParams();
  const [referralDetail, setReferralDetail] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);

  const [updateReferral, {}] = useUpdateReferralMutation();
  const [
    updatedReferralData,
    { data: updatedReferralDetailData, isSuccess: isSuccessV2 },
  ] = useLazyGetReferralDetailQuery();

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

  const {
    data: referralData,
    isLoading,
    isSuccess,
  } = useGetReferralDetailQuery(id);

  // console.log("Referral Data", referralData);
  useEffect(() => {
    setReferralDetail(referralData);
  }, [referralData]);

  useEffect(() => {
    if (isSuccessV2) {
      setReferralDetail(updatedReferralDetailData);
    }
  }, [updatedReferralDetailData]);

  useEffect(() => {
    if (isSuccess) {
      const updatedDetailData = {};
      for (const key in REFERRAL_DETAIL_DATA) {
        if (REFERRAL_DETAIL_DATA.hasOwnProperty(key)) {
          updatedDetailData[key] = {
            ...REFERRAL_DETAIL_DATA[key],
            value: referralDetail[key],
          };
        }
      }

      setDetailData(updatedDetailData);
    }
  }, [referralDetail]);

  useEffect(() => {
    if (fileList.length > 0) {
      handleInputChange("attachments", fileList);
    }
  }, [fileList]);

  const handleFileChangeButton = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const referralDetailData = Object.values(detailData);

  const handleInputChange = (label, value) => {
    setData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleDropDownChange = (label, value) => {
    const booleanConversion = value == "Yes" ? true : false;
    handleInputChange(label, booleanConversion);
  };
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setFileList((prevFileList) => [...prevFileList, file]);
    }
  };

  const handleSubmitChanges = async () => {
    try {
      setLoader(true);
      await updateReferral({ id, data });
      await updatedReferralData(id);
      setLoader(false);
      setData({});
      setFileList([]);
    } catch (error) {
      setLoader(false);
    }
  };

  const getFileNameFromURL = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const handleViewFile = (url) => {
    window.open(url, "_blank");
  };

  return isLoading ? (
    <CircularProgress disableShrink />
  ) : (
    <MainWrapper>
      <Heading>Referral Details</Heading>
      <CutomizedDivider orientation="vertical" variant="middle" flexItem />
      {loader ? (
        <CircularProgress disableShrink />
      ) : (
        <>
          <Container>
            <Column>
              <ColumnHeader variant="h3">Referral Information</ColumnHeader>
              <ContentWrapper>
                {referralDetailData.slice(0, 8).map((item, index) => (
                  <div key={index}>
                    {item.key === "Referral Description" ? (
                      <DescriptionWrapper>
                        <Label>{item.key}</Label>
                        <ValueWrapper>{item.value}</ValueWrapper>
                      </DescriptionWrapper>
                    ) : (
                      <Card key={index} value={item.value}>
                        <Label>{item.key}</Label>
                        {typeof item.value === "boolean" ? (
                          ""
                        ) : item.editable === true ? (
                          <h1>Editable</h1>
                        ) : (
                          <Value variant="h6">{item.value}</Value>
                        )}
                      </Card>
                    )}
                  </div>
                ))}
              </ContentWrapper>
              <CheckWrapper>
                <Checked
                  control={<Checkbox defaultChecked />}
                  style={{ pointerEvents: "none" }}
                  label="Preauthorization Required"
                />
              </CheckWrapper>
            </Column>
            <Column>
              <ColumnHeader>Referral Information</ColumnHeader>

              <ContentWrapper>
                {referralDetailData.slice(8, 21).map((item, index) => (
                  <Card key={index}>
                    <Label>{item.key}</Label>
                    {typeof item.value === "boolean" ? (
                      <Select
                        key={item.label}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        defaultValue={item.value === true ? "Yes" : "No"}
                        onChange={(option) => {
                          handleDropDownChange(item.label, option.target.value);
                        }}
                        sx={dropDownStyling}
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    ) : item.datePicker === true ? (
                      <DatePickerComponent
                        date={item.value}
                        handleInputChange={handleInputChange}
                        label={item.label}
                      />
                    ) : item.editable === true ? (
                      <StyledInput
                        name="attachments"
                        defaultValue={item.value}
                        onChange={(e) =>
                          handleInputChange(item.label, e.target.value)
                        }
                      />
                    ) : (
                      <Value variant="h6">{item.value}</Value>
                    )}
                  </Card>
                ))}
              </ContentWrapper>
              <CheckWrapper>
                <Checked
                  control={<Checkbox defaultChecked />}
                  label="Procedure Cancelled"
                />
              </CheckWrapper>
            </Column>
            <Column>
              <ColumnHeader>Referral Attachments</ColumnHeader>
              <ContentWrapperV2>
                <FileUploadWrapper>
                  <Dropzone
                    onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps()}
                          style={{
                            height: "185px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <input {...getInputProps()} />
                          <DropZoneContent>
                            <CloudUploadIcon fontSize="large" />
                            <DropzoneText>
                              Choose a file or drag and drop here
                            </DropzoneText>
                          </DropZoneContent>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <UploadButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    <FileUploadButton>
                      <CloudUploadIcon />
                      <p>Browse for File</p>
                    </FileUploadButton>
                    <VisuallyHiddenInput
                      type="file"
                      multiple={"multiple"}
                      onChange={handleFileChangeButton}
                    />
                  </UploadButton>
                </FileUploadWrapper>
                <UploadedFileSection>
                  <FileUploadTextWrapper>
                    <FileUploadText>File Uploads</FileUploadText>
                    <Divider />
                  </FileUploadTextWrapper>
                  <UploadedFiles>
                    {referralDetailData.slice(22, 22).map((item, index) => (
                      <React.Fragment key={index}>
                        {item?.value?.map((innerItem, innerIndex) => (
                          <UploadedFile
                            key={innerIndex}
                            onClick={() => handleViewFile(innerItem.attachment)}
                            style={{ cursor: "pointer" }}
                          >
                            <AttachFileIcon fontSize="large" />

                            <FileText>
                              {getFileNameFromURL(innerItem.attachment)}
                            </FileText>
                          </UploadedFile>
                        ))}
                      </React.Fragment>
                    ))}
                    {fileList.map((item, index) => (
                      <UploadedFile key={index}>
                        <AttachFileIcon fontSize="large" />
                        <FileText>{item.name}</FileText>
                      </UploadedFile>
                    ))}
                  </UploadedFiles>
                </UploadedFileSection>
              </ContentWrapperV2>
            </Column>
          </Container>
          <ButtonWrapper>
            <Button
              variant="contained"
              disabled={Object.keys(data).length === 0}
              onClick={handleSubmitChanges}
              style={{
                marginTop: "35px",
                verticalAlign: "end",
                width: "127px",
              }}
            >
              Save Changes
            </Button>
          </ButtonWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default DetailPage;
