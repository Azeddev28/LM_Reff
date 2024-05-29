import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { REFERRAL_HEADER_DATA } from "../../utils/constants";
import PaginatedTable from "../../components/Table/PaginatedTable";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { setUserName } from "../../redux/slices/authSlice";
import { useGetProfileQuery } from "../../redux/slices/referralSlice";
import { useGetReferralsQuery } from "../../redux/slices/referralSlice";
import { getRoute } from "../../api/BackendRoutes";




const TableWrapper = styled("div")(({}) => ({
  marginTop: "20px",
}));

const Referrals = () => {
  const [searchValue, setSearchValue] = useState(null);
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetProfileQuery();
  const userName = isSuccess ? data.name : "";
  if ((isSuccess, data)) {
    dispatch(setUserName(data.name));
  }

  return (
    <div>
      <DashboardHeader
        heading={
          <>
            Greetings, <span style={{ color: '#3B5CA9' }}>{userName}.</span>
          </>
        }
        subHeading="Referral Trackers"
        placeHolder="Search by patient name"
        setSearchValue={setSearchValue}
      />
      <TableWrapper>
        <PaginatedTable
          query={useGetReferralsQuery}
          headerData={REFERRAL_HEADER_DATA}
          pageData={{
            url:`${import.meta.env.VITE_URL}${getRoute('referralList')}`,
            search: searchValue,
          }}
          redirectToDetailPage={true}
        />
      </TableWrapper>
    </div>
  );
};

export default Referrals;
