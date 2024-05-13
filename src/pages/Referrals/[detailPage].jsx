import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { CircularProgress, Button, Typography, Divider } from "@mui/material";

import StyledInput from "../../components/StyledInput";
import {
  useGetReferralDetailQuery,
  useLazyGetReferralDetailQuery,
} from "../../redux/slices/referralSlice";
import { REFERRAL_DETAIL_DATA } from "../../utils/constants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";
import { useUpdateReferralMutation } from "../../redux/slices/referralSlice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DatePickerComponent from "../../components/DatePicker";
import dayjs from "dayjs";
import DropDown from "../../components/DropDown";
import { Styled } from "./style";

const DetailPage = () => {
  const { id } = useParams();
  const [referralDetail, setReferralDetail] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const [updateReferral, {}] = useUpdateReferralMutation();
  const [
    updatedReferralData,
    { data: updatedReferralDetailData, isSuccess: isSuccessV2 },
  ] = useLazyGetReferralDetailQuery();

  const {
    data: referralData,
    isLoading,
    isSuccess,
  } = useGetReferralDetailQuery(id);
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
      const files = fileList.map((obj) => obj.file);
      handleInputChange("attachments", files);
    }
  }, [fileList]);

  const handleFileChangeButton = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const referralDetailData = Object.values(detailData);

  useEffect(() => {
    if (referralDetailData.length > 0) {
      const cancelledReferral = referralDetailData.find(
        (item) => item.label === "is_cancelled"
      );
      if (cancelledReferral) {
        setIsCancelled(cancelledReferral.value);
      }
    }
  }, [detailData, referralData]);

  const handleInputChange = (label, value) => {
    setData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleFiles = (files) => {
    const updatedFileList = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedFileList.push({
        file: file,
        url: URL.createObjectURL(file),
      });
    }
    setFileList((prevFileList) => [...prevFileList, ...updatedFileList]);
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

  const handleCheckboxChange = () => {
    setIsCancelled(!isCancelled);
    handleInputChange("is_cancelled", !isCancelled);
  };

  return isLoading ? (
    <Styled.ProgressWrapper>
      <CircularProgress size="7rem" />
    </Styled.ProgressWrapper>
  ) : (
    <Styled.MainWrapper>
      <Styled.Heading>Referral Details</Styled.Heading>
      <Styled.CutomizedDivider
        orientation="vertical"
        variant="middle"
        flexItem
      />
      {loader ? (
        <Styled.ProgressWrapper>
          <CircularProgress size="7rem" />
        </Styled.ProgressWrapper>
      ) : (
        <>
          <Styled.Container>
            <Styled.Column>
              <Styled.ColumnHeader variant="h3">
                Referral Information
              </Styled.ColumnHeader>
              <Styled.ContentWrapper>
                {referralDetailData.slice(0, 8).map((item, index) => (
                  <div key={index}>
                    {item.key === "Referral Description" ? (
                      <Styled.DescriptionWrapper>
                        <Styled.Label>{item.key}</Styled.Label>
                        <Styled.ValueWrapper>{item.value}</Styled.ValueWrapper>
                      </Styled.DescriptionWrapper>
                    ) : (
                      <Styled.Card key={index} value={item.value}>
                        <Styled.Label>{item.key}</Styled.Label>
                        {typeof item.value === "boolean" ? (
                          ""
                        ) : item.editable === true ? (
                          <h1>Editable</h1>
                        ) : item.key === "Referral Receipt Date" ? (
                          <Styled.Value variant="h6">
                            {dayjs(item.value).format("DD-MM-YYYY")}
                          </Styled.Value>
                        ) : (
                          <Styled.Value variant="h6">{item.value}</Styled.Value>
                        )}
                      </Styled.Card>
                    )}
                  </div>
                ))}
              </Styled.ContentWrapper>
              <Styled.CheckWrapper>
                <Styled.Checked
                  control={
                    <Checkbox
                      checked={referralData?.preauthorization_required}
                    />
                  }
                  style={{ pointerEvents: "none" }}
                  label="Preauthorization Required"
                />
              </Styled.CheckWrapper>
            </Styled.Column>
            <Styled.Column>
              <Styled.ColumnHeader>Referral Details</Styled.ColumnHeader>

              <Styled.ContentWrapper>
                {referralDetailData.slice(8, 24).map((item, index) => (
                  <Styled.Card key={index}>
                    <Styled.Label>{item.key}</Styled.Label>
                    {typeof item.value === "boolean" ? (
                      <DropDown
                        dropdownValue={item.value}
                        handleInputChange={handleInputChange}
                        label={item.label}
                      />
                    ) : item.datePicker === true ? (
                      <DatePickerComponent
                        date={item.value}
                        handleInputChange={handleInputChange}
                        label={item.label}
                      />
                    ) : item.editable === true ? (
                      <StyledInput
                        inputValue={item.value}
                        handleInputChange={handleInputChange}
                        label={item.label}
                      />
                    ) : (
                      <Styled.Value variant="h6">{item.value}</Styled.Value>
                    )}
                  </Styled.Card>
                ))}
              </Styled.ContentWrapper>
              <Styled.CheckWrapper>
                <Styled.Checked
                  control={
                    <Checkbox
                      checked={isCancelled}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Procedure Cancelled"
                />
              </Styled.CheckWrapper>
            </Styled.Column>
            <Styled.Column>
              <Styled.ColumnHeader>Referral Attachments</Styled.ColumnHeader>
              <Styled.ContentWrapperV2>
                <Styled.FileUploadWrapper>
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
                          <Styled.DropZoneContent>
                            <CloudUploadIcon fontSize="large" />
                            <Styled.DropzoneText>
                              Choose a file or drag and drop here
                            </Styled.DropzoneText>
                          </Styled.DropZoneContent>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <Styled.UploadButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    <Styled.FileUploadButton>
                      <CloudUploadIcon />
                      <p>Browse for File</p>
                    </Styled.FileUploadButton>
                    <Styled.VisuallyHiddenInput
                      type="file"
                      multiple={"multiple"}
                      onChange={handleFileChangeButton}
                    />
                  </Styled.UploadButton>
                </Styled.FileUploadWrapper>
                <Styled.UploadedFileSection>
                  <Styled.FileUploadTextWrapper>
                    <Styled.FileUploadText>File Uploads</Styled.FileUploadText>
                    <Divider />
                  </Styled.FileUploadTextWrapper>
                  <Styled.UploadedFiles>
                    {fileList.map((item, index) => (
                      <Styled.UploadedFile
                        key={index}
                        onClick={() => handleViewFile(item.url)}
                      >
                        <AttachFileIcon fontSize="large" />
                        <Styled.FileText>{item.file.name}</Styled.FileText>
                      </Styled.UploadedFile>
                    ))}
                    {referralDetailData.slice(24, 25).map((item, index) => (
                      <React.Fragment key={index}>
                        {item?.value?.map((innerItem, innerIndex) => (
                          <Styled.UploadedFile
                            key={innerIndex}
                            onClick={() => handleViewFile(innerItem.attachment)}
                          >
                            <AttachFileIcon fontSize="large" />

                            <Styled.FileText>
                              {getFileNameFromURL(innerItem.attachment)}
                            </Styled.FileText>
                          </Styled.UploadedFile>
                        ))}
                      </React.Fragment>
                    ))}
                  </Styled.UploadedFiles>
                </Styled.UploadedFileSection>
              </Styled.ContentWrapperV2>
            </Styled.Column>
          </Styled.Container>
          <Styled.ButtonWrapper>
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
          </Styled.ButtonWrapper>
        </>
      )}
    </Styled.MainWrapper>
  );
};

export default DetailPage;
