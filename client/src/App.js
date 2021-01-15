import './App.css';
import React, { useEffect, useState } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 1080,
    },
  },
  (theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

function response() {
  return fetch('/api/customer')
    .then(data => data.json())
}

function App() {
  const [customers, setCustomers] = useState('');

  useEffect(() => {
    let mounted = true;
    response()
      .then(items => {
        if(mounted) {
          setCustomers(items)
        }
      })
    return () => mounted = false;
  })

  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>번호</StyledTableCell>
            <StyledTableCell>이미지</StyledTableCell>
            <StyledTableCell>이름</StyledTableCell>
            <StyledTableCell>생년월일</StyledTableCell>
            <StyledTableCell>성별</StyledTableCell>
            <StyledTableCell>직업</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.root}>
          { customers ? customers.map(c => {
            return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
          }) : 
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
      </TableContainer>
      <CustomerAdd/>
    </div>
  );
}

export default App;
