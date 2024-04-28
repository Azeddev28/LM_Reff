import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import {fetchReferralDetail} from "../../redux/slices/referralSlice";
import {REFERRAL_DETAIL} from "../../utils/constants"

const DetailPage = () => {
    const { id } = useParams();
    const dispatch=useDispatch();
    useEffect(() => {
       dispatch(fetchReferralDetail(id));
        console.log("referralDetail",referralDetail);
        
       }, [dispatch]);
       const referralDetail=useSelector((state)=>state.referral.referralDetail);
      //  console.log("REFERRAL_DETAIL",REFERRAL_DETAIL);
      //  console.log("Refferal Detail",referralDetail);
  return (
    <div>{id}</div>
  )
}

export default DetailPage