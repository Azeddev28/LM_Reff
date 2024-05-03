import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {Table ,TableBody,TableCell,TableContainer, TableHead,TableRow,Paper,Box , Button, Typography} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styled from "@emotion/styled";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
const Pagination= styled('div')(({ }) => ({ 
  display:'flex',
  justifyContent:'end',
  alignItems:'center',
  marginRight:'50px',
  flexDirection:'row',
  height:'40px',
  gap:'10px',
})); 

const Header=styled('div')(({ }) => ({ 
  display:"flex",
  flexDirection:'row',
  gap:'10px',
  alignItems:'center',
})); 

const Sorter=styled('div')(({ }) => ({ 
  display:"flex",
  flexDirection:'column',
  gap:'0px'
})); 



const PaginatedTable = ({ headerData, pageData,query }) => { 
  
  const generateUrl = () => {
    const targetUrl = new URL(pageData.url);
      if (pageData['search'] !== null && pageData['search'] !== undefined) {
        targetUrl.searchParams.append(key, pageData['search']);
      }
      if (orderingValue !== null && orderingValue !== undefined) {
        targetUrl.searchParams.append('ordering', orderingValue);
      }
    return targetUrl.toString()
  }
  const [orderingValue, setOrderingValue] = useState(null);
  const [url, setUrl] = useState(pageData.url)
  const { data, isLoading, refetch } =query(url);
  const ROWS_PER_PAGE = 2;
  const [changePage, setChangePage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    if(data?.count){
      setTotalPages(Math.ceil(data?.count / ROWS_PER_PAGE))
    }
    if(pageData.search || orderingValue){
      const targetUrl = generateUrl();
      setUrl(targetUrl);
    }
    if (data && changePage) {
      setUrl(data[changePage]);
      setChangePage('')
    }
    
  }, [data, url, changePage, pageData.search, orderingValue]);
   

  const extractKeys = () => {
    let keys = [];
    data?.results?.forEach((obj) => {
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
    if (page < totalPages) {
      setPage(page + 1)}
      refetch()
      setChangePage('next')
    
}
 
  return (
   isLoading ? (<CircularProgress/>) :
    (<Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerData.map((columnInfo) => (
                <TableCell key={columnInfo.key}>
                  <Header >
                  {columnInfo.display}
                  <Sorter>
                  <KeyboardArrowUpIcon  onClick={()=>{setOrderingValue(columnInfo.sortKey)}}/>
                  {/* <HorizontalRuleIcon/> */}
                  <KeyboardArrowDownIcon onClick={()=>{
                    setOrderingValue(`-${columnInfo.sortKey}`)}}/>
                  </Sorter>
                  </Header>
                  </TableCell>
              ))}
            </TableRow>
          </TableHead>
         { data?.count > 0  ? (<TableBody>
            {data?.results?.map((obj, index) => (
              <TableRow key={index} onClick={() => (handleDetailPage(obj))}>
                {extractRowValues(obj, keys)?.map((item, index) => (
                  item.key !== "uuid" && 
                  <TableCell key={index}>{item.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>) : (<Typography variant="h4" style={{margin:'20px auto' , textAlign:'center'}}>No Record Found</Typography>)}
        </Table>
      </TableContainer>
      <Pagination  >
      <ArrowBackIosNewIcon  
        disabled={page === 1}
        onClick={handleClickPreviuos}/>

      <Box mx={2}>{`Page ${page} of ${totalPages}`}</Box>
      <ArrowForwardIosIcon  
        disabled={page === totalPages}
        onClick={handleClickNext} />
      
    </Pagination>
    </Paper>) 
    
 
);
};

export default PaginatedTable;
