import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { CLAIMS_HEADER_DATA } from "../../utils/constants";
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useGetClaimsQuery } from "../../redux/slices/referralAPiSlice";

const TableWrapper = styled("div")(({}) => ({
  marginTop: "20px",
}));

const Claims = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { userName } = useSelector((state) => state.auth);
  console.log("UserName", userName);
  return (
    <div>
      <DashboardHeader
        heading="Claims Dashboard"
        subHeading={`Greetings , ${userName}. Search for a patient to view the claim status`}
        placeHolder="Search by Patient Name"
        setSearchValue={setSearchValue}
      />
      <TableWrapper>
        <PaginatedTable
          query={useGetClaimsQuery}
          pageData={{
            url: "http://3.6.94.153/api/claims",
            search: searchValue,
          }}
          headerData={CLAIMS_HEADER_DATA}
          navigateDetail={false}
        />
      </TableWrapper>
    </div>
  );
};

export default Claims;
