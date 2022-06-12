import React from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userName", "");
    alert("Closed session");
    navigate("/login");
  };

  return (
    <Row>
      <Col>
        <Card
          style={{ textAlign: "center", maxWidth: "400px" }}
          className="mx-auto mt-5"
        >
          <Card.Title className="mb-3">User Info</Card.Title>
          <Alert>
            <Card.Title>
              <i class="fa-solid fa-user"></i>{" "}
              {localStorage.getItem("userName")}
            </Card.Title>
          </Alert>
          <Button variant="primary" onClick={logOut}>
            Log Out
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfo;
