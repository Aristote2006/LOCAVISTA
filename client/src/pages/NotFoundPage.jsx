import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import Layout from '../components/Layout/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Paper
          sx={{
            mt: 8,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Box mt={3}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
              size="large"
            >
              Go to Home Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
