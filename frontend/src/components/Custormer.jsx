import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Fetch all customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setCustomers(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load customers');
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit for Create or Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        
        try {
            if (editingId) {
                // Update Customer
                await axios.put(`${API_URL}/${editingId}`, formData);
                setSuccessMsg('Customer updated successfully!');
            } else {
                // Create Customer
                await axios.post(API_URL, formData);
                setSuccessMsg('Customer added successfully!');
            }
            // Reset form and reload list
            setFormData({ name: '', email: '', phone: '' });
            setEditingId(null);
            fetchCustomers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save customer');
            console.error(err);
        }
    };

    const handleEdit = (customer) => {
        setEditingId(customer.id);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ name: '', email: '', phone: '' });
        setError('');
        setSuccessMsg('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        
        setError('');
        setSuccessMsg('');
        try {
            await axios.delete(`${API_URL}/${id}`);
            setSuccessMsg('Customer deleted successfully!');
            fetchCustomers();
        } catch (err) {
            setError('Failed to delete customer');
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto font-sans">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Customer Management</h2>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 shadow-sm">{error}</div>}
            {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 shadow-sm">{successMsg}</div>}

            {/* Customer Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    {editingId ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            type="submit" 
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-medium shadow-sm"
                        >
                            {editingId ? 'Update Customer' : 'Save Customer'}
                        </button>
                        {editingId && (
                            <button 
                                type="button" 
                                onClick={handleCancelEdit}
                                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300 font-medium shadow-sm"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Customers List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading && customers.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading customers...</td></tr>
                        ) : customers.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-8 text-gray-500">No customers found. Create one above!</td></tr>
                        ) : (
                            customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <button 
                                            onClick={() => handleEdit(customer)}
                                            className="text-indigo-600 hover:text-indigo-900 mx-3 font-medium transition duration-150"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(customer.id)}
                                            className="text-red-600 hover:text-red-900 mx-3 font-medium transition duration-150"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customer;
