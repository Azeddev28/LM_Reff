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
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <DashboardHeader heading="Claims Dashboard" 
      subHeading="Greetings, {User Name}. Search for a patient to view the claim status"
      placeHolder="Search by Patient Name"
      setSearchValue={setSearchValue}
      />
      <TableWrapper>
      <PaginatedTable query={useGetClaimsQuery} pageData={{url: 'http://3.6.94.153/api/claims',search:searchValue }} headerData={CLAIMS_HEADER_DATA} />
      </TableWrapper>
    </div>
  )
}

export default Claims;