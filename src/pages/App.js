import React from "react";
import styled from "styled-components";
import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import { TablePagination as _MuiTablePagination } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Select from '@material-ui/core/Select';
import {
  useTable,
  useBlockLayout,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect
} from "react-table";
import { useSticky } from "react-table-sticky";
import { matchSorter } from "match-sorter";
import { Col, Row, Nav, Card, Image, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

import makeData from "./makeData";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'

import ReactDOM from "react-dom";
import Demo from "./demo";
import { Provider } from "react-redux";
import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <Demo />
    </Provider>
  );
}

export default App;
