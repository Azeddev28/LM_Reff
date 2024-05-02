import React, {  useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {  REFERRAL_HEADER_DATA } from '../../utils/constants';
import PaginatedTable from "../../components/Table/PaginatedTable";
import styled from "@emotion/styled";
import {useGetReferralsQuery} from "../../redux/slices/referralAPiSlice"
import { set } from "date-fns";

const TableWrapper = styled('div')(({ }) => ({
  marginTop: '20px',
}));

const Referrals = () => {
  const [searchValue, setSearchValue] = useState(null);
 
  return (
      <div>
        <DashboardHeader
          heading="Referral Tracker"
          subHeading="Greetings, {User Name}. Click on a patient to update their referral"
          placeHolder="Search by Patient Name"
          setSearchValue={setSearchValue}
        />
        <TableWrapper>
          <PaginatedTable query={useGetReferralsQuery} headerData={REFERRAL_HEADER_DATA} pageData={{url: 'http://3.6.94.153/api/referrals/' , search:searchValue }}/>
        </TableWrapper>
      </div>
    
  );
}

export default Referrals;
