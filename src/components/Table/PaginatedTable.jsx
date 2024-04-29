import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";


import { useLocation, useNavigate } from "react-router-dom";

const PaginatedTable = ({ headerData, rowsData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const navigate = useNavigate();
  const location = useLocation();
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const extractKeys = () => {
    let keys = [];
    rowsData.forEach((obj) => {
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
  const id=data.uuid;
  // dispatch(fetchReferralDetail(id));
  const currentUrl = location.pathname;
  navigate(`${currentUrl}${id}`,{state:{data:id}});
 
  // console.log("Id",id);
  // const currentUrl = location.pathname;
  
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
            {(rowsPerPage > 0
              ? rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rowsData
            ).map((obj, index) => (       
              <TableRow key={index} onClick={() => (handleDetailPage(obj))}>
                {extractRowValues(obj, keys)?.map((item, index) => (
                    item.key !=="uuid" && 
                    
                    <TableCell  key={index}>{item.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaginatedTable;
