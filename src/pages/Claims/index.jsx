import React,{ useEffect,useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import  {REFERRAL_ROWS_DATA,CLAIMS_HEADER_DATA} from '../../utils/constants';
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useDispatch, useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { useGetClaimsQuery } from "../../redux/slices/referralAPiSlice";
// import { fetchClaims } from "../../redux/slices/referralSlice";


const TableWrapper=styled('div')(({})=>({
    marginTop:'20px',
 }));

const Claims = () => {
//   const [claimList,setClaimList]=useState([]);
//   const {
//     data: claims,
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   } = useGetClaimsQuery('http://3.6.94.153/api/claims');
//  console.log("claims",claims);

//   useEffect(() => {
//     if (isSuccess && claims) {
//       setClaimList(claims);
//     }
//   }, [isSuccess, claims]);

  return (
    <div>
      <DashboardHeader heading="Claims Dashboard" 
      subHeading="Greetings, {User Name}. Search for a patient to view the claim status"
      placeHolder="Search by Patient Name"
      />
      <TableWrapper>
      <PaginatedTable  pageData={{url: 'http://3.6.94.153/api/claims'}} headerData={CLAIMS_HEADER_DATA} query={useGetClaimsQuery}/>
      </TableWrapper>
    </div>
  )
}

export default Claims;