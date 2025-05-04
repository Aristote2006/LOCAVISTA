import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getActivities, deleteActivity } from '../services/activityService';
import ActivityCard from '../components/Activities/ActivityCard';
import AdminLayout from '../components/Layout/AdminLayout';

const activityTypes = [
  'all',
  'hotel',
  'resort',
  'restaurant',
  'saloon',
  'clinic',
  'hospital',
  'motel',
  'lodge',
  'adventure',
  'park',
  'museum',
  'other',
];

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activityType, setActivityType] = useState('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const result = await getActivities();

        if (result.success) {
          setActivities(result.data);
          setFilteredActivities(result.data);
        } else {
          setError('Failed to fetch activities');
        }
      } catch (err) {
        setError('An error occurred while fetching activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities based on search term, type, and featured status
  useEffect(() => {
    let filtered = [...activities];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (activityType !== 'all') {
      filtered = filtered.filter(activity => activity.type === activityType);
    }

    // Filter by featured status
    if (showFeatured) {
      filtered = filtered.filter(activity => activity.featured);
    }

    setFilteredActivities(filtered);
  }, [searchTerm, activityType, showFeatured, activities]);

  // Handle edit activity
  const handleEdit = (id) => {
    navigate(`/activities/edit/${id}`);
  };

  // Handle delete activity
  const handleDelete = (id) => {
    const activity = activities.find(a => a._id === id);
    setActivityToDelete(activity);
    setDeleteDialogOpen(true);
  };

  // Confirm delete activity
  const confirmDelete = async () => {
    if (!activityToDelete) return;

    try {
      setDeleteLoading(true);
      const result = await deleteActivity(activityToDelete._id);

      if (result.success) {
        // Remove activity from state
        setActivities(activities.filter(a => a._id !== activityToDelete._id));
        toast.success('Activity deleted successfully');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('An error occurred while deleting the activity');
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setActivityToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Manage Activities
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/activities/add')}
          >
            Add Activity
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={5}>
              <TextField
                fullWidth
                label="Search activities"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={activityType}
                  label="Activity Type"
                  onChange={(e) => setActivityType(e.target.value)}
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type} value={type} sx={{ textTransform: 'capitalize' }}>
                      {type === 'all' ? 'All Types' : type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Featured</InputLabel>
                <Select
                  value={showFeatured ? 'featured' : 'all'}
                  label="Featured"
                  onChange={(e) => setShowFeatured(e.target.value === 'featured')}
                >
                  <MenuItem value="all">All Activities</MenuItem>
                  <MenuItem value="featured">Featured Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 4 }}>
            {error}
          </Alert>
        ) : (
          <>
            {filteredActivities.length > 0 ? (
              <Grid container spacing={3}>
                {filteredActivities.map((activity) => (
                  <Grid item xs={12} sm={6} md={4} key={activity._id}>
                    <ActivityCard
                      activity={activity}
                      isAdmin
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info" sx={{ my: 4 }}>
                No activities found matching your criteria.
              </Alert>
            )}
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Activity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete "{activityToDelete?.name}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              color="error"
              disabled={deleteLoading}
              startIcon={deleteLoading ? <CircularProgress size={20} /> : null}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default ActivitiesPage;
