import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { fetchReferrals } from "../../redux/slices/referralSlice";
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from "react-router-dom";

const PaginatedTable = ({ headerData, rowsData, fetchData }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  console.log("RowsData",rowsData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTotalPages(Math.ceil(rowsData?.length / 5));
  }, [rowsData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // fetchReferrals(newPage);
  };

  const extractKeys = () => {
    let keys = [];
    rowsData?.forEach((obj) => {
      keys = keys.concat(Object.keys(obj));
    });
    return Array.from(new Set(keys)); // Get unique keys
  };

  const keys = extractKeys();

  const extractRowValues = (obj, keys) => {
    return keys
      .filter(key => obj.hasOwnProperty(key))
      .map(key => ({ key, value: obj[key] }));
  };

  const handleDetailPage = (data) => {
    const id = data.uuid;
    const currentUrl = location.pathname;
    navigate(`${currentUrl}${id}`, { state: { data: id } });
  };

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerData.map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsData?.length > 0
              ? rowsData?.slice(page * 5, page * 5 + 5)
              : rowsData
            )?.map((obj, index) => (
              <TableRow key={index} onClick={() => (handleDetailPage(obj))}>
                {extractRowValues(obj, keys)?.map((item, index) => (
                  item.key !== "uuid" && 
                  <TableCell key={index}>{item.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        labelRowsPerPage={<div>Rows per page</div>}
        SelectProps={{
          IconComponent: ArrowDropDownIcon,
          disabled: true
        }}
      /> */}
    </Paper>
  );
};

export default PaginatedTable;
