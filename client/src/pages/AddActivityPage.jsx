import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { createActivity } from '../services/activityService';
import ActivityForm from '../components/Activities/ActivityForm';
import AdminLayout from '../components/Layout/AdminLayout';
import { useActivities } from '../context/ActivityContext.jsx';

const AddActivityPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addActivity } = useActivities();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');

      const result = await createActivity(formData);

      if (result.success) {
        // Add the newly created activity to the context
        addActivity(result.data);

        toast.success('Activity created successfully');

        // Ask the user if they want to add another activity or go to the activities list
        const goToList = window.confirm('Activity created successfully! Do you want to view all activities?');

        if (goToList) {
          navigate('/activities');
        } else {
          // Reset the form by refreshing the page
          window.location.reload();
        }
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      setError('An error occurred while creating the activity');
      toast.error('An error occurred while creating the activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Activity
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create a new activity by filling out the form below
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <ActivityForm onSubmit={handleSubmit} isLoading={loading} />
      </Container>
    </AdminLayout>
  );
};

export default AddActivityPage;
