// // src/App.js
// import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
//   TextField,
//   Container,
//   Typography,
// } from "@mui/material";

// function App() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const csvUrl =
//           "https://docs.google.com/spreadsheets/d/1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE/export?format=csv";
//         const response = await fetch(csvUrl);
//         const csvData = await response.text();

//         Papa.parse(csvData, {
//           header: true,
//           complete: (results) => {
//             setData(results.data);
//             setLoading(false);
//           },
//           error: (error) => {
//             console.error("Error parsing CSV data:", error);
//             setError(error);
//             setLoading(false);
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching CSV data:", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const filteredData = data.filter((row) =>
//     Object.values(row).some((val) =>
//       String(val).toLowerCase().includes(filter.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         FMSCA Data Viewer
//       </Typography>
//       <TextField
//         label="Search"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         onChange={handleFilterChange}
//       />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Created_DT</TableCell>
//               <TableCell>Modifed_DT</TableCell>
//               <TableCell>Entity</TableCell>
//               <TableCell>Operating status</TableCell>
//               <TableCell>Legal name</TableCell>
//               <TableCell>DBA name</TableCell>
//               <TableCell>Physical address</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>DOT</TableCell>
//               <TableCell>MC/MX/FF</TableCell>
//               <TableCell>Power units</TableCell>
//               <TableCell>Out of service date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((row, index) => (
//               <TableRow key={index}>
//                 {Object.values(row).map((value, i) => (
//                   <TableCell key={i}>{value}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         count={Math.ceil(filteredData.length / rowsPerPage)}
//         page={page}
//         onChange={handleChangePage}
//         color="primary"
//         style={{ marginTop: "20px" }}
//       />
//     </Container>
//   );
// }

// export default App;

import React from 'react'
import FMSCAViewer from './components/FMSCAViewer'
import './App.css'
const App = () => {
  return (
    <div>
    <FMSCAViewer/>
    </div>
  )
}

export default App
