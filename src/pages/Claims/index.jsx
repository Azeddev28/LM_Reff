import React,{ useEffect,useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import  {REFERRAL_ROWS_DATA,CLAIMS_HEADER_DATA} from '../../utils/constants';
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useDispatch, useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { fetchClaims } from "../../redux/slices/referralSlice";


const TableWrapper=styled('div')(({})=>({
    marginTop:'20px',
 }));

const Claims = () => {
  const dispatch = useDispatch();
  const [claimList,setClaimList]=useState([]);
useEffect(() => {
  dispatch(fetchClaims());
  
}, [dispatch]);

let claims;
 claims = useSelector((state) => state.referral.claims.results);

 useEffect(()=>{
  setClaimList(claims);
},[claims]);

  return (
    <div>
      <DashboardHeader heading="Claims Dashboard" 
      subHeading="Greetings, {User Name}. Search for a patient to view the claim status"
      placeHolder="Search by Patient Name"
      />
      <TableWrapper>
      <PaginatedTable rowsData={claimList} headerData={CLAIMS_HEADER_DATA}/>
      </TableWrapper>
    </div>
  )
}

export default Claims;