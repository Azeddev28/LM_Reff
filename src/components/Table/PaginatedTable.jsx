import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {Table ,TableBody,TableCell,TableContainer, TableHead,TableRow,Paper,Box , Button} from "@mui/material";
// import { useGetReferralsQuery } from "../../redux/slices/referralAPiSlice";

import { useLocation, useNavigate } from "react-router-dom";

const PaginatedTable = ({ headerData, response, fetchData ,loading }) => {
  console.log("Response",response);
  const [nextPageUrl,setNextPageUrl]=useState("");
  const [previousPageUrl,setPreviuosPageUrl]=useState("");
  const [count,setCount]=useState();
  const [rowsData,setRowsData]=useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(()=>{
    setRowsData(response?.results);
    setNextPageUrl(response?.next);
    setPreviuosPageUrl(response?.previous);
    setCount(response?.count);
    // setTotalPages(response?.count);
  },[response])

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 2));
    } else {
      setTotalPages(0);
    }
  }, [rowsData]);
   

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

  const handleClickPreviuos =()=>{
    console.log("page",page)
    console.log("totalPages",totalPages);
   if (page > 1){
    console.log("less than 1");
    setPage(page - 1)
   }
     
       
  }

  const handleClickNext =()=>{
    if (page <= totalPages) {
      setPage(page + 1)}
      
    // console.log('next',nextPageUrl);
}
  console.log("responseData",rowsData);
  return (
   loading ? (<CircularProgress/>) :
    (<Paper>
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
            {rowsData?.map((obj, index) => (
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
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Button
        variant="contained"
        color="primary"
        disabled={page === 1}
        onClick={handleClickPreviuos}
      >
        Back
      </Button>
      <Box mx={2}>{`Page ${page} of ${totalPages}`}</Box>
      <Button
        variant="contained"
        color="primary"
        disabled={page === totalPages}
        onClick={handleClickNext}
      >
        Next
      </Button>
    </Box>
    </Paper>)
 
);
};

export default PaginatedTable;
