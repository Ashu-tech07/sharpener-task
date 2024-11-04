import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, Typography, IconButton } from "@mui/material";
import useFetchdata from "../store/Fetchdata";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9ec2e6",
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function SentBox() {
  const navigate = useNavigate();
  const [sentBoxEmails, SetsentBoxEmails] = useState();
  const email = localStorage.getItem("userEmail");
  const editedEmail = email.replace("@", "").replace(".", "");

  //fetching data from firebse
  const [newdata] = useFetchdata(
    `https://mail-box-client-559ae-default-rtdb.firebaseio.com/${editedEmail}/sentBox.json`
  );

  //mui pagination settings
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect(() => {
  //   if (newdata) {
  //     const totalMails = Object.keys(newdata).length;
  //     localStorage.setItem("totalmails", totalMails.toString());
  //   }
  // }, [newdata]);

  useEffect(() => {
    SetsentBoxEmails(newdata);
  }, [newdata]);

  const handleDelete = (data) => {
    fetch(
      `https://mail-box-client-559ae-default-rtdb.firebaseio.com/${editedEmail}/sentBox/${data}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(true);
      })
      .catch((err) => {
        alert(err.mess);
      });
  };

  const viewMail = (data) => {
    localStorage.setItem("openEmail", JSON.stringify(sentBoxEmails[data]));
    navigate(`/viewMail/${data}`);
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Typography variant="h6" style={{ color: "#1976D2" }}>
        Sent
      </Typography>
      <Container sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {["", "To", "Subject", "Date", ""].map((head) => (
                  <StyledTableCell key={head}>{head}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sentBoxEmails &&
                Object.keys(sentBoxEmails)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((data, index) => {
                    return (
                      <StyledTableRow
                        onClick={() => viewMail(data)}
                        key={index}
                        style={{ cursor: "pointer" }}
                      >
                        <StyledTableCell>{<MailOutlineIcon />}</StyledTableCell>
                        <StyledTableCell>
                          {sentBoxEmails[data].receiverEmail}
                        </StyledTableCell>
                        <StyledTableCell>
                          {sentBoxEmails[data].emailSubject}
                        </StyledTableCell>
                        <StyledTableCell>
                          {sentBoxEmails[data].date}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(data);
                            }}
                          >
                            {<DeleteOutlineIcon color="error" />}
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sentBoxEmails ? Object.keys(sentBoxEmails).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Container>
  );
}
