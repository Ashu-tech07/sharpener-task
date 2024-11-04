import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmail } from "../store/inboxSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, IconButton, Typography } from "@mui/material";
import useFetchdata from "../store/Fetchdata";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

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

export default function Inbox() {

  const [inboxEmails, setInboxEmails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const inboxMails = useSelector((state) => state.inbox.emails);
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const editedEmail = email.replace("@", "").replace(".", "");

  const [newdata] = useFetchdata(
    `https://mail-box-client-559ae-default-rtdb.firebaseio.com/${editedEmail}/inbox.json`
  );
  const dispatch = useDispatch();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (newdata) {
      console.log("data", newdata);
      const totalMails = Object.keys(newdata).length;
      localStorage.setItem("totalmails", totalMails.toString());
    }
  }, [newdata]);

  useEffect(() => {
    setInboxEmails(newdata);
    dispatch(addEmail(newdata));
  }, [newdata]);

  newdata &&
    localStorage.setItem(
      "unseenCount",
      Object.values(newdata).filter((item) => item.seen === "unseen").length
    );

  const handleDelete = (data) => {
    console.log("reducer", Object.keys(inboxMails));

    console.log("base", Object.keys(inboxEmails));
    fetch(
      `https://mail-box-client-559ae-default-rtdb.firebaseio.com//${editedEmail}/inbox/${data}.json`,
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
    // console.log(inboxMails[data]);
    if (inboxMails[data].seen === "unseen") {
      const emailData = {
        id: inboxMails[data].id,
        senderEmail: inboxMails[data].senderEmail,
        emailSubject: inboxMails[data].emailSubject,
        emailDescription: inboxMails[data].emailDescription,
        date: inboxMails[data].date,
        seen: "seen",
      };
      fetch(
        `https://mail-box-client-559ae-default-rtdb.firebaseio.com/${editedEmail}/inbox/${data}.json`,

        {
          method: "PUT",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {})
        .catch((error) => {
          alert(error.message);
        });
    }
    localStorage.setItem("openEmail", JSON.stringify(inboxEmails[data]));
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
        Inbox
      </Typography>
      <Container sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {["", "Subject", "Sender", "Date", ""].map((head) => (
                  <StyledTableCell key={head}>{head}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inboxMails &&
                Object.keys(inboxMails)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((data, key) => {
                    return (
                      <StyledTableRow
                        onClick={() => viewMail(data)}
                        key={key}
                        style={{ cursor: "pointer" }}
                      >
                        <StyledTableCell>
                          {inboxMails[data].seen === "seen" ? (
                            <MarkEmailReadIcon />
                          ) : (
                            <MarkEmailUnreadIcon color="primary" />
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxMails[data].emailSubject}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxMails[data].senderEmail}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxMails[data].date}
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
          count={inboxEmails ? Object.keys(inboxEmails).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Container>
  );
}
