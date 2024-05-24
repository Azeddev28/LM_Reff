import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { useGetEmployeesQuery } from "../../redux/slices/referralSlice";
import { EMPLOYER_HEADER_DATA } from "../../utils/constants";
import PaginatedTable from "../../components/Table/PaginatedTable";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { getRoute } from "../../api/BackendRoutes";

const TableWrapper = styled("div")(({}) => ({
  marginTop: "20px",
}));

const EmployerList = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { userName } = useSelector((state) => state.auth);

  return (
    <div>
      <DashboardHeader
        heading={`Greetings, ${userName}`}
        subHeading={`Employer List`}
        placeHolder="Search by Employer Name"
        setSearchValue={setSearchValue}
      />
      <TableWrapper>
        <PaginatedTable
          pageData={{
            url:`${import.meta.env.VITE_URL}${getRoute('employerList')}`,
            search: searchValue,
          }}
          query={useGetEmployeesQuery}
          headerData={EMPLOYER_HEADER_DATA}
          redirectToDetailPage={false}
        />
      </TableWrapper>
    </div>
  );
};

export default EmployerList;
