import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseApi } from "../baseAPI";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../validation/schema";
import { AxiosError } from "axios";
import { Button, Modal } from "react-bootstrap";

interface RegisterModalProps {
  registerModalIsOpen: Boolean;
  setRegisterModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  registerModalIsOpen,
  setRegisterModalIsOpen,
  setLoginModalIsOpen,
}) => {
  const navigate = useNavigate();

  return (
    <Modal
      show={true || registerModalIsOpen}
      onHide={() => setRegisterModalIsOpen(false)}
    >
      <div className="container mt-5">
        <h2>Registration</h2>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await baseApi.post("auth/register", values);
              const { token } = response.data;

              localStorage.setItem("token", token);
              navigate("/admin");
            } catch (error) {
              if (error instanceof AxiosError) {
                setFieldError("email", error.response?.data.message);
              }
              console.error(error);
            }
            setSubmitting(false);
          }}
          validationSchema={registerValidationSchema}
        >
          <Form>
            <div className="form-group">
              <label>Name</label>
              <Field type="text" name="fullname" className="form-control" />
              <ErrorMessage
                name="fullname"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label className="mt-3">Email</label>
              <Field type="email" className="form-control" name="email" />
              <ErrorMessage
                name="email"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label className="mt-3">Password</label>
              <Field type="password" className="form-control" name="password" />
              <ErrorMessage
                name="password"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="mb-2"></div>
            <div>
              Go to{" "}
              <Link
                to="/main"
                onClick={() => {
                  setRegisterModalIsOpen(false);
                  setLoginModalIsOpen(true);
                }}
              >
                Login
              </Link>
            </div>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setRegisterModalIsOpen(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};

export default RegisterModal;
