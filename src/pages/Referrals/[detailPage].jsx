import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {CircularProgress,Divider } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import SwitchButton from '../../components/Buttons/SwitchButton';
import {useGetReferralDetailQuery} from "../../redux/slices/referralAPiSlice"
import { REFERRAL_DETAIL_DATA } from '../../utils/constants';
import { Typography , Button } from '@mui/material';
import {patchRequest } from "../../axios";



const Heading=styled('Typography')(({})=>({
  color: 'rgba(0, 0, 0, 0.87)',
  fontFamily: 'Nunito',
  fontSize: 24,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: "28.8px", /* 120% */
  marginBottom:'47px',
}));

const Container=styled('div')(({})=>({
  display:'flex',
  flexDirection:"row",
  gap:"20px",
  flex:1,
 
}));

const Column=styled('div')(({})=>({
  width: '33.33%' ,
  display:'flex',
  minHeight:'918px',
  // gap:'10px' ,
  flexDirection:'column' ,
  // border:'1px solid black',
  borderRadius: 15,
  background: '#FFF',
  boxShadow: '0px 0px 14px 0px rgba(53, 64, 82, 0.05)',
}));

const ColumnHeader=styled('Typography')(({})=>({
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Nunito',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: "20.4px",
    letterSpacing: 0.06,
    padding:'16px'
}));








// const HeadingWrapper= styled('div')(({  }) => ({
//   height:'52px',
//   borderRadius: '4px 4px 0px 0px',
//   verticalAlign:'center',
 
//   display:"flex",
//   justifyContent:"center",
//   alignItems:"center"
// }));

const Card = styled('div')(({value }) => ({
  height:'48px' , 
  borderBottom: typeof value === "boolean" ? 'none' : '1px solid black',
  display:'flex',
  gap:'10px' ,
  flexDirection:'column' ,
  paddingBottom:'5px',
  // padding:'10px 16px',
  margin:'0px 25px'
}));

const ContentWrapper= styled('div')(({  }) => ({
  padding:'20px 0px',
  display:'flex',
  flexDirection:'column',
  gap:'13px',
 
 
}));


const Label= styled('p')(({  }) => ({
  color: '#263238',
  fontFamily: 'Nunito',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '12px',
  letterSpacing: 0.4,
  margin:'0px',
}));

const Value=styled('p')(({  }) => ({
color: 'rgba(0, 0, 0, 0.87)',
fontFamily: 'Nunito',
fontSize: 14,
margin:'0px',
fontStyle: 'normal',
fontWeight: 400,
lineHeight: '21px',
letterSpacing: 0.079,
}));

const ButtonWrapper=styled('div')(({  }) => ({
   display:'flex',
   flexDirection:'row',
   gap:"15px",
}));

const MainWrapper=styled('div')(({  }) => ({
  display:'flex',
  flexDirection:'column',
 
}));

const CutomizedDivider=styled('Divider')(({  }) => ({
  marginBottom:'40px',
  background:'#E0E0E0',
  height:'1px',
  marginBottom:'72px',
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
  const [referralDetail,setReferralDetail]=useState([]);
  const [detailData, setDetailData] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);
  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
  };
  const handleViewFile =(fileLink)=>{
    window.open(fileLink, '_blank');
  }
  // useEffect(() => {
    const {
      data: referralData,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetReferralDetailQuery(id);
   

  useEffect(()=>{
  setReferralDetail(referralData);
  },[referralData])

  useEffect(() => {
    if(isSuccess){
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
  return(
      isLoading ?  (<CircularProgress disableShrink />):(
      <MainWrapper>
      <Heading>Referral Details</Heading>
      <CutomizedDivider orientation="vertical" variant="middle" flexItem />
      <Container>
       
        <Column>
          {/* <HeadingWrapper> */}
          <ColumnHeader variant='h3'>Referral Information</ColumnHeader>
          {/* </HeadingWrapper> */}
          
          <ContentWrapper>
          {referralDetailData.slice(0,6).map((item, index) => (
            <Card key={index} value={item.value}>
              <Label>{item.key}</Label>
              {typeof item.value === "boolean" ? (
                  // <SwitchButton
                  //   checked={item.value}
                  //   color="primary"
                  // />
                  <SwitchButton value={switchValue ? "Yes" : "No"} onChange={handleSwitchChange} />
          ) : (
            <Value variant="h6">{item.value}</Value>
          )}
            </Card>
          ))}
          </ContentWrapper>
        </Column>
        <Column>
          {/* <HeadingWrapper> */}
        <ColumnHeader>Referral Information</ColumnHeader>
        {/* </HeadingWrapper> */}
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
      {/* <HeadingWrapper> */}
        <ColumnHeader>Referral Attachments</ColumnHeader>
        {/* </HeadingWrapper> */}
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
      </MainWrapper>)
      )
};

export default DetailPage;
