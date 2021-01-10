import './App.css';
import React, { useEffect, useState } from 'react';
import Customer from './components/Customer'
import Paper from "@material-ui/core/Paper"
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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
});

function response() {
  return fetch('/api/customer')
    .then(data => data.json())
}

function App() {
  const [customers, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    response()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  })

  const classes = useStyles();
  return (
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
        <TableBody>
          { customers ? customers.map(c => {
            return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)
          }) : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
