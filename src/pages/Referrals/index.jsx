import React,{ useEffect,useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import  {REFERRAL_ROWS_DATA,REFERRAL_HEADER_DATA} from '../../utils/constants';
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useDispatch, useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { fetchReferrals } from "../../redux/slices/referralSlice";


const TableWrapper=styled('div')(({})=>({
    marginTop:'20px',
 }));

const Referrals = () => {
  const [referralList,setRefferalList]=useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchReferrals());
  }, [dispatch]);
  
  
let referrals;
 referrals = useSelector((state) => state.referral.referralData.results);
  //  setRefferalList(referrals);
 console.log("Refferals",referrals);
 useEffect(()=>{
  setRefferalList(referrals);
},[referrals]);
  return (
    // <h1>hhhh</h1>
    <div>
      <DashboardHeader heading="Referral Tracker" 
      subHeading="Greetings, {User Name}. Click on a patient to update their referral"
      placeHolder="Search by Patient Name"
      />
      <TableWrapper>
      <PaginatedTable rowsData={referralList} headerData={REFERRAL_HEADER_DATA}/>
      {/* <PaginatedTable rowsData={REFERRAL_ROWS_DATA} headerData={REFERRAL_HEADER_DATA}/> */}
      </TableWrapper>
    </div>
  )
}

export default Referrals;