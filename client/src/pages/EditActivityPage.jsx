import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { getActivityById, updateActivity } from '../services/activityService';
import ActivityForm from '../components/Activities/ActivityForm';
import AdminLayout from '../components/Layout/AdminLayout';
import { useActivities } from '../context/ActivityContext.jsx';

const EditActivityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateActivityInContext } = useActivities();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch activity data
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const result = await getActivityById(id);

        if (result.success) {
          setActivity(result.data);
        } else {
          setError(result.message);
          toast.error(result.message);
        }
      } catch (err) {
        setError('An error occurred while fetching the activity');
        toast.error('An error occurred while fetching the activity');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError('');

      const result = await updateActivity(id, formData);

      if (result.success) {
        // Update the activity in the context
        updateActivityInContext(result.data);

        toast.success('Activity updated successfully');
        navigate('/activities');
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      setError('An error occurred while updating the activity');
      toast.error('An error occurred while updating the activity');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Activity
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update activity information by editing the form below
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : activity ? (
          <ActivityForm
            initialData={activity}
            onSubmit={handleSubmit}
            isLoading={submitting}
          />
        ) : (
          <Alert severity="error">Activity not found</Alert>
        )}
      </Container>
    </AdminLayout>
  );
};

export default EditActivityPage;
