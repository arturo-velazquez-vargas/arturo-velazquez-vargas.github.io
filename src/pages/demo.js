import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Link from '@mui/material/Link';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import '@fontsource/public-sans';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LabeledCheckboxMaterialUi from 'labeled-checkbox-material-ui';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
    SortingState, SelectionState, FilteringState, PagingState, GroupingState, RowDetailState,
    IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection, CustomPaging, DataTypeProvider,
    EditingState
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableBandHeader, TableHeaderRow,
    TableFilterRow, TableSelection, TableGroupRow, TableRowDetail,
    GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar, TableEditColumn, TableEditRow
} from '@devexpress/dx-react-grid-material-ui';
import { styled } from '@mui/material/styles';


import { Loading } from './tables/theme-sources/material-ui/components/loading';
import { CurrencyTypeProvider } from './tables/theme-sources/material-ui/components/currency-type-provider';

import {
    generateRows,
    employeeValues,
    employeeTaskValues,
} from './generator';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true';

const URL_PRODUCTS = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/products';
const URL_CATEGORIES = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/tags';
const URL_PRODUCTS_UPDATED = 'https://ec2-34-212-141-95.us-west-2.compute.amazonaws.com:8080/sse/product-prices';
const https = require('https');
const CurrencyFormatter = ({ value }) => (
    <b style={{ color: 'darkgreen' }}>
        {value != undefined ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : ''}
    </b>
);

const CurrencyFormatterBuyCost = ({ value }) => (
    <b style={{ color: 'darkblue' }}>
        {value != undefined ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : ''}
    </b>
);


const CurrencyFormatterROI = ({ value }) => {
    let colorStyle;
    if (value >= 30) {
        colorStyle = 'darkgreen';
    } else if (value > 0 && value < 30) {
        colorStyle = 'orange';
    } else {
        colorStyle = 'red';
    }
    return (
        <b style={{ color: colorStyle }}>
            {value == undefined ? 'NA' : value}%
        </b>
    );
};



const ImageFormatter = ({ value }) => (
    <Paper elevation={0}>
        <img src={value} />
        {/* <Image src={value} /> */}
    </Paper>);

const DateFormatter = ({ value }) => {
    let date = new Date(value);
    return (
        <b style={{ color: 'darkgreen' }}>
            {4}
        </b>
    );
};


const LinkFormatter = ({ value }) => (
    <Link target="_blank" href={value}>Click here</Link>
);


const UrlFormatter = ({ value }) => {
    let url = `https://www.amazon.com/dp/${value}`;
    return (<Link target="_blank" href={url}>{value}</Link>);
};

// Edit formatter for the boolean type
const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;

const BooleanEditor = ({ value, onValueChange }) => (
    <Select
        input={<Input />}
        value={value ? 'Yes' : 'No'}
        onChange={event => onValueChange(event.target.value === 'Yes')}
        style={{ width: '100%' }}
    >
        <MenuItem value="Yes">
            Yes
        </MenuItem>
        <MenuItem value="No">
            No
        </MenuItem>
    </Select>
);

const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));


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



const ImageTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={ImageFormatter}
        {...props}
    />
);

const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        {...props}
    />
);

const LinkTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={LinkFormatter}
        {...props}
    />
);

const UrlTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={UrlFormatter}
        {...props}
    />
);

const FixedPricesProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);

const BuyCostPricesProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatterBuyCost}
        {...props}
    />
);

const ROIPricesProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatterROI}
        {...props}
    />
);

export default () => {

    const [openAddTags, setOpenAddTags] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpenAddTags(true);
    };

    const handleClose = (newValue) => {
        setOpenAddTags(false);

        if (newValue) {
            setValue(newValue);
        }
    };
    const [newTag, setNewTag] = useState('')

    const [chipData, setChipData] = useState([]);

    const [selected, setSelected] = React.useState(new Set());
    let newNoteValue = '';
    // Edditing cells

    const [columns] = useState([
        { name: 'image', title: 'Image' },
        { name: 'title', title: 'Title' },
        { name: 'asin', title: 'ASIN' },
        { name: 'supplier', title: 'Supplier' },
        { name: 'supplierLink', title: 'Supplier Link' },
        { name: 'currentBBPrice', title: 'BB Price' },
        { name: 'buyCost', title: 'Buy Cost' },
        { name: 'netProfit', title: 'Net Profit' },
        { name: 'roi', title: 'ROI' },
        { name: 'currentBSR', title: 'BSR' },
        { name: 'fbaSellerCount', title: 'FBA Seller count' },

    ]);
    const [rows, setRows] = useState([]);
    const [currencyColumns] = useState(['currentBBPrice', 'netProfit']);
    const [currencyCostColumns] = useState(['buyCost']);
    const [imageColumns] = useState(['image']);
    const [linkColumns] = useState(['supplierLink']);
    const [urlColumns] = useState(['asin']);
    const [dateColumns] = useState(['details.date']);


    const [tableColumnExtensions] = useState([
        { columnName: 'title', align: 'left' },
        { columnName: 'asin', align: 'left' },
    ]);
    const [sorting, setSorting] = useState([{ columnName: 'title', direction: 'asc' }]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [pageSizes] = useState([50, 100, 200]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState(URL_PRODUCTS);
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'image', width: 100 },
        { columnName: 'title', width: 350 },
        { columnName: 'asin', width: 130 },
        { columnName: 'supplier', width: 140 },
        { columnName: 'supplierLink', width: 130 },
        { columnName: 'currentBBPrice', width: 100 },
        { columnName: 'buyCost', width: 100 },
        { columnName: 'netProfit', width: 120 },
        { columnName: 'roi', width: 100 },
        { columnName: 'currentBSR', width: 100 },
        { columnName: 'fbaSellerCount', width: 150 },
    ]);
    const [columnOrder, setColumnOrder] = useState(['image', 'title', 'asin', 'supplier', 'supplierLink', 'currentBBPrice', 'buyCost', 'netProfit', 'roi', 'currentBSR', 'fbaSellerCount']);

    const [filteringStateColumnExtensions] = useState([
        { columnName: 'image', filteringEnabled: false },
    ]);

    const changePageSize = (value) => {
        const totalPages = Math.ceil(totalCount / value);
        const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

        setPageSize(value);
        setCurrentPage(updatedCurrentPage);
    };



    const getQueryStringProducts = () => {
        let tags = generateTagsListString(selected);
        let queryString = `${URL_PRODUCTS}?tags=${tags}&size=${pageSize}&page=${currentPage}`;

        if (sorting.length) {
            queryString = `${queryString}&sort=${sorting[0].columnName},${sorting[0].direction}`;
        }
        return queryString;
    };


    const handleSelectionChanged = (id) => {
        console.log(id);
        const newSet = new Set(selected);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelected(newSet);
    };


    // function that concatenates the elements of a set and return a string
    const generateTagsListString = (set) => {
        let str = '';
        for (let elem of set) {
            str += elem + ',';
        }
        return removeLastChar(str);
    }
    // fuction that removes the last character of a string
    const removeLastChar = (str) => {
        return str.slice(0, -1);
    }

    const handleDelete = (set, id) => {
        //  setSelected(set.filter((chip) => chip !== id));
    };


    const loadData = (force = true) => {
        const queryString = getQueryStringProducts();
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        // Fetch products data from database
        if (force || (queryString !== lastQuery && !loading)) {
            const user = JSON.parse(localStorage.getItem("user"));
            const URL_PRODUCTS_BY_USERNAME = `${queryString}&username=${user.username}`;
            setLoading(true);
            fetch(URL_PRODUCTS_BY_USERNAME, {
                agent: httpsAgent
            })
                .then(response => response.json())
                .then(({ content, totalElements }) => {
                    console.log('Data from service products ', content);
                    console.log(content);

                    setRows(content);
                    setTotalCount(totalElements);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
            setLastQuery(queryString);
        }
    };

    // make a fetch call to get the data
    const fechCategories = () => {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        const user = JSON.parse(localStorage.getItem("user"));
        let authHeader = { Authorization: "Bearer " + user.accessToken };
        let URL_CATEGORIES_BY_USER = `${URL_CATEGORIES}?username=${user.username}`;
        fetch(URL_CATEGORIES_BY_USER, { headers: authHeader, agent: httpsAgent })
            .then(response => response.json())
            .then((data) => {
                console.log('Data from service categories ', data);
                setChipData(data);
            })
            .catch(() => {
                console.log('Error fetching categories');
            });
    }

    const commitChanges = ({ added, changed, deleted }) => {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            let keys = Object.keys(changed);
            let idKey = keys[0];
            let updateUbject = changed[idKey];
            let productToBeUpdated = rows[idKey];
            console.log('Product to be updated', changedRows);
            if (updateUbject == undefined) {
                return;
            }
            if (updateUbject.supplier != undefined) {
                productToBeUpdated.supplier = updateUbject.supplier;
            }
            if (updateUbject.supplierLink != undefined) {
                productToBeUpdated.supplierLink = updateUbject.supplierLink;
            }
            if (updateUbject.buyCost != undefined) {
                productToBeUpdated.buyCost = updateUbject.buyCost;
            }
            let URL_UPDATE_PRODUCT = `${URL_PRODUCTS}/${productToBeUpdated.id}/update-product`;
            console.log('Url update products', URL_UPDATE_PRODUCT);
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            fetch(URL_UPDATE_PRODUCT, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + user.accessToken
                },
                agent: httpsAgent,
                body: JSON.stringify(productToBeUpdated),
            })
                .then((data) => {
                    loadData(true);
                    console.log('Product Updated sucessfully');
                })
                .catch((e) => {
                    setLoading(false);
                    console.log('Filed updating product', e);
                });
        }
        if (deleted) {
            console.log('Delete id row', deleted[0]);

            let idKey = deleted[0];
            let productToBeDeleted = rows[idKey];
            console.log('Product to be deleted ', productToBeDeleted);
            if (productToBeDeleted == undefined || productToBeDeleted == null) {
                return;
            }

            let URL_DELETE_PRODUCT = `${URL_PRODUCTS}/${productToBeDeleted.id}/delete-product`;
            console.log('Url delete products', URL_DELETE_PRODUCT);
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));

            fetch(URL_DELETE_PRODUCT, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + user.accessToken
                },
                agent: httpsAgent,
                body: {},
            })
                .then((data) => {
                    loadData(true);
                    console.log('Product Deleted sucessfully');
                })
                .catch((e) => {
                    loadData(true);
                    console.log('Failed deleting product', e);
                });
        }
    };

    useEffect(() => {
        loadData(false);
        fechCategories();
        let tags = generateTagsListString(selected);
        console.log('Tags: ' + tags);
        // Listening price changes real time with Server-Sent Events
        const sseForUsers = new EventSource(
            `${URL_PRODUCTS_UPDATED}?tags=${tags}&size=${pageSize}&page=${currentPage}&sort=${sorting[0].columnName},${sorting[0].direction}`
        );
        sseForUsers.onopen = (e) => {
            console.log("SSE 3 Connected !");
        };
        sseForUsers.addEventListener("products-event", (event) => {
            let jsonData = JSON.parse(event.data);
            setRows(jsonData);
            console.log(jsonData);
        });

        sseForUsers.onerror = (error) => {
            console.log("SSE For Users error", error);
            sseForUsers.close();
        };
        return () => {
            sseForUsers.close();
        };
    }, [currentPage, pageSize, sorting, lastQuery, loading, selected]);// currentPage, pageSize, sorting, lastQuery, loading, selected

    const ConfirmationDialogRaw = (props) => {
        const { productId, tags, onClose, value: valueProp, open, ...other } = props;
        const [value, setValue] = React.useState(valueProp);
        const radioGroupRef = React.useRef(null);
        const [containsTag, setContainsTag] = React.useState(false);
        const [selectedTag, setSelectedTag] = React.useState(new Set(tags.map(t => t.id)));
        const [newTagValue, setNewTagValue] = React.useState('');


        React.useEffect(() => {
            if (!open) {
                setValue(valueProp);
            }
        }, []);


        const handleCancel = () => {
            onClose();
        };

        const handleSave = () => {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
              });
            console.log('Selected tags ', selectedTag);
            console.log('Product id ', productId);
            setLoading(true);
            if (newTagValue != null && newTagValue !== '') {
                const user = JSON.parse(localStorage.getItem("user"));
                console.log('For username ', user);

                let URL_ADD_TAGS = `${URL_PRODUCTS}/${productId}/assing-tag?name=${newTagValue}&username=${user.username}`;
                console.log('Url ', URL_ADD_TAGS);

                fetch(URL_ADD_TAGS, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + user.accessToken
                    },
                    agent: httpsAgent,
                    body: {},
                })
                    .then((data) => {
                        loadData(true);
                        newTagValue = '';
                        console.log('Tag added successfully');
                    })
                    .catch((e) => {
                        setLoading(false);
                        console.log('Error adding tag', e);
                    });

            } else {
                let tagStrings = generateTagsListString(selectedTag);
                let URL_ADD_TAGS = `${URL_PRODUCTS}/${productId}/add-tags?tags=${tagStrings}`;
                console.log('Url ', URL_ADD_TAGS);

                const user = JSON.parse(localStorage.getItem("user"));
                fetch(URL_ADD_TAGS, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + user.accessToken
                    },
                    agent: httpsAgent,
                    body: {},
                })
                    .then((data) => {
                        loadData(true);
                        console.log('Tag added successfully');
                    })
                    .catch((e) => {
                        setLoading(false);
                        console.error('Error adding tag', e);
                    });
            }
            onClose();

        };

        const handleTagSelectionChanged = (id) => {
            console.log(id);
            let set = new Set(selectedTag);
            if (set.has(id)) { set.delete(id); }
            else { set.add(id); }

            if (set.size > 0) {
                setContainsTag(true);
            } else {
                setContainsTag(false);
            }
            setSelectedTag(set);
            console.log('TAGS ', set);
        };

        const onChangeNewTag = (event) => {
            setNewTagValue(event.target.value);
        }

        return (
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"

                open={open}
                {...other}
            >
                <DialogTitle>Set tags</DialogTitle>
                <DialogContent dividers>
                    <FormGroup>
                        {chipData.map((data) => (
                            <FormControlLabel control={<Checkbox checked={selectedTag.has(data.id)} disabled={newTagValue.length > 0} />} label={data.name} key={data.id}
                                onClick={() => handleTagSelectionChanged(data.id)}
                            />
                        ))}
                        <br />
                        <FormControlLabel control={<Box
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        >
                            <TextField disabled={false} fullWidth label="New tag" id="fullWidth" onChange={onChangeNewTag} />
                        </Box>} />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()}>Save</Button>
                </DialogActions>
            </Dialog>
        );
    }

    ConfirmationDialogRaw.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
    };

    const RowDetail = ({ row }) => {

        const [valueText, setValueText] = useState(row.details.notes);
        const onChangeEvent = (event) => {
            setValueText(event.target.value);
        }

        const handleAddNewNotes = (productId) => {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
              });
            setLoading(true);
            let URL_ADD_NOTES = `${URL_PRODUCTS}/${productId}/add-notes?notes=${valueText}`;
            console.log('Url ', URL_ADD_NOTES);
            setValueText('');
            const user = JSON.parse(localStorage.getItem("user"));

            fetch(URL_ADD_NOTES, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + user.accessToken
                },
                agent: httpsAgent,
                body: {},
            })
                .then((data) => {
                    loadData(true);
                    //newTagValue = '';
                    console.log('Notes added successfully');
                })
                .catch((e) => {
                    // newTagValue = '';
                    setLoading(false);
                    console.log('Error adding notes', e);
                });
        };
        React.useEffect(() => {

        }, [valueText]);

        return (<StyledDiv className={classes.detailContainer}>
            <div>
                <h5 className={classes.title}>
                    Details:
                </h5>
            </div>
            <Paper>
                <Card className={useStyles.root}>
                    <CardContent>
                        <Stack direction="row" spacing={3}>

                            <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                                Tags
                            </Typography>
                            <Avatar sx={{ width: 4, height: 4 }}>
                                <Fab onClick={handleClickListItem} color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab>
                            </Avatar>
                        </Stack>
                        <ConfirmationDialogRaw
                            productId={row.id}
                            tags={row.details.tags}
                            keepMounted
                            autoFocus={true}
                            open={openAddTags}
                            onClose={handleClose}
                            value={value}
                        />
                        <Paper>
                            <br />

                            {row.details.tags.map((d) => {
                                let icon;
                                return (
                                    <Chip icon={icon} style={{ margin: 5 }} label={d.name} {...d} key={d.id} />);
                            })}
                            <br />
                        </Paper>
                        <br />
                        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                            Date
                        </Typography>
                        <Typography variant="body2" component="p">
                            {new Date(row.details.date).toLocaleDateString()}
                        </Typography>
                        <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                            Notes
                        </Typography>

                        <TextareaAutosize
                            maxRows={4}
                            minRows={3}
                            value={valueText}
                            placeholder="Add notes"
                            style={{ width: '50%' }}
                            onChange={onChangeEvent}
                        />
                        <br />
                        <Button disabled={(valueText != undefined && valueText.length > 0) ? false : true} onClick={() => handleAddNewNotes(row.id)} variant="outlined">Add note</Button>
                    </CardContent>
                </Card>
            </Paper>
        </StyledDiv>
        );
    };

    const onEditColumn = (columnName) => {
        if (columnName == 'supplier' || columnName == 'supplierLink' || columnName == 'buyCost') {
            return true;
        }
        return false;
    }
    return (
        <Paper  >
            <Card className={useStyles.root}>
                <CardContent>
                    <Typography style={{ marginLeft: 15 }} className={useStyles.title} color="textSecondary" gutterBottom>
                        Tags
                    </Typography>
                    <Paper
                        elevation={0}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                        }}
                        component="ul"
                    >
                        {chipData.map((data) => {
                            let icon;

                            return (
                                <ListItem key={data.id}>
                                    <Chip
                                        key={data.id}
                                        icon={icon}
                                        label={data.name}
                                        onClick={() => handleSelectionChanged(data.id)}
                                        variant={selected.has(data.id) ? undefined : "outlined"}
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper>
                </CardContent>
            </Card>
            <Grid
                rows={rows}
                columns={columns}
            >
                <FilteringState defaultFilters={['title', 'asin', 'supplier', 'supplierLink', 'currentBBPrice', 'buyCost', 'netProfit', 'roi', 'currentBSR', 'fbaSellerCount']}
                    columnExtensions={filteringStateColumnExtensions}
                />
                <IntegratedFiltering />

                <DragDropProvider />
                <DateTypeProvider
                    for={dateColumns}
                    formatterComponent={DateFormatter}
                />
                <FixedPricesProvider
                    for={currencyColumns}
                    formatterComponent={CurrencyFormatter}

                />
                <BuyCostPricesProvider
                    for={currencyCostColumns}
                    CurrencyFormatter={CurrencyFormatterBuyCost}
                />

                <ROIPricesProvider
                    for={['roi']}
                    CurrencyFormatter={CurrencyFormatterROI}
                />

                <ImageTypeProvider
                    for={imageColumns}

                />

                <LinkTypeProvider
                    for={linkColumns}
                    formatterComponent={LinkFormatter}
                />

                <UrlTypeProvider
                    for={urlColumns}
                    formatterComponent={UrlFormatter}

                />

                <EditingState
                    onCommitChanges={commitChanges}
                    columnEditingEnabled={false}
                    columnExtensions={[{ columnName: "netProfit", editingEnabled: false }, { columnName: "asin", editingEnabled: false }, { columnName: "supplier", editingEnabled: true }, { columnName: "supplierLink", editingEnabled: true }, { columnName: "buyCost", editingEnabled: true }]}

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
                    defaultOrder={['image', 'title', 'asin', 'supplier', 'supplierLink', 'currentBBPrice', 'buyCost', 'netProfit', 'roi', 'currentBSR', 'fbaSellerCount']}
                />
                <TableHeaderRow showSortingControls />
                <TableEditRow />
                <TableEditColumn
                    //               showAddCommand
                    showEditCommand
                    showDeleteCommand
                    width={150}

                />
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
