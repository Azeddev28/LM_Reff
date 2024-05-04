import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { useGetEmployeesQuery } from "../../redux/slices/referralAPiSlice";
import { EMPLOYER_HEADER_DATA } from "../../utils/constants";
import PaginatedTable from "../../components/Table/PaginatedTable";
import styled from "@emotion/styled";

const TableWrapper = styled("div")(({}) => ({
  marginTop: "20px",
}));

const EmployerList = () => {
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <DashboardHeader
        heading="Employer List"
        subHeading="Greetings, {User Name}. Search for an employer to check if your patient has a sponsored plan"
        placeHolder="Search by Employer Name"
      />
      <TableWrapper>
        <PaginatedTable
          pageData={{
            url: "http://3.6.94.153/api/users/employer-list",
            search: searchValue,
          }}
          query={useGetEmployeesQuery}
          headerData={EMPLOYER_HEADER_DATA}
        />
      </TableWrapper>
    </div>
  );
};

export default EmployerList;
