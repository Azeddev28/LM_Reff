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
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";

import upSvg from '/sorting-up.svg?url';
import downSvg from '/sorting-down.svg?url';
import { setCurrentPage } from "../../redux/slices/referralSlice";
import { appRoutes } from "../../routes";

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
  padding: "30px 0px",
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

const PageNumber = styled(Box)(({ theme, isHighlighted }) => ({
  backgroundColor: isHighlighted ? "#1976d2" : "transparent",
  color: isHighlighted ? "white" : "black",
  padding: "4px 8px",
  borderRadius: "4px",
  minWidth: "24px",
  textAlign: "center",
}));

const PageNumberWithoutBackground = styled(Box)(({ theme, isHighlighted }) => ({
  color: isHighlighted ? "white" : "black",
  backgroundColor: isHighlighted ? "#1976d2" : "transparent",
  padding: "4px 8px",
  borderRadius: "4px",
  minWidth: "24px",
  textAlign: "center",
}));

const PaginatedTable = ({
  headerData,
  pageData,
  query,
  redirectToDetailPage,
}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const currentPage = useSelector((state) => state.referral.page);

  const [orderingValue, setOrderingValue] = useState(null);
  const [url, setUrl] = useState(pageData.url);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, refetch } = query(url);
  const ROWS_PER_PAGE = 15;
  const [offset, setOffset] = useState((currentPage - 1) * 15);

  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (data?.count) {
      setTotalPages(Math.ceil(data?.count / ROWS_PER_PAGE));
    }
  }, [data]);

  useEffect(() => {
    refetch()
    return () => dispatch(setCurrentPage(1))
  }, [])

  useEffect(() => {
    setOffset(0)
    setInputPage('')
    dispatch(setCurrentPage(1))
    const targetUrl = new URL(pageData.url)
    if (orderingValue !== null && orderingValue !== undefined && offset === 0 && !pageData["search"]) {
      targetUrl.searchParams.append("ordering", orderingValue);
    }
    else if (orderingValue !== null && orderingValue !== undefined && offset === 0 && pageData["search"]) {
      targetUrl.searchParams.append("ordering", orderingValue);
      targetUrl.searchParams.append("search", pageData["search"])
    }
    setUrl(targetUrl.toString())
  }, [orderingValue])

  useEffect(() => {
    const targetUrl = new URL(pageData.url)
    if (offset !== null && offset !== undefined && pageData["search"] && orderingValue === null) {
      targetUrl.searchParams.append("offset", offset.toString())
      targetUrl.searchParams.append("search", pageData["search"])
    }
    else if (offset !== null && offset !== undefined && orderingValue !== null && !pageData["search"] && inputPage !== '') {
      targetUrl.searchParams.append("offset", offset.toString())
      targetUrl.searchParams.append("ordering", orderingValue);
    }
    else if (offset !== null && offset !== undefined && orderingValue !== null && pageData["search"]) {
      targetUrl.searchParams.append("offset", offset.toString())
      targetUrl.searchParams.append("ordering", orderingValue);
      targetUrl.searchParams.append("search", pageData["search"])
    }
    else if (!pageData["search"] && !orderingValue && offset !== 0) {
      targetUrl.searchParams.append("offset", offset.toString())
    }
    setUrl(targetUrl.toString())
  }, [offset])



  useEffect(() => {
    const targetUrl = new URL(pageData.url)
    setOffset(0)
    setInputPage('')
    dispatch(setCurrentPage(1))
    if (pageData["search"] !== null && pageData["search"] !== undefined && !orderingValue) {
      targetUrl.searchParams.append("search", pageData["search"]);
    }
    else if (pageData["search"] !== null && pageData["search"] !== undefined && orderingValue) {
      targetUrl.searchParams.append("search", pageData["search"]);
      targetUrl.searchParams.append("ordering", orderingValue);
    }
    else if (!pageData["search"] && orderingValue !== null) {
      targetUrl.searchParams.append("ordering", orderingValue);
    }
    else if (!pageData["search"]) {
      targetUrl.searchParams.append("offset", offset.toString())
    }
    setUrl(targetUrl.toString())

  }, [pageData.search])


  const extractKeys = () => {
    let keys = [];
    data?.results?.forEach((obj) => {
      keys = keys.concat(Object.keys(obj));
    });
    return Array.from(new Set(keys));
  };

  const keys = extractKeys();

  const extractRowValues = (obj, keys) => {
    return keys
      .filter((key) => obj.hasOwnProperty(key))
      .map((key) => ({ key, value: obj[key] }));
  };

  const handleDetailPage = (data) => {
    const id = data.uuid;
    const detailRoute = appRoutes.referralDetail.path.replace(`:id`, id)
    navigate(detailRoute, { state: { data: id } });
  };

  const handleClickPrevious = () => {
    setLoading(true); 
    if (data?.previous) {
      setUrl(data.previous);
      const newPage = currentPage - 1;
      dispatch(setCurrentPage(newPage));
      setInputPage('')
    }
  };

  const handleClickNext = () => {
    setLoading(true); 
    if (data?.next) {
      setUrl(data.next);
      const newPage = currentPage + 1;
      dispatch(setCurrentPage(newPage));
      setInputPage('')
    }
  };
  
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  

  const handleSortClick = (key) => {
    setLoading(true); 
    setOrderingValue(key);
    setOffset(0);
    setInputPage('');
    setTimeout(() => {
      dispatch(setCurrentPage(1));
      setLoading(false); 
    }, 1000);
  };
  
  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleSearchClick = () => {
    setLoading(true); 
    const newPage = parseInt(inputPage, 10);
    if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
      const newOffset = (newPage - 1) * ROWS_PER_PAGE;
      setOffset(newOffset);
      dispatch(setCurrentPage(newPage));
      setInputPage('');
      setShowAlert(false);
    } else {
      setShowAlert(true);
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
    <>
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          sx={{ position: 'fixed', top: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}
        >
          Page doesn't exist, Maximum pages are {totalPages}
        </Alert>
      )}
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
            disabled={currentPage === 1}
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

          {totalPages > 0 && (
            <Box mx={0.5} style={{ display: "flex", alignItems: "center" }}>

              <PageNumber isHighlighted={currentPage === 1}>1</PageNumber>

              {totalPages > 2 && (
                <PageNumber isHighlighted={!((currentPage === 1) || (currentPage === totalPages))}>
                  {currentPage === 1 ? currentPage + 1 : currentPage === totalPages ? totalPages - 1 : currentPage}
                </PageNumber>
              )}

              <SearchBox style={{ height: "30px", marginRight: "10px", marginLeft: "10px" }}>
                <TextField
                  variant="standard"
                  value={inputPage}
                  onChange={handleInputChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleSearchClick();
                    }
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <SearchIcon
                        style={{ marginRight: "4px", color: "#2F65CB", cursor: "pointer" }}
                        onClick={handleSearchClick}
                      />
                    ),
                  }}
                  style={{ width: "50px", fontSize: "12px", padding: "2px 4px" }}
                />
              </SearchBox>

              <Typography style={{ marginRight: "10px" }}>.......</Typography>

              {totalPages > 2 && (
                <>
                  {currentPage === totalPages ? (
                    <PageNumberWithoutBackground isHighlighted={true}>{totalPages}</PageNumberWithoutBackground>
                  ) : (
                    <PageNumber isHighlighted={false}>{totalPages}</PageNumber>
                  )}
                </>
              )}
            </Box>
          )}






          <IconButton
            style={{
              cursor: "pointer",
              color: !data?.next ? "#BDBDBD" : "inherit",
              height: "16px",
              width: "16px",
            }}
            disabled={currentPage === totalPages}
            onClick={handleClickNext}
          >
            <ArrowForwardIosIcon style={{ height: "16px", width: "16px" }} />
          </IconButton>
        </Pagination>
      </Paper>
    </>
  );
};

export default PaginatedTable;