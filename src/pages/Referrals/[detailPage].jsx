import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import {fetchReferralDetail} from "../../redux/slices/referralSlice";
import {REFERRAL_DETAIL_DATA} from "../../utils/constants"

const DetailPage = () => {
    const { id } = useParams();
    const dispatch=useDispatch();
    const[detailData,setDetailData]=useState([]);
    useEffect(() => {
       dispatch(fetchReferralDetail(id));
        console.log("referralDetail",referralDetail);
        for (const key in REFERRAL_DETAIL_DATA) {
          if (REFERRAL_DETAIL_DATA.hasOwnProperty(key)) {
              REFERRAL_DETAIL_DATA[key].value = referralDetail[key];
          }
      }
      setDetailData(REFERRAL_DETAIL_DATA);
      console.log("detailData us",)
     
      
       }, [dispatch]);
       const referralDetail=useSelector((state)=>state.referral.referralDetail);
      
  return (
    <div>
     {/* {detailData.map((item,index)=>(
        <h1>jjj</h1>
      ))} */}
    </div>
  )
}

export default DetailPage