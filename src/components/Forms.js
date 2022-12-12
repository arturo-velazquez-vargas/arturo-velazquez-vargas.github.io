
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, InputGroup } from '@themesberg/react-bootstrap';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { Loading } from '../pages/tables/theme-sources/material-ui/components/loading';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Importer, ImporterField } from "react-csv-importer";
// theme CSS for React CSV Importer
import "react-csv-importer/dist/index.css";
import { Architecture } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';


const URL_UPLOAD_CSV_FILE = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/multipart-file/upload-filePart';
const URL_CREATE_BATCH = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/products/create-product-batch';
const https = require('https');

export const GeneralInfoForm = () => {
  const [file, setFile] = useState()
  const [successUpload, setSuccessUpload] = useState(false);
  const [faileUpload, setFaileUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  // TODO: Create function to send file to backend
  const handleFileUpload = (e) => {
    setFile(e.target.files[0])
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    setLoading(true);
    axios.post(URL_UPLOAD_CSV_FILE, formData, config).then((response) => {
      setSuccessUpload(true);
      setLoading(false);
    }).catch(function (error) {
      console.log(file);
      console.log(error);
      setFaileUpload(true);
      setLoading(false);
    });
  }

  return (
    <Paper>
      <Card border="light" className="bg-white shadow-sm mb-4" >
        <Card.Body >
          <h4>Import from csv file</h4>

          <Importer
            chunkSize={10000} // optional, internal parsing chunk size in bytes
            assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
            restartable={false} // optional, lets user choose to upload another file when import is complete
            onStart={({ file, fields }) => {
              // optional, invoked when user has mapped columns and started import
              console.log("starting import of file", file, "with fields", fields);
            }}
            processChunk={async (rows) => {
              const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
              });
              // required, receives a list of parsed objects based on defined fields and user column mapping;
              // may be called several times if file is large
              // (if this callback returns a promise, the widget will wait for it before parsing more data)
              console.log("received batch of rows", rows);
              const user = JSON.parse(localStorage.getItem("user"));
              console.log('For username ',user );

              var employees = [];
              rows.forEach(row => {
                var employee = {
                  "asin": row.asin,
                  "supplierLink": row.supplierLink,
                  "supplier": row.supplier,
                  "buyCost": row.buyCost,
                };
                employees.push(employee);
              });
              console.log(employees);
              let URL_ADD_CREATION_BATCH_USERNAMR = `${URL_CREATE_BATCH}?username=${user.username}`;
              console.log('URL FOR BATCH ', URL_ADD_CREATION_BATCH_USERNAMR);

              fetch(URL_ADD_CREATION_BATCH_USERNAMR , {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(employees),
                agent: httpsAgent,
              })
                .then((data) => {
                  if(data.status == 400){
                    console.log('Error adding notes')
                    ;
                  }else{
                    console.log('Success adding notes');
                  }
                  //newTagValue = '';
                })
                .catch((e) => {
                  // newTagValue = '';
                  console.log('Error adding notes', e);
                });
              // mock timeout to simulate processing
              await new Promise((resolve) => setTimeout(resolve, 500));
            }}
            onComplete={({ file, fields }) => {
              // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
              console.log("finished import of file", file, "with fields", fields);
            }}
            onClose={() => {
              // optional, invoked when import is done and user clicked "Finish"
              // (if this is not specified, the widget lets the user upload another file)
              console.log("importer dismissed");
            }}
          >
            <ImporterField name="asin" label="Asin" />
            <ImporterField name="supplier" label="Supplier" />
            <ImporterField name="supplierLink" label="Supplier link" optional />
            <ImporterField name="buyCost" label="Buy Cost" optional />
          </Importer>
        </Card.Body>
      </Card>
    </Paper>

    // <Paper >
    //   <Card border="light" className="bg-white shadow-sm mb-4" >
    //     <Card.Body >
    //       <h5 className="mb-4">
    //       </h5>
    //       <Form >
    //         <Row>
    //           <Col md={6} className="mb-3">
    //             <Form.Group id="firstName">
    //               {/* <Form.Label>Load products you want to keep track</Form.Label> */}
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col sm={4} className="mb-3">
    //             <Form.Group className="mb-2">
    //               <Button variant="contained" component="label" onChange={handleFileUpload}>
    //                 Select csv file
    //                 <input hidden accept="*.csv" multiple type="file" />
    //               </Button>
    //             </Form.Group>
    //           </Col>
    //          {file!= undefined && <Col sm={4} className="mb-3">
    //            <h5 className="mb-4">{file.name}</h5>
    //           </Col> }
    //         </Row>
    //         <Button variant="outlined" startIcon={<FileUploadIcon />} onClick={handleSubmit}>
    //           Load products
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <Stack sx={{ width: '100%' }} spacing={2}>
    //     {faileUpload && <Alert onClose={() => { setFaileUpload(false); }} severity="warning">There was an error trying to load products into your account</Alert>}
    //     {successUpload && <Alert onClose={() => {
    //       setSuccessUpload(false);
    //     }} severity="success">Products are beign loaded into your account, this process may take a few seconds to complete</Alert>}
    //   </Stack>
    //   {loading && <Loading/>}
    // </Paper>

  );
};
