import { createContext, useContext, useState, useEffect } from 'react';
import { getActivities } from '../services/activityService';
import { useGeolocation } from '../hooks/useGeolocation';

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { latitude, longitude, loading: locationLoading } = useGeolocation();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch activities when location is available
  useEffect(() => {
    fetchActivities();
  }, [latitude, longitude]);

  // Function to fetch activities
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const filters = {};

      if (latitude && longitude) {
        // Use the exact parameter names expected by the server
        filters.lat = latitude;
        filters.lng = longitude;
        filters.radius = 50; // 50km radius

        // Log for debugging
        console.log('Sending location filters:', filters);
      }

      const result = await getActivities(filters);

      if (result.success) {
        // Calculate distance for each activity if location is available
        const activitiesWithDistance = result.data.map(activity => {
          let distance = null;
          if (latitude && longitude) {
            distance = calculateDistance(
              latitude,
              longitude,
              activity.location.coordinates[1],
              activity.location.coordinates[0]
            );
          }
          return { ...activity, distance };
        });

        // Sort by distance if location is available
        if (latitude && longitude) {
          activitiesWithDistance.sort((a, b) => a.distance - b.distance);
        }

        setActivities(activitiesWithDistance);
      } else {
        setError('Failed to fetch activities');
      }
    } catch (err) {
      setError('An error occurred while fetching activities');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new activity to the context
  const addActivity = (newActivity) => {
    // Calculate distance if location is available
    let distance = null;
    if (latitude && longitude) {
      distance = calculateDistance(
        latitude,
        longitude,
        newActivity.location.coordinates[1],
        newActivity.location.coordinates[0]
      );
    }

    // Make sure the activity has a createdAt timestamp
    const activityWithDistance = {
      ...newActivity,
      distance,
      createdAt: newActivity.createdAt || new Date().toISOString()
    };

    // Add to the beginning of the array to show newest first
    setActivities(prevActivities => [activityWithDistance, ...prevActivities]);

    // Log for debugging
    console.log('Activity added to context:', activityWithDistance);
  };

  // Function to update an activity in the context
  const updateActivityInContext = (updatedActivity) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity._id === updatedActivity._id ?
          {
            ...updatedActivity,
            distance: activity.distance,
            // Preserve the original createdAt timestamp
            createdAt: activity.createdAt || updatedActivity.createdAt || new Date().toISOString()
          } : activity
      )
    );

    // Log for debugging
    console.log('Activity updated in context:', updatedActivity);
  };

  // Function to remove an activity from the context
  const removeActivity = (activityId) => {
    // Find the activity before removing it (for logging)
    const activityToRemove = activities.find(activity => activity._id === activityId);

    setActivities(prevActivities =>
      prevActivities.filter(activity => activity._id !== activityId)
    );

    // Log for debugging
    console.log('Activity removed from context:', activityToRemove);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        loading,
        error,
        fetchActivities,
        addActivity,
        updateActivityInContext,
        removeActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => useContext(ActivityContext);
