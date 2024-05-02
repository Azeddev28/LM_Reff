import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import { REFERRAL_ROWS_DATA, REFERRAL_HEADER_DATA } from '../../utils/constants';
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useDispatch, useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { fetchReferrals } from "../../redux/slices/referralSlice";
import {useGetReferralsQuery} from "../../redux/slices/referralAPiSlice"
import { set } from "date-fns";

const TableWrapper = styled('div')(({ }) => ({
  marginTop: '20px',
}));

const Referrals = () => {
  // const [referralList, setRefferalList] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchReferrals());
  // }, [dispatch]);
  // useEffect(() => {
  //   if (referralsInfo?.results && !isLoading) {
  //     setRefferalList(referralsInfo.results);
  //   }
  // }, [referralsInfo]);

  useEffect(() => {
    // console.log(referralsInfo, "Ye")
    // if (isSuccess && referralsInfo) {
    //   setRefferalList(referralsInfo);
    // }
    // console.log(referralList)
  }, []);


  // setRefferalList(referralsInfo?.results);
  // console.log("REferralsInfo",referralsInfo?.results);
  // const referrals = useSelector((state) => state.referral.referralData.results);
  // const loading = useSelector((state) => state.referral.loading);

  // useEffect(() => {
  //   setRefferalList(referrals);
  // }, [referrals]);

  return (
      <div>
        <DashboardHeader
          heading="Referral Tracker"
          subHeading="Greetings, {User Name}. Click on a patient to update their referral"
          placeHolder="Search by Patient Name"
        />
        <TableWrapper>
          <PaginatedTable query={useGetReferralsQuery} headerData={REFERRAL_HEADER_DATA} pageData={{url: 'http://3.6.94.153/api/referrals'}}/>
        </TableWrapper>
      </div>
    
  );
}

export default Referrals;
