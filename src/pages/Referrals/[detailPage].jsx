import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferralDetail } from '../../redux/slices/referralSlice';
import { REFERRAL_DETAIL_DATA } from '../../utils/constants';
import { Typography } from '@mui/material';
import { display } from '@mui/system';

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailData, setDetailData] = useState([]);

  const referralDetail = useSelector((state) => state.referral.referralDetail);

  useEffect(() => {
    dispatch(fetchReferralDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Create a new object instead of mutating the existing one
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

  console.log('detailData', detailData);
  const referralDetailData=Object.values(detailData);
  console.log("REferrak ?Data ",referralDetailData);
  return (
    <div style={{display:"flex",flexDirection:"row",gap:"20px" , flex:1}}>
    <div style={{  width: '33.33%' , display:'flex', gap:'10px' ,flexDirection:'column'  , border:'1px solid black' }}>
      <div style={{height:"100px", verticalAlign:'center',borderBottom:'1px solid black',paddingTop:'10px'}}>
      <Typography variant='h3' >Referral Information</Typography>
      </div>
      {referralDetailData.slice(0,6).map((item, index) => (
        <div key={index} style={{height:'80px' , border:'1px solid black' ,  display:'flex', gap:'10px' , flexDirection:'column' , padding:'10px 16px'}}>
          <Typography variant="h6">{item.key}</Typography>
          <Typography variant="h6">{item.value}</Typography>
        </div>
      ))}
    </div>
    <div style={{width: '33.33%' ,  display:'flex', gap:'10px' , flexDirection:'column'}}>
    <Typography variant='h3'>Referral Information</Typography>
    {referralDetailData.slice(7,13).map((item, index) => (
      <div key={index} style={{height:'80px' , border:'1px solid black'  ,  display:'flex', gap:'10px' , flexDirection:'column' ,padding:'10px 16px'}}>
        <Typography variant="h6">{item.key}</Typography>
        <Typography variant="h6">{item.value}</Typography>
      </div>
    ))}
    
  </div>
  <div style={{width: '33.33%' , display:'flex', gap:'10px' , flexDirection:'column'}}>
    <Typography variant='h3'>Attachments</Typography>
    {referralDetailData.slice(14,16).map((item, index) => (
      <div key={index} style={{height:'80px' , border:'1px solid black' , display:'flex', gap:'10px',flexDirection:'column' ,padding:'10px 16px'}}>
        <Typography variant="h6">{item.key}</Typography>
        {/* <Typography variant="h6">{item.value}</Typography> */}
      </div>
    ))}
    </div>
  </div>
  );
};

export default DetailPage;
