import React, { Fragment } from "react";

import { Button, Container, Divider} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const ViewMail = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  // const inboxMails = useSelector((state) => state.inbox.emails);
  let mail = JSON.parse(localStorage.getItem("openEmail"));
  const isSentBox = mail.senderEmail === localStorage.getItem("userEmail");

  const handleClose = () => {
    navigate("/home", { replace: true });
    localStorage.removeItem("openEmail");
  };
  return (
    <Fragment>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Typography variant="h6" sx={{ color: "#1976D2" }}>
          Mail Details
        </Typography>
      </Container>

      <Container>
        {/* {id} */}
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 22, fontWeight: 530 }}
              color="text.primary"
              gutterBottom
            >
              {mail.emailSubject}
            </Typography>
            <Divider />

            <Typography
              sx={{ mb: 1.5, mt: 1.5, display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <Avatar src="/broken-image.jpg" sx={{ marginRight: 1 }} />
              {!isSentBox && <Typography> from:{mail.senderEmail}</Typography>}
              {isSentBox && <Typography> to:{mail.receiverEmail}</Typography>}
            </Typography>

            <div
              dangerouslySetInnerHTML={{
                __html: mail.emailDescription,
              }}
            />
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleClose}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ViewMail;
