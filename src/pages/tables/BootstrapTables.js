import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Link from '@mui/material/Link';

import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState, RowDetailState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection, CustomPaging, DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableBandHeader, TableHeaderRow,
  TableFilterRow, TableSelection, TableGroupRow, TableRowDetail,
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { styled } from '@mui/material/styles';


import { Loading } from './theme-sources/material-ui/components/loading';
import { CurrencyTypeProvider } from './theme-sources/material-ui/components/currency-type-provider';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../generator';


const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true';

const URL_PRODUCTS = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/products';

const https = require('https');

const CurrencyFormatter = ({ value }) => (
  <b style={{ color: 'darkgreen' }}>
    {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
  </b>
);

const ImageFormatter = ({ value }) => (
  <Paper elevation={0}>
    <img src={value} />
    {/* <Image src={value} /> */}
  </Paper>);

const LinkFormatter = ({ value }) => (
  <Link href={value}>Click here</Link>
);


const PREFIX = 'Demo';

const classes = {
  detailContainer: `${PREFIX}-detailContainer`,
  title: `${PREFIX}-title`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.detailContainer}`]: {
    margin: '20px',
  },
  [`& .${classes.title}`]: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
}));

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const detailColumns = [
  { name: 'notes', title: 'Notes' },
  { name: 'date', title: 'Date' },
  { name: 'tags', title: 'Tags' },
  // { name: 'alternateSupplier', title: 'Alternate Supplier' },
];
const tableDetailColumnExtensions = [
  { columnName: 'notes', width: 165 },
  { columnName: 'date', width: 115 },
  { columnName: 'tags', width: 115 },
];


const RowDetail = ({ row }) => (<StyledDiv className={classes.detailContainer}>
  <div>
    <h5 className={classes.title}>
      Details:
    </h5>
  </div>
  <Paper>
    <Card className={useStyles.root}>
      <CardContent>
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
          Tags
        </Typography>
        <Chip label={row.details.tags} />
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
          Date
        </Typography>
        <Typography variant="body2" component="p">
          {row.details.date}
        </Typography>
        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
          Notes
        </Typography>
        <Typography variant="body2" component="p">
          {row.details.notes}
        </Typography>
      </CardContent>

    </Card>
  </Paper>
</StyledDiv>
);

const ImageTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ImageFormatter}
    {...props}
  />
);

const LinkTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={LinkFormatter}
    {...props}
  />
);
export default () => {

  const [columns] = useState([
    { name: 'image', title: 'Image' },
    { name: 'title', title: 'Title' },
    { name: 'asin', title: 'ASIN' },
    { name: 'supplierLink', title: 'Supplier Link' },
    { name: 'currentBBPrice', title: 'BB Price' },
    { name: 'buyCost', title: 'Buy Cost' },
    { name: 'netMargin', title: 'Net Margin' },
    { name: 'currentBSR', title: 'BSR' },
    { name: 'fbaSellerCount', title: 'FBA Seller count' },

  ]);
  const [rows, setRows] = useState([]);
  const [currencyColumns] = useState(['currentBBPrice', 'buyCost', 'netMargin', 'currentBSR']);
  const [imageColumns] = useState(['image']);
  const [linkColumns] = useState(['supplierLink']);

  const [tableColumnExtensions] = useState([
    { columnName: 'title', align: 'left' },
    { columnName: 'asin', align: 'left' },
  ]);
  const [sorting, setSorting] = useState([{ columnName: 'title', direction: 'asc' }]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'image', width: 150 },
    { columnName: 'title', width: 350 },
    { columnName: 'asin', width: 130 },
    { columnName: 'supplierLink', width: 130 },
    { columnName: 'currentBBPrice', width: 130 },
    { columnName: 'buyCost', width: 100 },
    { columnName: 'netMargin', width: 130 },
    { columnName: 'currentBSR', width: 130 },
    { columnName: 'fbaSellerCount', width: 150 },
  ]);
  const [columnOrder, setColumnOrder] = useState(['image', 'title', 'asin', 'supplierLink', 'currentBBPrice', 'buyCost', 'netMargin', 'currentBSR', 'fbaSellerCount']);

  const [filteringStateColumnExtensions] = useState([
    { columnName: 'image', filteringEnabled: false },
  ]);

  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };

  const getQueryString = () => {
    let queryString = `${URL_PRODUCTS}?size=${pageSize}&page=${currentPage}`;

    if (sorting.length) {
      queryString = `${queryString}&sort=${sorting[0].columnName},${sorting[0].direction}`;
    }
    return queryString;
  };



  const loadData = () => {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString, {
        agent: httpsAgent,
      })
        .then(response => response.json())
        .then(({ content, totalElements }) => {
          console.log('Data from service products ' + content);
          setRows(content);
          setTotalCount(totalElements);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={['title', 'asin', 'supplierLink', 'currentBBPrice', 'buyCost', 'netMargin', 'currentBSR', 'fbaSellerCount']}
          columnExtensions={filteringStateColumnExtensions}
        />
        <IntegratedFiltering />

        <DragDropProvider />

        <CurrencyTypeProvider
          for={currencyColumns}
          formatterComponent={CurrencyFormatter}
        />
        <ImageTypeProvider
          for={imageColumns}
        />

        <LinkTypeProvider
          for={linkColumns}
          formatterComponent={LinkFormatter}
        />


        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />

        <GroupingState />
        <IntegratedGrouping />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        <RowDetailState

        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableFilterRow />

        <TableGroupRow />
        <Toolbar />
        <GroupingPanel />

        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        />
        <TableColumnReordering
          defaultOrder={['image', 'title', 'asin', 'supplierLink', 'currentBBPrice', 'buyCost', 'netMargin', 'currentBSR', 'fbaSellerCount']}
        />
        <TableHeaderRow showSortingControls />
        <TableRowDetail
          contentComponent={RowDetail}
        />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};
