import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { REFERRAL_HEADER_DATA } from "../../utils/constants";
import PaginatedTable from "../../components/Table/PaginatedTable";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useGetReferralsQuery } from "../../redux/slices/referralAPiSlice";
import { set } from "date-fns";
import { getRoute } from "../../api/BackendRoutes";

const TableWrapper = styled("div")(({}) => ({
  marginTop: "20px",
}));

const Referrals = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { userName } = useSelector((state) => state.auth);
  return (
    <div>
      <DashboardHeader
        heading="Referral Tracker"
        subHeading={`Greetings, ${userName}. Click on a patient to update their referral`}
        placeHolder="Search by Patient Name"
        setSearchValue={setSearchValue}
      />
      <TableWrapper>
        <PaginatedTable
          query={useGetReferralsQuery}
          headerData={REFERRAL_HEADER_DATA}
          pageData={{
            url: getRoute("referralList"),
            search: searchValue,
          }}
          navigateDetail={true}
        />
      </TableWrapper>
    </div>
  );
};

export default Referrals;
