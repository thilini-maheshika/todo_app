import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checklist from "../../assets/img/checklist.png";
import * as Yup from 'yup';

const Register = () => {
    const [formData, setFormData] = useState({
        data: {},
        errors: {}
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        validateField(e.target);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validateForm(event.target);

        if (isValid) {
            const { confirm_password, ...formDataWithoutConfirm } = formData.data;
            onSubmit(formDataWithoutConfirm);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_ENDPOINT + '/user/register',
                data
            );

            if (response.data) {
                navigate('/login');
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.error || 'Server error');
        }
    };

    const validateField = ({ name, value }) => {
        let fieldError = null;

        let fieldSchema;
        switch (name) {
            case 'email':
                fieldSchema = Yup.string().email('Invalid email address').required('Email field is required');
                break;
            case 'phone':
                fieldSchema = Yup.string().matches(/^(\d{10}|\d{12})$/, {
                    message: 'Invalid mobile number',
                    excludeEmptyString: true,
                }).required('Phone field is required');
                break;
            case 'password':
                fieldSchema = Yup.string()
                    .min(12, 'Password must be at least 12 characters long')
                    .matches(
                        /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]+$/,
                        'Password must include at least one letter, one number, and one symbol'
                    )
                    .required('Password is required');
                break;
            case 'confirm_password':
                fieldSchema = Yup.string().oneOf([formData.data.password], 'Passwords must match').required('Confirm password is required');
                break;
            default:
                fieldSchema = Yup.string().required('Field is required');
        }

        try {
            fieldSchema.validateSync(value);
        } catch (error) {
            fieldError = error.message;
        }

        const sanitizedValue = DOMPurify.sanitize(value);

        setFormData((prevState) => ({
            data: {
                ...prevState.data,
                [name]: sanitizedValue
            },
            errors: {
                ...prevState.errors,
                [name]: fieldError
            }
        }));
    };

    const validateForm = async (form) => {
        let isValid = true;

        for (let index = 0; index < form.length; index++) {
            const { localName, name, value } = form[index];
            if (localName === 'input' || localName === 'select') {
                validateField({ name, value });
                if (formData.errors[name] !== null) {
                    isValid = false;
                }
            }
        }

        return isValid;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <IconButton>
                    <img src={Checklist} width={25} height={25} alt="Checklist" />
                </IconButton>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                autoFocus
                                value={formData.data.first_name || ''}
                                onChange={handleChange}
                                error={Boolean(formData.errors.first_name)}
                                helperText={formData.errors.first_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                value={formData.data.last_name || ''}
                                onChange={handleChange}
                                autoComplete="family-name"
                                error={Boolean(formData.errors.last_name)}
                                helperText={formData.errors.last_name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.data.email || ''}
                                onChange={handleChange}
                                error={Boolean(formData.errors.email)}
                                helperText={formData.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formData.data.password || ''}
                                onChange={handleChange}
                                error={Boolean(formData.errors.password)}
                                helperText={formData.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                autoComplete="new-password"
                                value={formData.data.confirm_password || ''}
                                onChange={handleChange}
                                error={Boolean(formData.errors.confirm_password)}
                                helperText={formData.errors.confirm_password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;
