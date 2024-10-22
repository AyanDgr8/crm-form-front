// src/components/routes/Other/Header/FileUpload.js

import React, { useRef, useState } from "react";
import Papa from 'papaparse'; 
import * as XLSX from 'xlsx'; 
import "./Header.css";

const FileUpload = () => {
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState("");

    // Required headers to match the database columns
    const requiredHeaders = [
        "first_name", "last_name", "phone_no", "email_id", 
        "date_of_birth", "address", "company_name", "C_unique_id", 
        "contact_type", "source", "disposition", "agent_name", "date_created"
    ];

    // Handle file upload and parsing logic
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const allowedTypes = [
                "application/vnd.ms-excel", // .xls
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                "text/csv" // .csv
            ];
    
            if (allowedTypes.includes(fileType)) {
                setSelectedFileName(file.name);
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = event.target.result;
                    if (fileType === "text/csv") {
                        parseCSV(data);
                    } else {
                        parseExcel(data);
                    }
                };
                reader.readAsBinaryString(file); // Read the file
            } else {
                setSelectedFileName("");
                alert("Please select a valid CSV or Excel file.");
            }
        }
    };
    
    // Parse CSV file and validate headers
    const parseCSV = (data) => {
        Papa.parse(data, {
            header: true,
            complete: (result) => {
                const headers = result.meta.fields;
                if (validateHeaders(headers)) {
                    const processedData = result.data.map(row => processRow(row, headers));
                    sendFileData(processedData);
                } else {
                    alert("Invalid file format. Please upload a file with the correct headers.");
                }
            }
        });
    };
    
    // Parse Excel file and validate headers
    const parseExcel = (data) => {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        const headers = worksheet[0]; // First row is the headers
        if (validateHeaders(headers)) {
            const rows = worksheet.slice(1).map(row => processRow(row, headers)); // Skip header
            sendFileData(rows);
        } else {
            alert("Invalid file format. Please upload a file with the correct headers.");
        }
    };
    
    // Function to handle row processing, including date conversion
    const processRow = (row, headers) => {
        const processedRow = {};
        headers.forEach((header, index) => {
            const cellValue = row[index];
            // Convert date fields from Excel's serial date format
            if (header === 'date_of_birth' || header === 'date_created') {
                processedRow[header] = convertExcelDate(cellValue); // Use a conversion function
            } else {
                processedRow[header] = cellValue || null;
            }
        });
        return processedRow;
    };
        
    // Function to convert Excel serial date to a readable format
    const convertExcelDate = (excelDate) => {
        if (typeof excelDate === 'number') {
            const date = new Date(( excelDate - (25567 + 2)) * 86400 * 1000); // Excel's epoch starts on 1900-01-01
            return date.toISOString().split('T')[0]; // Return the date in YYYY-MM-DD format
        }
        return excelDate; // If it's not a number, return the original value
    };
        
    const validateHeaders = (headers) => {
        console.log('Headers from file:', headers); // Log headers for troubleshooting
        return requiredHeaders.every(header => headers.includes(header)); // Ensure all required headers are present
    };
    
    const sendFileData = (data) => {
        const apiUrl = process.env.REACT_APP_API_URL; // Get the base URL from the environment variable
        // Send the entire filtered dataset to the backend
        fetch(`${apiUrl}/upload-customer-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ customers: data })
        })
        .then(response => {
            if (response.ok) {
                alert("File uploaded successfully.");
            } else {
                alert("Failed to upload file.");
            }
        })
        .catch(error => {
            console.error("Error uploading file:", error);
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const allowedTypes = [
                "application/vnd.ms-excel", // .xls
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                "text/csv" // .csv
            ];
    
            if (allowedTypes.includes(fileType)) {
                setSelectedFileName(file.name);
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const binaryString = String.fromCharCode.apply(null, data);
                    fileType === "text/csv" ? parseCSV(binaryString) : parseExcel(binaryString);
                };
                reader.readAsArrayBuffer(file);// Read the file
            } else {
                setSelectedFileName("");
                alert("Please select a valid CSV or Excel file.");
            }
        }
    };
    
    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="file-upload-section">
        <img 
            src="/uploads/file.svg"
            className="file-icon"
            alt="file upload icon"
            aria-label="Upload file"
            onClick={handleIconClick}
        />
        {selectedFileName && <span>{selectedFileName}</span>}
        <span className="file-upl">File Upload</span>
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".csv, .xls, .xlsx"
            onChange={handleFileChange}
        />
        </div>
    );
};
    
export default FileUpload;