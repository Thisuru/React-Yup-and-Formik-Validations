import "./form-without-yup.css";
import { useFormik } from "formik";
import { validationSchema } from '../schemas/index'

const FormWithFormik = () => {
  //this form is handled with useFormik Hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
      interests: [],
      birthDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      console.log("onSubmit Values: ", values);
      console.log("onSubmit Actions: ", actions);
      // await new Promise((resolve) => setTimeout(() => resolve, 1000));
      actions.resetForm();
      // alert(JSON.stringify(values, null, 2));
    },
  });

  //this is only for Interests checkboxes!!!
  const handleChange = (event) => {
    const { name, checked } = event.target;
    let updatedInterests = [...formik.values.interests]; // copy the array

    if (checked) {
      updatedInterests.push(name); // add value if checked
    } else {
      updatedInterests = updatedInterests.filter((interest) => interest !== name); // remove if unchecked
    }

    formik.setFieldValue("interests", updatedInterests); // Update formik values
  };


  console.log("formik ", formik);

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h1>SignUp</h1>
      <div className="form-group">
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          placeholder="Enter your First Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.errors?.firstName && formik.touched.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}
      </div>
      <div className="form-group">
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          placeholder="Enter your Last Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.errors?.lastName && formik.touched.lastName && (
          <div className="error">{formik.errors.lastName}</div>
        )}
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          placeholder="Enter your Email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.errors?.email && formik.touched.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <label>Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formik.phoneNumber}
          placeholder="Enter your Phone Number"
          onChange={formik.handleChange}
        />
        {formik.errors?.phoneNumber && formik.touched.phoneNumber && (
          <div className="error">{formik.errors.phoneNumber}</div>
        )}
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          placeholder="Enter your Password"
          onChange={formik.handleChange}
        />
        {formik.errors?.password && formik.touched.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      <div className="form-group">
        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          placeholder="Confirm your Password"
          onChange={formik.handleChange}
        />
        {formik.errors?.confirmPassword && formik.touched.confirmPassword && (
          <div className="error">{formik.errors.confirmPassword}</div>
        )}
      </div>
      <div className="form-group">
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formik.values.age}
          placeholder="Enter your Age"
          onChange={formik.handleChange}
        />
        {formik.errors?.age && formik.touched.age && <div className="error">{formik.errors.age}</div>}
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {formik.errors?.gender && formik.touched.gender && (
          <div className="error">{formik.errors.gender}</div>
        )}
      </div>

      <div className="form-group">
        <label>Interests: </label>
        <label>
          <input
            type="checkbox"
            name="coding"
            {...formik.getFieldProps("interests", { value: "coding" })} // Use getFieldProps
            onChange={handleChange}
            checked={formik.values.interests.includes("coding")}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formik.values.interests.includes("sports")}
            {...formik.getFieldProps("interests", { value: "sports" })} // Use getFieldProps
            onChange={handleChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={formik.values.interests.includes("reading")}
            {...formik.getFieldProps("interests", { value: "reading" })} // Use getFieldProps
            onChange={handleChange}
          />
          Reading
        </label>
        {formik.errors?.interests && formik.touched.interests && (
          <div className="error">{formik.errors.interests}</div>
        )}
      </div>
      <div>
        <label>Date of Birth: </label>
        <input
          type="date"
          name="birthDate"
          value={formik.values.birthDate}
          placeholder="Enter your date of Birth"
          onChange={formik.handleChange}
        />
        {formik.errors?.birthDate && formik.touched.birthDate && (
          <div className="error">{formik.errors.birthDate}</div>
        )}
      </div>
      <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default FormWithFormik;
