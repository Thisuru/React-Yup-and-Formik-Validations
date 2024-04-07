import { useState } from "react";
import "./form-without-yup.css";
import { validationSchema } from '../schemas/index'
// import * as Yup from "yup";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState();

  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required("First Name is Required"),
  //   lastName: Yup.string().required("Last Name is Required"),
  //   email: Yup.string()
  //     .required("Email is Required")
  //     .email("Invalid Email Format"),
  //   phoneNumber: Yup.string()
  //     .matches(/^\d{10}$/, "Phone Number must be 10 digits")
  //     .required(),
  //   password: Yup.string()
  //     .required("Password is required")
  //     .min(8, "Password must be at least 8 characters")
  //     .matches(
  //       /[!@#$%^&*(),.?":{}|<>]/,
  //       "Password must contain at least one symbol"
  //     )
  //     .matches(/[0-9]/, "Password must contain at least one number")
  //     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  //     .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password")], "Passwords must match")
  //     .required("Confirm Password is required!"),
  //   age: Yup.number()
  //     .typeError("Age must be a number")
  //     .min(18, "You must be at least 18 years old")
  //     .max(100, "You cannot be older than 100 years")
  //     .required("Age is required"),
  //   gender: Yup.string().required("Gender is required"),
  //   interests: Yup.array()
  //     .min(1, "Select at least one interest")
  //     .required("Select at least one interest"),
  //   birthDate: Yup.date().required("Date of birth is required"),
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      console.log("Non Cast Data: ", formData);
      console.log("Form Submitted", validationSchema.cast(formData));
    } catch (error) {
      const newErrors = {}

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];

    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your First Name"
          onChange={handleChange}
        />
        {errors?.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div className="form-group">
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your Last Name"
          onChange={handleChange}
        />
        {errors?.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        {errors?.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your Phone Number"
          onChange={handleChange}
        />
        {errors?.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        {errors?.password && <div className="error">{errors.password}</div>}
      </div>
      <div className="form-group">
        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm your Password"
          onChange={handleChange}
        />
        {errors?.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <div className="form-group">
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter your Age"
          onChange={handleChange}
        />
        {errors?.age && <div className="error">{errors.age}</div>}
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {errors?.gender && <div className="error">{errors.gender}</div>}
      </div>

      <div className="form-group">
        <label>Interests: </label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interests.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formData.interests.includes("sports")}
            onChange={handleCheckboxChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={formData.interests.includes("reading")}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
        {errors?.interests && <div className="error">{errors.interests}</div>}
      </div>
      <div>
        <label>Date of Birth: </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          placeholder="Enter your date of Birth"
          onChange={handleChange}
        />
        {errors?.birthDate && <div className="error">{errors.birthDate}</div>}
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default FormWithYup;
