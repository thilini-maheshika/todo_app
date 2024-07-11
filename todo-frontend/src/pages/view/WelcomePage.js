import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import WelcomeBanner from '../../assets/img/banner.png';
import { useNavigate  } from 'react-router-dom';

const WelcomePage = () => {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <Container
            className='container'
            maxWidth="sm"
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '50px 20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}
        >
            <Typography
                variant="h5"
                align="center"
                style={{ marginBottom: '20px', fontWeight: 'bold' }}
            >
                To-do List : Plan your Day
            </Typography>
            <Box
                className='box-img'
                component="img"
                src={WelcomeBanner}
                alt="To-do List Illustration"
                style={{
                    width: '100%',
                    maxWidth: '360px',
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1,
                    marginBottom: '20px'
                }}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleGetStarted}
                style={{
                    borderRadius: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    textTransform: 'none',
                    borderColor: '#000',
                    color: '#000',
                    margin: '10px'
                }}
            >
                GET STARTED
            </Button>
        </Container>
    );
};

export default WelcomePage;
