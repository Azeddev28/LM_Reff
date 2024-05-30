import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useSelector , useDispatch} from "react-redux";

import upSvg from '/sorting-up.svg?url';
import downSvg from '/sorting-down.svg?url';
import { setCurrentPage } from "../../redux/slices/referralSlice";

const ProgressWrapper = styled("div")(({ }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
}));

const Pagination = styled("div")(({ }) => ({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  marginRight: "50px",
  flexDirection: "row",
  height: "40px",
  gap: "0px",
}));

const Header = styled("div")(({ }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
}));

const Sorter = styled("div")(({ }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
}));

const SearchBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: "2px 8px",
}));

const PaginatedTable = ({
  headerData,
  pageData,
  query,
  redirectToDetailPage,
}) => {


  const navigate = useNavigate();
  const location = useLocation();
  const dispatch= useDispatch()

  const currentPage = useSelector((state) => state.referral.page);

  const [orderingValue, setOrderingValue] = useState(null);
  const [url, setUrl] = useState(pageData.url);
  const [loading, setLoading] = useState(false); 
  const { data , isLoading, refetch } = query(url);
  const ROWS_PER_PAGE = 15;
  const [offset, setOffset] = useState((currentPage - 1) * 15);

  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState(''); 


  useEffect(() => {
    if (pageData.search || orderingValue || offset !==null) {
      const targetUrl = generateUrl();
      setUrl(targetUrl);
    }
  }, [ pageData.search, orderingValue, offset]); 

  useEffect(() => {
    if (data?.count) {
      setTotalPages(Math.ceil(data?.count / ROWS_PER_PAGE));
    }
  }, [data]);


  const extractKeys = () => {
    let keys = [];
    data?.results?.forEach((obj) => {
      keys = keys.concat(Object.keys(obj));
    });
    return Array.from(new Set(keys));
  };

  const keys = extractKeys();

  const generateUrl = () => {
    const targetUrl = new URL(pageData.url);
      if (pageData["search"] !== null && pageData["search"] !== undefined) {
      targetUrl.searchParams.append("search", pageData["search"]);
      setOffset(0)
    }
    if (orderingValue !== null && orderingValue !== undefined) {
      targetUrl.searchParams.append("ordering", orderingValue);
    }
      if (offset !== null && offset !== undefined) {
      targetUrl.searchParams.append("offset", offset.toString());
    }
    return targetUrl.toString();
  };

  const extractRowValues = (obj, keys) => {
    return keys
      .filter((key) => obj.hasOwnProperty(key))
      .map((key) => ({ key, value: obj[key] }));
  };

  const handleDetailPage = (data) => {
    const id = data.uuid;
    const currentUrl = location.pathname;
    navigate(`${currentUrl}${id}`, { state: { data: id } });
  };

  const handleClickPrevious = () => {
    if (data?.previous) {
      setUrl(data.previous);
      const newPage = currentPage - 1;
      dispatch(setCurrentPage(newPage)); 
      setOffset((newPage - 1) * ROWS_PER_PAGE); 
    }
  };

  const handleClickNext = () => {
    if (data?.next) {
      setUrl(data.next);
      const newPage = currentPage + 1;
      dispatch(setCurrentPage(newPage)); 
      setOffset((newPage - 1) * ROWS_PER_PAGE); 
    }
  };

  const handleSortClick = (sortKey) => {
    setLoading(true); 
    setOrderingValue(sortKey);
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleSearchClick = () => {
    const newPage = parseInt(inputPage, 10);
     if (newPage > 0 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage))
      const newOffset = (newPage - 1) * ROWS_PER_PAGE;
      setOffset(newOffset);
    }

  };

  const StyledRow = styled(TableRow)((props) => ({
    padding: 8,
    cursor: props.redirectToDetailPage ? "pointer" : "default",
    "&:hover": {
      backgroundColor: "rgba(242, 242, 242, 0.8)",
    },
  }));

  const getDisplayedRows = () => {
    if (data?.results) {
      return data.results
    }
    return [];
  };

  return isLoading || loading ? (
    <ProgressWrapper>
      <CircularProgress size={"7rem"} />
    </ProgressWrapper>
  ) : (
    <Paper>
      <TableContainer sx={{ marginTop: '-20px', border: '1px solid #F1F1F2' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#F9F9F9' }}>
            <TableRow>
              {headerData.map((columnInfo) => (
                <TableCell key={columnInfo.key} sx={{ minWidth: 150 }}>
                  <Header style={{ fontSize: "13px", color: "#7E8299", fontWeight: "600" }}>
                    {columnInfo.display}
                    <Sorter>
                      <img
                        src={downSvg}
                        alt="Sort Ascending"
                        style={{
                          cursor: 'pointer',
                          height: '7px',
                          width: '14px',
                          transition: 'height 0.3s, width 0.3s',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.height = '10px';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.height = '7px';
                        }}
                        onClick={() => {
                          handleSortClick(columnInfo.sortKey);
                        }}
                      />
                      <img
                        src={upSvg}
                        alt="Sort Descending"
                        style={{
                          cursor: 'pointer',
                          height: '7px',
                          width: '14px',
                          transition: 'height 0.3s, width 0.3s',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.height = '10px';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.height = '7px';
                        }}
                        onClick={() => {
                          handleSortClick(`-${columnInfo.sortKey}`);
                        }}
                      />
                    </Sorter>
                  </Header>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.count > 0 ? (
              <>
                {getDisplayedRows().map((obj, index) => (
                  <StyledRow
                    key={index}
                    redirectToDetailPage={redirectToDetailPage}
                    style={{
                      cursor: redirectToDetailPage ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (redirectToDetailPage) {
                        handleDetailPage(obj);
                      }
                    }}
                  >
                    {extractRowValues(obj, keys)?.map(
                      (item, index) =>
                        item.key !== "uuid" && (
                          <TableCell key={index} style={{ color: "#A1A5B7", fontWeight: "600", fontSize: "12px" }}>{item.value}</TableCell>
                        )
                    )}
                  </StyledRow>
                ))}
              </>
            ) : (
              <TableRow
                variant="h4"
                style={{ margin: "20px auto", textAlign: "center", }}
              >
                <TableCell
                  colSpan={headerData.length}
                  style={{ textAlign: "center" }}
                >
                  <Typography variant="h6">No Record Found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination>
        <IconButton
          disabled={!data?.previous}
          style={{
            cursor: "pointer",
            color: !data?.previous ? "#BDBDBD" : "inherit",
            height: "16px",
            width: "16px",
          }}
          onClick={handleClickPrevious}
        >
          <ArrowBackIosNewIcon
            style={{
              height: "16px",
              width: "16px",
            }}
          />
        </IconButton>

        <Box mx={2}>{`Page ${currentPage} of`}</Box> 
        <SearchBox>
          <TextField
            variant="standard"
            placeholder="Page"
            value={inputPage}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <SearchIcon
                  style={{ marginRight: "4px", color: "#BDBDBD", cursor: "pointer" }}
                  onClick={handleSearchClick}
                />
              ),
            }}
            style={{ width: "50px", fontSize: "12px", padding: "2px 4px" }}
          />
        </SearchBox>
        <Box mx={2}>{`${totalPages}`}</Box>

        <IconButton
          style={{
            cursor: "pointer",
            color: !data?.next ? "#BDBDBD" : "inherit",
            height: "16px",
            width: "16px",
          }}
          disabled={!data?.next}
          onClick={handleClickNext}
        >
          <ArrowForwardIosIcon style={{ height: "16px", width: "16px" }} />
        </IconButton>
      </Pagination>
    </Paper>
  );
};

export default PaginatedTable;
