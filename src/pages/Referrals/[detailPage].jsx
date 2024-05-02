import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {CircularProgress,Divider } from '@mui/material';
import styled from '@emotion/styled';
// import { useDispatch } from 'react-redux';
import SwitchButton from '../../components/Buttons/SwitchButton';
import {useGetReferralDetailQuery} from "../../redux/slices/referralAPiSlice"
import { REFERRAL_DETAIL_DATA } from '../../utils/constants';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button , FormControlLabel  } from '@mui/material';
import {patchRequest } from "../../axios";
import Checkbox from '@mui/material/Checkbox';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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


const Checked=styled(FormControlLabel)(({})=>({
  display:'flex',
  flexDirection:"row",
  gap:"30px",
  flex:1,
  margin:'0px',
  color: 'rgba(0, 0, 0, 0.87))',
  fontFamily: 'Nunito',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHight: "20px",
  letterSpacing: 0.1,
 
}));
const CheckWrapper=styled('div')(({  }) => ({
  margin:'0px 25px 0px 16px',
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
  padding:'20px 0px 0px 0px',
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


const FileUploadWrapper=styled('div')(({  }) => ({
  margin:'0px 24px',
  gap:'12px',
  display:"flex",
  flexDirection:'column',
}));

const FileUploadButton=styled('div')(({  }) => ({
  display:'flex',
  flexDirection:'row',
  gap:'10px',
  height:'36px',
  alignItems:'center',
}));

// const DropArea=styled('section')(({  }) => ({
//   // height:'185px',
//   display:'flex', 
//   border:'1px solid rgba(0, 0, 0, 0.42)',
//   borderRadius:'4px',
//   background:'#F5F6F8',
//   justifyContent:'center',
//   alignItems:'end',
  
// }));

const DescriptionWrapper=styled('div')(({  }) => ({
  display:'flex', 
  flexDirection:'column',
  minHeight:'70px',
  margin:'0px 25px',
  gap:'12px',
}));

const ValueWrapper=styled('div')(({  }) => ({
  borderRadius: 2,
  border: '1px solid rgba(0, 0, 0, 0.42)',
  background: '#F5F6F8',
  padding:'9px 100px 7px 14px'
}));



const DropzoneText=styled('section')(({  }) => ({
  color: '#263238',
  textAlign: 'center',
  fontFamily: 'Nunito',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: 0.4,
}));



const DropZoneContent=styled('section')(({  }) => ({
  display:'flex',
  flexDirection:'column',
  gap:'11px',
  justifyContent:'end',
  width:'100%',
  alignItems:'center',
  borderRadius: 4,
  padding:'0px 16px',
  border: '1px solid rgba(0, 0, 0, 0.42)',
  background: '#F5F6F8',
  paddingBottom:'10px',
}));

const UploadButton=styled(Button)(({  }) => ({
  display:'flex',
  justifyContent:'start',
  gap:"6px",
}));

const UploadedFileSection=styled('div')(({  }) => ({
    display:'flex',
    flexDirection:'column',
    margin:'0px 25px',
    gap:'10px',
}));


const FileUploadTextWrapper=styled('div')(({  }) => ({
  display:'flex',
  flexDirection:'column',
  gap:'10px',
}));

const FileUploadText=styled('div')(({  }) => ({
  color: '#263238',
  fontFamily: 'Nunito',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '12px',
  letterSpacing: 0.4,
}));

const UploadedFiles=styled('div')(({  }) => ({
   display:'flex',
   flexDirection:'column',
   gap:'16px',
}));

const UploadedFile=styled('div')(({  }) => ({
  display:'flex',
  flexDirection:'row',
  gap:'16px',
  height:'55px',
  padding:'0px 5px 0px 13px',
  borderRadius: 4,
  background: '#D9D9D9',
  alignItems:'center',
  boxShadow: '0px 0px 14px 0px rgba(53, 64, 82, 0.05)',
}));

const UploadedFileText=styled('p')(({  }) => ({
  color: 'rgba(0, 0, 0, 0.87)',
  fontFamily: 'Nunito',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20.4px',
  letterSpacing: 0.06,
}));



const DetailPage = () => {
  const { id } = useParams();
  const [referralDetail,setReferralDetail]=useState([]);
  const [detailData, setDetailData] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);
  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
  };
  // const handleViewFile =(fileLink)=>{
  //   window.open(fileLink, '_blank');
  // }
  
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
 const handleFileChange = (event) => {
  const files = event.target.files;
  // console.log("even.target",files);
  // Do something with the selected files
  console.log("Button Files",files);
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
          <ColumnHeader variant='h3'>Referral Information</ColumnHeader>
          <ContentWrapper>
          {referralDetailData.slice(0,6).map((item, index) => (
            item.key === "Referral Description" ?(
              <DescriptionWrapper>
                <Label>{item.key}</Label>
                <ValueWrapper>
                 {item.value}
                </ValueWrapper>
              </DescriptionWrapper>
            ) :
            (<Card key={index} value={item.value}>
              <Label>{item.key}</Label>
              {typeof item.value === "boolean" ? (
                  <SwitchButton value={switchValue ? "Yes" : "No"} onChange={handleSwitchChange} />
          ) : (
            <Value variant="h6">{item.value}</Value>
          )}
            </Card>)
          ))}
          </ContentWrapper>
          <CheckWrapper>
          <Checked control={<Checkbox defaultChecked />} label="Preauthorization Required" />
          </CheckWrapper>

        </Column>
        <Column>
          
        <ColumnHeader>Referral Information</ColumnHeader>
        
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
        <CheckWrapper>
          <Checked control={<Checkbox defaultChecked />} label="Procedure Cancelled" />
          </CheckWrapper>
      </Column>
      <Column>
        <ColumnHeader>Referral Attachments</ColumnHeader>
        <ContentWrapper>
         <FileUploadWrapper>
         <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}  style={{ height:'185px',width:'100%' , display:'flex' ,justifyContent:'end' }}>
                <input {...getInputProps()} />
                 <DropZoneContent>
                  <CloudUploadIcon fontSize='large'/>
                 <DropzoneText>Choose a file or drag and drop here</DropzoneText>
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
          <CloudUploadIcon/>
          <p>Browse for File</p>
          </FileUploadButton>
          <VisuallyHiddenInput 
             type="file" 
             onChange={handleFileChange}
      
    />
        </UploadButton>
      </FileUploadWrapper>
      <UploadedFileSection>
          <FileUploadTextWrapper>
            <FileUploadText>File Uploads</FileUploadText>
            <Divider/>
          </FileUploadTextWrapper>
         <UploadedFiles>
          <UploadedFile>
            <AttachFileIcon fontSize='large'/>
            <UploadedFileText>Pre Op Consult Notes</UploadedFileText>
          </UploadedFile>
          <UploadedFile>
            <AttachFileIcon fontSize='large'/>
            <UploadedFileText>Operating Notes</UploadedFileText>
          </UploadedFile>
          <UploadedFile>
            <AttachFileIcon fontSize='large'/>
            <UploadedFileText>Post Op Consult Notes</UploadedFileText>
          </UploadedFile>

         </UploadedFiles>
        


      </UploadedFileSection>
        </ContentWrapper>
        </Column>
      </Container>
      </MainWrapper>)
      )
};

export default DetailPage;
