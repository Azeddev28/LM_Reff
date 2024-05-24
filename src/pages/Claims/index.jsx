import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { CLAIMS_HEADER_DATA } from "../../utils/constants";
import PaginatedTable from "../../components/Table/PaginatedTable";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useGetClaimsQuery } from "../../redux/slices/referralSlice";
import { getRoute } from "../../api/BackendRoutes";

const TableWrapper = styled("div")(({}) => ({
  marginTop: "20px",
}));

const Claims = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { userName } = useSelector((state) => state.auth);

  return (
    <div>
      <DashboardHeader
        heading={`Greetings, ${userName}`}
        subHeading={`Claims Dashboard`}
        placeHolder="Search by Patient Name"
        setSearchValue={setSearchValue}
      />
      <TableWrapper>
        <PaginatedTable
          query={useGetClaimsQuery}
          pageData={{
            url:`${import.meta.env.VITE_URL}${getRoute('claimList')}`,
            search: searchValue,
          }}
          headerData={CLAIMS_HEADER_DATA}
          redirectToDetailPage={false}
        />
      </TableWrapper>
    </div>
  );
};

export default Claims;
