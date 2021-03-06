import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { onRegisterClick } from "../actions/auth";
// import { onRegisterClick } from "../actions";
//import { onSetTimeOut } from "../actions";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  CustomInput
} from "reactstrap";

class Register extends Component {
  onErrorRegister = () => {
    if (this.props.error !== "") {
     // setTimeout(this.props.onSetTimeOut, 3000);
      return (
        <div className="alert alert-danger danger mt-2">{this.props.error}</div>
      );
    } else if (this.props.success !== "") {
      setTimeout(this.props.onSetTimeOut, 3000);
      return (
        <div className="alert alert-primary primary mt-2">
          {this.props.success}
          {this.onSuccesRegisterToLogin()}
        </div>
      );
    }
  };
  // fungsi untuk melempar halaman registrasi jika berhasil ke halaman login
  onSuccesRegisterToLogin = () => {
    return <Redirect to="/login" />;
  };

  onSubmitClick = () => {
    const user = this.username.value;
    const first = this.firstName.value;
    const last = this.lastName.value;
    const email = this.email.value;
    const pass = this.password.value;
    
    console.log("Username : " + user);
    console.log("Password : " + pass);
    this.props.onRegisterClick(
      user,
      first,
      last,
      email,
      pass
      
    );
  };
  render() {
    if(this.props.username === "" && this.props.email  === "" ){
      
      return (
        // <div className="register">
        <div className="container  bg-transparent text-dark register1 rounded">
          {/* <div className="register1"> */}
          {/* <div class="col-lg-4 offset-4 mt-5">
            <div class="card bg-light text-center card-form" /> */}
          <h3>Sign Up Today</h3>
          <p>Please fill out this form to register</p>
          <Form>
            <Row form>
              <Col md={6}>
              <FormGroup>
                  <Label for="exampleUsername">Username</Label>
                  <Input
                    innerRef={input => {
                      this.username = input;
                    }}
                    type="text"
                    name="username"
                    id="exampleUsername"
                    placeholder="Username"
                  />
                </FormGroup>
              </Col>
            </Row>
  
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleFirst">First Name</Label>
                  <Input
                    innerRef={input => {
                      this.firstName = input;
                    }}
                    type="text"
                    name="firstname"
                    id="exampleFirst"
                    placeholder="first name"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleLast">Last Name</Label>
                  <Input
                    innerRef={input => {
                      this.lastName = input;
                    }}
                    type="text"
                    name="password"
                    id="exampleLast"
                    placeholder="last name"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    innerRef={input => {
                      this.email = input;
                    }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="@ Email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    innerRef={input => {
                      this.password = input;
                    }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password"
                  />
                </FormGroup>
              </Col>
            </Row>
            
            <Row form>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleDate">Brith Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
              </Col>
            </Row>
           
            <FormGroup check>
              <Input type="checkbox" name="check" id="exampleCheck" />
              <Label for="exampleCheck" check>
                By selecting "Register" I agree to Circleline record's{" "}
                <Link to="/kebijakan">Privacy Policy</Link>
              </Label>
            </FormGroup>
            <br />
            <Button onClick={this.onSubmitClick}>Register</Button>
            {this.onErrorRegister()}
            <p className="lead">
              Do You Have Account Bro? <Link to="/login">Sign Up!</Link>
            </p>
          </Form>
        </div>
        // </div>
        // </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    success: state.auth.success,
    username: state.auth.username,
    email: state.auth.email
  };
};

export default connect(
  mapStateToProps,
  { onRegisterClick /*, onSetTimeOut*/ }
)(Register);
