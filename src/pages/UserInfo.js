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
        <i
          onClick={() => navigate("/")}
          style={{ color: "#4582ec", cursor: "pointer" }}
          className="mx-4 my-3 fa-2x fa-solid fa-house"
        ></i>
        <Card
          style={{ textAlign: "center", maxWidth: "400px" }}
          className="mx-auto"
        >
          <Card.Body>
            <Card.Title className="my-3">My Profile</Card.Title>
            <Alert>
              <Card.Title>
                <i class="fa-solid fa-user"></i>{" "}
                {localStorage.getItem("userName")}
              </Card.Title>
            </Alert>
            <Button variant="primary" onClick={logOut}>
              Log Out
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfo;
