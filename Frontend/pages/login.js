

import React from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const res = await axios.post('http://localhost:8000/api/login', values);
        if (res && res.data.success) {
          const data = {
            token: res.data.token,
            userData: res.data.user,
          };
          localStorage.setItem('userData', JSON.stringify(data));
          toast.success(res.data.message);
          router.push('/');
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error('Something went wrong');
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div id="form" className="m-5 block bg-slate-50 p-6 rounded-xl shadow-md shadow-slate-300 w-80">
        <form onSubmit={handleSubmit}>
          <h2 className="text-blue-700 text-3xl font-semibold my-4">Login</h2>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            autoFocus
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {touched.email && errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}

          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            className="mb-2 h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
          />
          {touched.password && errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}

          <input
            type="submit"
            id="signUp"
            className="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm"
          />
          <br />
          <p className="text-xs my-2">
            New User?
            <Link href="/signup" className="text-blue-600 ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
