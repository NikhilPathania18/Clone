import * as Yup from 'yup'

export const signupSchema = Yup.object({
    username: Yup.string().email('Please enter a valid username').min(2).max(50).required('Please enter a username'),
    name: Yup.string().min(3).required('Please enter your Name'),
    password: Yup.string().min(4).max(12).required('Please enter a Password'),
    confirmPassword:Yup.string().required('').oneOf([Yup.ref('password'),null],"Passwords don't match"),
    image: Yup.mixed().required('Please enter Profile Photo')
})