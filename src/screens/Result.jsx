import React, { useEffect, useState } from "react";
import '../styles/home.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { Download } from "@mui/icons-material";
import { components } from "react-select";
import { Button } from "@mui/material";
import { ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import SearchBuild from './search_build';

const columns = [
  { field: 'Masterid', headerName: 'Masterid', width: 100 },
  { field: 'Company', headerName: 'Company', width: 100 },
  { field: 'CompanyCompanyAddress1', headerName: 'Company Address1', width: 80 },
  { field: 'CompanyCompanyAddress2', headerName: 'Company Address2', width: 80 },
  { field: 'CompanyCountry', headerName: 'Company Country', width: 130 },
  { field: 'CompanyPhone', headerName: 'Company Phone', width: 130 },
  { field: 'CompanyRevenue', headerName: 'Company Revenue', width: 130 },
  { field: 'CompanyState', headerName: 'CompanyState', width: 130 },
  { field: 'CompanyZipCode', headerName: 'CompanyZipCode', width: 130 },
  { field: 'Companycounty', headerName: 'Companycounty', width: 130 },
  { field: 'Companyemployees', headerName: 'Companyemployees', width: 130 },
  { field: 'ContactDirectPhone', headerName: 'ContactDirectPhone', width: 130 },
  { field: 'ContactFirstName', headerName: 'ContactFirstName', width: 130 },
  { field: 'ContactFullName', headerName: 'ContactFullName', width: 130 },
  { field: 'ContactLastName', headerName: 'ContactLastName', width: 130 },
  { field: 'ContactMiddleName', headerName: 'ContactMiddleName', width: 130 },
  { field: 'ContactTitle', headerName: 'ContactTitle', width: 130 },
  { field: 'Contact_Match', headerName: 'Contact_Match', width: 130 },
  { field: 'Contactlevel', headerName: 'Contact Level', width: 130 },
  { field: 'Domain_Match', headerName: 'Domain_Match', width: 130 },
  { field: 'EmailStatus', headerName: 'EmailStatus', width: 130 },
  { field: 'Emailaddress', headerName: 'Email address', width: 130 },
  { field: 'Enteredby', headerName: 'Entered by', width: 130 },
  { field: 'Industry', headerName: 'Industry', width: 130 },
  { field: 'Matching', headerName: 'Matching', width: 130 },
  { field: 'NAICSCode', headerName: 'NAICSCode', width: 130 },
  { field: 'NAICSCodeDescription', headerName: 'NAICSCodeDescription', width: 130 },
  { field: 'SicCode', headerName: 'SicCode', width: 130 },
  { field: 'SicCodeDescription', headerName: 'SicCodeDescription', width: 130 },
  { field: 'TitleDepartment', headerName: 'TitleDepartment', width: 130 },
  { field: 'Verification_Date', headerName: 'Verification_Date', width: 130 },
  { field: 'Verification_Result', headerName: 'Verification_Result', width: 130 },
  { field: 'Webaddress', headerName: 'Webaddress', width: 130 },
  { field: 'companycity', headerName: 'companycity', width: 130 },

];



const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

/*function Result(props) {
  const handleExport = () => {
    const { data } = props.Rows; // Assuming your data is in the 'Rows' prop
    const csvData = data.map((row) => {
      return columns.map((column) => row[column.field]).join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };*/


function Result(props) {
  console.log(props.Rows[0])
  // console.log(props.control)
  let [clickedModify, setClickedModify] = useState(false);
  
  const handleExport = () => {
    let export_xls_data = export_data_format(props.Rows);
    const ws = XLSX.utils.aoa_to_sheet(export_xls_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'result.xlsx');
  };

  const export_data_format = (data) => {
    const headerRow = Object.keys(data[0]);
      const formattedData = [
        headerRow,
        ...data.map((item) =>
          headerRow.map((key) => (item[key] === null ? '' : item[key]))
        ),
      ];
      return formattedData;     
  }

  const navigate = useNavigate();

  const handleModifyClick = () => {
    setClickedModify(true);
  };


  //  }, [props.filter, filterOptions, setRows])
  return (
    <>
      {clickedModify ? <div className="modify"><SearchBuild from={'view_result'} controls={props.control} /></div> : <div>
        <div style={{ display: 'flex', columnGap: '250px', margin: '20px 20px 20px 10px' }} className="export">
          <Button style={{ flex: 1 }} variant="contained" onClick={handleExport}>Export CSV</Button>
          <Button style={{ flex: 1 }} variant="contained" onClick={handleModifyClick}>Modify</Button>
          <Button style={{ flex: 1 }} variant="contained">Save</Button>
        </div>


        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            getRowId={(rows) => rows.Masterid}
            rows={props.Rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            pageSizeOptions={[25, 100]}
            checkboxSelection
          />
        </div></div>}


    </>
  );
}
export default Result;