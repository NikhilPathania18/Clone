import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  image: Yup.mixed().required("Profile Photo is required"),
});

const SignUpForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("image", values.image);

        const response = await axios.post(
          "http://localhost:8000/api/signup",
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div
        id="form"
        className="m-5 block bg-slate-50 p-6 rounded-xl shadow-md shadow-slate-300 w-80"
      >
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-blue-700 text-3xl font-semibold my-4">
            Register
          </h2>

          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {formik.errors.username && formik.touched.username && (
            <p className="text-red-400 text-sm">{formik.errors.username}</p>
          )}

          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-400 text-sm">{formik.errors.name}</p>
          )}

          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-400 text-sm">{formik.errors.email}</p>
          )}

          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-400 text-sm">{formik.errors.password}</p>
          )}

          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-400 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}

          <label htmlFor="image" className="text-sm">
            Profile Photo
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-control mb-4"
            id="formFile"
          />
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-400 text-sm">{formik.errors.image}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm"
          >
            {submitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
