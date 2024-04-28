import React,{ useEffect } from "react";
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
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchReferrals());
  }, [dispatch]);

const referrals = useSelector((state) => state.referral.referralList);



  return (
    <div>
      <DashboardHeader heading="Referral Tracker" 
      subHeading="Greetings, {User Name}. Click on a patient to update their referral"
      placeHolder="Search by Patient Name"
      />
      <TableWrapper>
      <PaginatedTable rowsData={REFERRAL_ROWS_DATA} headerData={REFERRAL_HEADER_DATA}/>
      </TableWrapper>
    </div>
  )
}

export default Referrals;