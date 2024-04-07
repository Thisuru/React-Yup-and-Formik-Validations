import { validationSchema } from "../schemas";
import "./form-without-yup.css";
import { Field, Form, Formik } from "formik";

const FormWithFormikComponent = () => {
  return (
    <div className="form-container">
      <h1>My Form</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('values: ', values)
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   actions.setSubmitting(false);
          // }, 1000);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              className="form-group"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            {errors?.firstName && touched.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
            <Field
              className="form-group"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            {errors?.lastName && touched.lastName && (
              <div className="error">{errors.lastName}</div>
            )}
            <Field
              className="form-group"
              type="email"
              name="email"
              placeholder="Email"
            />
            {errors?.email && touched.email && (
              <div className="error">{errors.email}</div>
            )}
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormWithFormikComponent;
