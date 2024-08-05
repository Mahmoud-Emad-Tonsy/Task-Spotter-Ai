
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Papa from "papaparse";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Container,
  Typography,
  TablePagination,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FMSCAViewer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});

  const columns = useMemo(
    () => [
      "Created_DT",
      "Modified_DT",
      "Entity",
      "Operating status",
      "Legal name",
      "DBA name",
      "Physical address",
      "Phone",
      "DOT",
      "MC/MX/FF",
      "Power units",
      "Out of service date",
    ],
    []
  );

  useEffect(() => {
    const initialFilters = columns.reduce((acc, column) => {
      acc[column.toLowerCase().replace(/\s+/g, "_")] = "";
      return acc;
    }, {});
    setFilters(initialFilters);
  }, [columns]);

  useEffect(() => {
    const fetchData = async () => {
      const csvUrl =
        "https://docs.google.com/spreadsheets/d/1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE/export?format=csv";
      try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV data:", error);
            setError(error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleFilterChange = useCallback(
    (column) => (event) => {
      setFilters((prev) => ({
        ...prev,
        [column]: event.target.value,
      }));
    },
    []
  );

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.keys(filters).every((key) =>
        row[key]
          ? String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
          : true
      )
    );
  }, [data, filters]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page, rowsPerPage]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        FMSCA Data Viewer
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  <TextField
                    label={column}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filters[column.toLowerCase().replace(/\s+/g, "_")]} 
                    onChange={handleFilterChange(
                      column.toLowerCase().replace(/\s+/g, "_")
                    )}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>
                        <Skeleton variant="text" width="100%" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>
                        {row[column.toLowerCase().replace(/\s+/g, "_")]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </div>
  );
};

export default FMSCAViewer;
