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

const EmployerList = () => {
  const dispatch = useDispatch();
  
useEffect(() => {
  dispatch(fetchReferrals());
  
}, [dispatch]);

const referrals = useSelector((state) => state.referral.referralList);

console.log("referrals",referrals);

  return (
    <div>
      <DashboardHeader heading="Employer List" 
      subHeading="Greetings, {User Name}. Search for an employer to check if your patient has a sponsored plan"
      placeHolder="Search by Employer Name"
      />
      <TableWrapper>
      <PaginatedTable rowsData={REFERRAL_ROWS_DATA} headerData={REFERRAL_HEADER_DATA}/>
      </TableWrapper>
    </div>
  )
}

export default EmployerList;