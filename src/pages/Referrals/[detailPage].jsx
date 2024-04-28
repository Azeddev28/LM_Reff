import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import {fetchReferralDetail} from "../../redux/slices/referralSlice";


const DetailPage = () => {
    const { id } = useParams();
    const dispatch=useDispatch();
   
    useEffect(() => {
       dispatch(fetchReferralDetail(id));
       }, [dispatch]);
       const referralDetail=useSelector((state)=>state.referral.referralDetail);
       console.log("Refferal Detail",referralDetail);
  return (
    <div>{id}</div>
  )
}

export default DetailPage