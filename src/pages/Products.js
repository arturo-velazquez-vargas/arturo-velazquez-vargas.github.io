import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';

import App from './App'


const URL_PRODUCTS = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/sp-api/process-product';
const https = require('https');
export default () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productLoaded, setProductLoaded] = useState(false);

  const handleChange = (event) => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    console.log(fleldVal);
    setInputValue(fleldVal);
  }

  const handleLoadProduct = () => {
    let queryString = `${URL_PRODUCTS}?asin=${inputValue}`;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    setLoading(true);
    fetch(queryString, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      agent:httpsAgent,
      body: null,
    })
      .then(response => {
        console.log('Product found ' + response.status);
        if(response.status == 404){
          console.log('Data not found');
          setProductNotFound(true);
          setLoading(false);
  
          setTimeout(() => {
            setProductNotFound(false);
          }, 5000);
        }else{
          setProductLoaded(true);
          setLoading(false);
          setTimeout(() => {
            setProductLoaded(false);
          }, 4000);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log('Data not found');
        setProductNotFound(true);
        setLoading(false);

        setTimeout(() => {
          setProductNotFound(false);
        }, 5000);
      });
  }
    const currentUser = useSelector((store) => store.auth.user);

  React.useEffect(() => {
    console.log('currentUser  ===========', currentUser);
    ;

  }, []);

  return (
    <Paper>

      {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0" >
          <h4>Products</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">

        </div>
      </div>

      <div className="table-settings mb-4" >

        <Row className="justify-content-between align-items-center">
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>

            <Paper><InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control onChange={handleChange} type="text" placeholder="ASIN" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            </Paper>

            <Button variant="contained" endIcon={<SendIcon />} onClick={handleLoadProduct}>
              Load product
            </Button>
          </Stack>

        </Row>

      </div>

      {loading && <Stack alignItems="center">
        <CircularProgress />
      </Stack>}
      <Stack sx={{ width: '100%' }} spacing={2}>
        {productNotFound && <Alert onClose={() => { setProductNotFound(false); }} severity="warning">The product with the asin '{inputValue}' was not found</Alert>}
        {productLoaded && <Alert onClose={() => {
          setProductLoaded(false);
        }} severity="success">The product was loaded sucessfully</Alert>}
      </Stack> */}
      <App />
    </Paper>
  );
};
