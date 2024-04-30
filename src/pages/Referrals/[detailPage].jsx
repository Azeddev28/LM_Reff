import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import SwitchButton from '../../components/Buttons/SwitchButton';
import { fetchReferralDetail } from '../../redux/slices/referralSlice';
import { REFERRAL_DETAIL_DATA } from '../../utils/constants';
import { Typography , Button } from '@mui/material';
import {patchRequest } from "../../axios";

const Container=styled('div')(({})=>({
  display:'flex',
  flexDirection:"row",
  gap:"20px",
  flex:1,
}));

const Column=styled('div')(({})=>({
  width: '33.33%' ,
  display:'flex',
  gap:'10px' ,
  flexDirection:'column' ,
  border:'1px solid black' 
}))

const HeadingWrapper= styled('div')(({  }) => ({
  height:"120px", 
  verticalAlign:'center',
  borderBottom:'1px solid black',
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}));

const Card = styled('div')(({  }) => ({
  height:'110px' , 
  border:'1px solid black' , 
  display:'flex',
  gap:'10px' ,
  flexDirection:'column' ,
  padding:'10px 16px',
  margin:'0px 30px'
}));

const ContentWrapper= styled('div')(({  }) => ({
  padding:'20px 0px',
  display:'flex',
  flexDirection:'column',
  gap:'10px',
 
}));


const Label= styled('p')(({  }) => ({
  fontSize:'16px',
  fontWeight:600,
  margin:'0px !important',
}));

const Value=styled('p')(({  }) => ({
  fontSize:'14px',
  fontWeight:500,
  margin:'0px !important',
}));

const ButtonWrapper=styled('div')(({  }) => ({
   display:'flex',
   flexDirection:'row',
   gap:"15px",
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});





const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailData, setDetailData] = useState([]);
  const referralDetail = useSelector((state) => state.referral.referralDetail);
  const handleViewFile =(fileLink)=>{
    window.open(fileLink, '_blank');
  }
  useEffect(() => {
    dispatch(fetchReferralDetail());
  }, [dispatch, id]);

  useEffect(() => {
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
  }, [referralDetail]);


 // File upload
 const handleFileChange = async (event,fileType) => {
  const file = event.target.files[0];
  console.log("File",file);
  console.log("Filetype",fileType);
  const formData = new FormData();
  formData.append(fileType, file);
  patchRequest(`http://3.6.94.153/api/referrals/update/${id}`,formData);
  // dispatch(updateReferalDetail(id,formData)); // TODO: have to fix this in redux
};
 
  const referralDetailData=Object.values(detailData);
  console.log("Referral Data ",referralDetailData);
  return (
    <Container>
    <Column>
      <HeadingWrapper>
      <Typography variant='h3'>Referral Information</Typography>
      </HeadingWrapper>
      <ContentWrapper>
      {referralDetailData.slice(6,13).map((item, index) => (
        <Card key={index}>
          <Label>{item.key}</Label>
          {typeof item.value === "boolean" ? (
              <SwitchButton
                checked={item.value}
                color="primary"
              />
      ) : (
        <Value variant="h6">{item.value}</Value>
      )}
        </Card>
      ))}
      </ContentWrapper>
    </Column>
    <Column>
      <HeadingWrapper>
    <Typography variant='h3'>Referral Information</Typography>
    </HeadingWrapper>
    <ContentWrapper>
    {referralDetailData.slice(7,13).map((item, index) => (
      <Card key={index} >
        <Label>{item.key}</Label>
        {typeof item.value === "boolean" ? (
              <SwitchButton
                checked={item.value}
                color="primary"
              />
      ) : (
        <Value variant="h6">{item.value}</Value>
      )}
      </Card>
    ))}
    </ContentWrapper>
    
  </Column>
  <Column>
  <HeadingWrapper>
    <Typography variant='h3'>Attachments</Typography>
    </HeadingWrapper>
    <ContentWrapper>
    {referralDetailData.slice(14,16).map((item, index) => (
      <Card key={index} >
       <Label>{item.key}</Label>
       <ButtonWrapper>
       <Button variant="outlined" size="medium" onClick={()=>handleViewFile(item.value)}>
          View 
        </Button>
         <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}        
    >
      Upload file
      <VisuallyHiddenInput 
         type="file" 
          onClick={(e) => {
                const attachmentType = item.key === 'preop-consult notes.pdf' ? 'preop_consult_attachment' : 'op_notes_attachment';
                handleFileChange(e, attachmentType);
  }} 
/>

    </Button>
       </ButtonWrapper>
      </Card>
    ))}
    </ContentWrapper>
    </Column>
  </Container>
  );
};

export default DetailPage;
