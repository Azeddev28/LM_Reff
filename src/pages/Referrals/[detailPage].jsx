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
import { useSelector } from "react-redux";
import { color, fontSize, fontWeight } from "@mui/system";
import dropBox from '/dropboxImg.svg?url';
import attachFile from '/attachFileIcon.svg?url';
import deleteFile from "/deleteIcon.svg?url";

const Footer = ({ handleSubmitChanges, data }) => (
  <div style={{
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '20px 70px'
  }}>
    <Button
      variant="contained"
      disabled={Object.keys(data).length === 0}
      onClick={handleSubmitChanges}
      style={{ width: "127px" }}
    >
      Save Changes
    </Button>
  </div>
);


const DetailPage = () => {
  const { id } = useParams();
  const [referralDetail, setReferralDetail] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [overNightStay, setOverNightStay] = useState(false);

  const { userName } = useSelector((state) => state.auth);

  const [updateReferral, { }] = useUpdateReferralMutation();
  const [
    updatedReferralData,
    { data: updatedReferralDetailData, isSuccess: isSuccessV2 },
  ] = useLazyGetReferralDetailQuery();

  const {
    data: referralData,
    isLoading,
    isSuccess,
    refetch
  } = useGetReferralDetailQuery(id);

  useEffect(() => {
    refetch()
  }, [])
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
          if (key === "overnight_stay_required") {
            setOverNightStay(referralDetail[key]);
          }
          updatedDetailData[key] = {
            ...REFERRAL_DETAIL_DATA[key],
            value: referralDetail[key],
          };
        }
      }

      setDetailData(updatedDetailData);
    }
  }, [referralDetail]);

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
    if (label === "overnight_stay_required") {
      setOverNightStay(value);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      handleInputChange("attachments", file);
      setFileList((prevFileList) => [...prevFileList, file]);
    }
  };

  const handleSubmitChanges = async () => {
    if (data.hasOwnProperty('overnight_stay_required') && data.overnight_stay_required === false) {
      data.return_date = '';
      data.departure_date = '';
    }
    if (data.hasOwnProperty('overnight_stay_required') && data.overnight_stay_required === true && (!data.return_date || !data.departure_date)) {
      return;
    }
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
    <Styled.ProgressWrapper>
      <CircularProgress size="7rem" />
    </Styled.ProgressWrapper>
  ) : (
    <Styled.MainWrapper>
      <Typography variant="h2" style={{ marginBottom: "30px", marginTop: "0px", fontSize: "25px", fontWeight: "500", marginLeft: "-4.6%", width: "108%", height: "65px", borderBottom: "1px solid #F1F1F2" }}>
        <span style={{ marginLeft: "65px" }}>Greetings, <span style={{ color: '#3B5CA9' }}>{userName}.</span></span>
      </Typography>
      {loader ? (
        <Styled.ProgressWrapper>
          <CircularProgress size="7rem" />
        </Styled.ProgressWrapper>
      ) : (
        <>
          <Styled.Container>
            <Styled.Column>
              <Styled.ColumnHeader variant="h3" style={{ fontSize: "15px", fontWeight: "600" }}>
                Referral Information
              </Styled.ColumnHeader>
              <h variant="h3" style={{ marginLeft: '16px', marginRight: '20px', marginTop: '-10px', fontWeight: '600', color: '#7E8299', fontSize: '11px' }}>
                These fields are maintained by Luminary and cannot be edited. Please contact Luminary if this referral needs to be assigned to a different provider
              </h>
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
              <Styled.CheckWrapper style={{ marginTop: "30px" }}>
                <Styled.Checked
                  control={
                    <Checkbox
                      checked={referralData?.preauthorization_required}
                      style={{ transform: "scale(1.5)", width: "30px", height: "30px", marginLeft: "8px" }}
                    />
                  }
                  style={{ pointerEvents: "none" }}
                  label={<span style={{ fontSize: "13px", fontWeight: "600", color: "#5E6278" }}>Preauthorization Required</span>}
                />
              </Styled.CheckWrapper>
              <Styled.CheckWrapper>
                <Styled.Checked
                  control={
                    <Checkbox
                      checked={referralData?.is_cancelled}
                      style={{ transform: "scale(1.5)", width: "30px", height: "30px", marginLeft: "8px" }}
                    />
                  }
                  style={{ pointerEvents: "none" }}
                  label={<span style={{ fontSize: "13px", fontWeight: "600", color: "#5E6278" }}>Procedure Cancelled</span>}
                />
              </Styled.CheckWrapper>
            </Styled.Column>

            <Styled.Column>
              <Styled.ColumnHeader variant="h3" style={{ fontSize: "15px", fontWeight: "600" }}>
                Referral Details
              </Styled.ColumnHeader>
              <h variant="h3" style={{ marginLeft: '16px', marginRight: '20px', marginTop: '-10px', fontWeight: '600', color: '#7E8299', fontSize: '11px' }}>
                Please update the fields below to indicate your acceptance of this referral. Please also provide at least weekly updates to indicate the patient's progress toward surgery. Use the "Practice Notes" to explain any updates not captured elsewhere on this form.
              </h>

              <Styled.ContentWrapper>
                {referralDetailData.slice(8, 29).map((item, index) => {
                  return (
                    !item?.inVisible ? (
                      <Styled.Card key={index}>
                        <Styled.Label>{item.key}</Styled.Label>
                        {typeof item.value === "boolean" || item?.isDropDown ? (
                          <DropDown
                            dropdownValue={item.value}
                            handleInputChange={handleInputChange}
                            label={item.label}
                            datatype={item?.datatype}
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
                          <Styled.Value variant="h">{item.value}</Styled.Value>
                        )}
                      </Styled.Card>
                    ) : (
                      <>
                        {overNightStay ?
                          (
                            <Styled.Card key={index}>
                              <Styled.Label>{item.key}</Styled.Label>
                              <DatePickerComponent
                                date={item.value}
                                handleInputChange={handleInputChange}
                                label={item.label}
                              />
                            </Styled.Card>
                          ) : (null)}
                      </>
                    )
                  );
                })}
              </Styled.ContentWrapper>
              
            </Styled.Column>

            <Styled.Column>
              <Styled.ColumnHeader variant="h3" style={{ fontSize: "15px", fontWeight: "600" }}>
                Referral Attachments
              </Styled.ColumnHeader>
              <h variant="h3" style={{ marginLeft: '16px', marginRight: '20px', marginTop: '-10px', fontWeight: '600', color: '#7E8299', fontSize: '11px' }}>
                View your referral documents and add any additional documents requested by the payer here
              </h>
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
                            <img src={dropBox} alt="" />
                            <Styled.DropzoneText>
                              Click or drag file to this area to upload
                            </Styled.DropzoneText>
                          </Styled.DropZoneContent>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Styled.FileUploadWrapper>
                <Styled.UploadedFileSection>

                  <Styled.UploadedFiles>
                    {fileList.map((item, index) => (
                      <Styled.UploadedFile
                        key={index}
                        onClick={() => handleViewFile(item.url)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={attachFile} style={{ height: '20px', marginRight: "20px" }} alt="" />
                          <Styled.FileText>{item.name}</Styled.FileText>
                        </div>
                      </Styled.UploadedFile>
                    ))}
                    {referralDetailData.slice(29, 30).map((item, index) => (
                      <React.Fragment key={index}>
                        {item?.value?.map((innerItem, innerIndex) => (
                          <Styled.UploadedFile key={innerIndex} onClick={() => handleViewFile(innerItem.attachment)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={attachFile} style={{ height: '20px', marginRight: "20px" }} alt="" />
                              <Styled.FileText>
                                {getFileNameFromURL(innerItem?.filename ? innerItem?.filename : "")}
                              </Styled.FileText>
                            </div>
                          </Styled.UploadedFile>
                        ))}
                      </React.Fragment>
                    ))}
                  </Styled.UploadedFiles>

                </Styled.UploadedFileSection>
              </Styled.ContentWrapperV2>
            </Styled.Column>
          </Styled.Container>

          <Footer handleSubmitChanges={handleSubmitChanges} data={data} />
        </>
      )}
    </Styled.MainWrapper>
  );
};

export default DetailPage;
