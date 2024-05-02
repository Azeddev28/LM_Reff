import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {Table ,TableBody,TableCell,TableContainer, TableHead,TableRow,Paper,Box , Button} from "@mui/material";
// import { useGetReferralsQuery } from "../../redux/slices/referralAPiSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { useGetReferralsQuery } from "../../redux/slices/referralAPiSlice";
import { useDispatch } from "react-redux";

const PaginatedTable = ({ headerData, pageData }) => {
  const [url, setUrl] = useState(pageData.url);
  const { data, isLoading, isError, refetch } = useGetReferralsQuery(url);

  // const { data, isLoading, isError, refetch }  = useGetReferralsQuery(pageData.url)
  const [count,setCount]=useState();
  const [changePage, setChangePage] = useState('');
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && changePage) {
      // Update url to the value received from the API response
      setUrl(data[changePage]);
      setChangePage('')
    }
    setPageInfo(data);
    setCount(data?.count);
    // setTotalPages(response?.count);
    if (count) {
      setTotalPages(Math.ceil(count / 2));
    } else {
      setTotalPages(0);
    }
    
  }, [data, pageInfo, url, changePage]);
   

  const extractKeys = () => {
    let keys = [];
    pageInfo?.results?.forEach((obj) => {
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
   if (page > 1){
    setPage(page - 1)
   }
   refetch()
   setChangePage('previous') 
       
  }

  const handleClickNext =()=>{
    if (page <= totalPages) {
      setPage(page + 1)}
      refetch()
      setChangePage('next')
      // setPageInfo(useGetReferralsQuery(pageData.next))
    // console.log('next',nextPageUrl);
}
  console.log("responseData",pageInfo);
  return (
   isLoading ? (<CircularProgress/>) :
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
            {pageInfo?.results?.map((obj, index) => (
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
