import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { userService } from '../services/user.service.js';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})

export function LoginForm({ onLogin, isSignup }) {
    const formikProps = {
        initialValues: userService.getEmptyCredentials(),
        validationSchema: LoginSchema,
        onSubmit: onLogin,
    };

    return (
        <Formik {...formikProps}>
            {({ errors, touched }) => (
                <Form className="login-form">

                    <Field
                        as={TextField}
                        name="username"
                        label="Username"
                        required
                        autoFocus
                    />
                    {errors.username && touched.username && (
                        <div className="error-message">{errors.username}</div>
                    )}

                    <Field
                        as={TextField}
                        type="password"
                        name="password"
                        label="Password"
                        required
                        autoComplete="off"
                    />
                    {errors.password && touched.password && (
                        <div className="error-message">{errors.password}</div>
                    )}

                    {isSignup && (
                        <Field
                            as={TextField}
                            name="fullname"
                            label="Full name"
                            required
                        />
                    )}
                    {isSignup && errors.fullname && touched.fullname && (
                        <div className="error-message">{errors.fullname}</div>
                    )}

                    <Button type="submit" variant="contained" >
                        {isSignup ? 'Signup' : 'Login'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
