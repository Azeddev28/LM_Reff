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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styled from "@emotion/styled";

import upSvg from '../../../public/sorting-up.svg';
import downSvg from '../../../public/sorting-down.svg';

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

const PaginatedTable = ({
  headerData,
  pageData,
  query,
  redirectToDetailPage,
}) => {
  const generateUrl = () => {
    const targetUrl = new URL(pageData.url);
    if (pageData["search"] !== null && pageData["search"] !== undefined) {
      targetUrl.searchParams.append("search", pageData["search"]);
    }
    if (orderingValue !== null && orderingValue !== undefined) {
      targetUrl.searchParams.append("ordering", orderingValue);
    }
    return targetUrl.toString();
  };
  const [orderingValue, setOrderingValue] = useState(null);
  const [url, setUrl] = useState(pageData.url);
  const { data, isLoading, refetch } = query(url);
  const ROWS_PER_PAGE = 9;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data?.count) {
      setTotalPages(Math.ceil(data?.count / ROWS_PER_PAGE));
    }
    if (pageData.search || orderingValue) {
      const targetUrl = generateUrl();
      setUrl(targetUrl);
    }
  }, [data, url, pageData.search, orderingValue]);

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
    const currentUrl = location.pathname;
    navigate(`${currentUrl}${id}`, { state: { data: id } });
  };

  const handleClickPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleClickNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
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
      const startIndex = (page - 1) * ROWS_PER_PAGE;
      return data.results.slice(startIndex, startIndex + ROWS_PER_PAGE);
    }
    return [];
  };

  return isLoading ? (
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
                <TableCell key={columnInfo.key}>
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
                          setOrderingValue(columnInfo.sortKey);
                        }}
                      />
                       <img
                        src={upSvg}
                        alt="Sort Decending"
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
                          setOrderingValue(`-${columnInfo.sortKey}`);
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
          disabled={page === 1 || data?.count === 0}
          style={{
            cursor: "pointer",
            color: page === 1 || data?.count === 0 ? "#BDBDBD" : "inherit",
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

        {data?.count > 1 ? (
          <Box mx={2}>{`Page ${page} of ${totalPages}`}</Box>
        ) : (
          <Box>Page 0 of 0</Box>
        )}
        <IconButton
          style={{
            cursor: "pointer",
            color: page === totalPages || totalPages === 0 ? "#BDBDBD" : "inherit",
            height: "16px",
            width: "16px",
          }}
          disabled={page === totalPages || data?.count === 0}
          onClick={handleClickNext}
        >
          <ArrowForwardIosIcon style={{ height: "16px", width: "16px" }} />
        </IconButton>
      </Pagination>
    </Paper>
  );
};

export default PaginatedTable;
