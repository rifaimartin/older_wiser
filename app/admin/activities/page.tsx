'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import Swal from 'sweetalert2';
import { ActivityFormModal } from '@/components/admin/ActivityFormModal';

interface Activity {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export default function ManageActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    // Refresh activities list
    // ...
  };

  // Fetch activities
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch activities');
      
      const data = await response.json();
      setActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load activities'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6A8270',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to delete activity');

        setActivities(activities.filter(activity => activity._id !== id));
        
        Swal.fire(
          'Deleted!',
          'Activity has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting activity:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete activity'
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Manage Activities</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#6A8270] text-white rounded-md hover:bg-[#5a7260]"
        >
          Add New Activity
        </button>
      </div>

      <ActivityFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {activity.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {activity.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setEditingActivity(activity)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(activity._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}