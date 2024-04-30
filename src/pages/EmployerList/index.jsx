import React,{ useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import  {REFERRAL_ROWS_DATA,EMPLOYER_HEADER_DATA} from '../../utils/constants';
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useDispatch, useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { fetchEmployerList } from "../../redux/slices/referralSlice";


const TableWrapper=styled('div')(({})=>({
    marginTop:'20px',
 }));

const EmployerList = () => {
const dispatch = useDispatch();
const [employerData,setEmployerData]=useState([]);
useEffect(() => {
  dispatch(fetchEmployerList());
  
}, [dispatch]);

// const employerList = useSelector((state) => state.referral.employerList.results);
let employes;
employes = useSelector((state) => state.referral.employerList.results);

 useEffect(()=>{
  setEmployerData(employes);
},[employes]);



// console.log("referrals",referrals);

  return (
    <div>
      <DashboardHeader heading="Employer List" 
      subHeading="Greetings, {User Name}. Search for an employer to check if your patient has a sponsored plan"
      placeHolder="Search by Employer Name"
      />
      <TableWrapper>
      <PaginatedTable rowsData={employerData} headerData={EMPLOYER_HEADER_DATA}/>
      </TableWrapper>
    </div>
  )
}

export default EmployerList;