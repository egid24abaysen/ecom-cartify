import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';
const CUSTOMERS_API_URL = 'http://localhost:5000/api/customers';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]); // Needed for customer_id selection
    const [formData, setFormData] = useState({
        customer_id: '',
        product_name: '',
        price: '',
        quantity: 1,
        category: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(CUSTOMERS_API_URL);
            setCustomers(response.data);
        } catch (err) {
            console.error('Error fetching customers for selection list:', err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        
        try {
            if (editingId) {
                // Update Product
                await axios.put(`${API_URL}/${editingId}`, formData);
                setSuccessMsg('Product updated successfully!');
            } else {
                // Create Product
                await axios.post(API_URL, formData);
                setSuccessMsg('Product added successfully!');
            }
            // Reset form and reload list
            setFormData({ customer_id: '', product_name: '', price: '', quantity: 1, category: '' });
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
            console.error(err);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            customer_id: product.customer_id,
            product_name: product.product_name,
            price: product.price,
            quantity: product.quantity || 1,
            category: product.category || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ customer_id: '', product_name: '', price: '', quantity: 1, category: '' });
        setError('');
        setSuccessMsg('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        
        setError('');
        setSuccessMsg('');
        try {
            await axios.delete(`${API_URL}/${id}`);
            setSuccessMsg('Product deleted successfully!');
            fetchProducts();
        } catch (err) {
            setError('Failed to delete product');
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto font-sans shadow-lg bg-gray-50 rounded-xl my-8 border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-indigo-200 pb-2">Product Management</h2>
            
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-sm font-medium">{error}</div>}
            {successMsg && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 shadow-sm font-medium">{successMsg}</div>}

            {/* Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">
                    {editingId ? 'Edit Product ID: ' + editingId : 'Add New Product'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Name *</label>
                            <input
                                type="text"
                                name="product_name"
                                value={formData.product_name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                placeholder="E.g. Wireless Mouse"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price ($) *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                placeholder="29.99"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Customer Assignee *</label>
                            <select
                                name="customer_id"
                                value={formData.customer_id}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="" disabled>Select a Customer</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} (ID: {c.id})</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                placeholder="E.g. Electronics"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-4 pt-2">
                        <button 
                            type="submit" 
                            className="bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-medium shadow-md hover:shadow-lg"
                        >
                            {editingId ? 'Update Product' : 'Add Product'}
                        </button>
                        {editingId && (
                            <button 
                                type="button" 
                                onClick={handleCancelEdit}
                                className="bg-gray-500 text-white px-8 py-2 rounded-md hover:bg-gray-600 transition duration-300 font-medium shadow-md"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Qty</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer ID</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loading && products.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-8 text-gray-500 font-medium animate-pulse">Loading products data...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-8 text-gray-500 font-medium mb-4">No products found. Start by adding one!</td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-indigo-50 transition duration-150 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-900">{product.product_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">${parseFloat(product.price).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.category || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{product.customer_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <button 
                                            onClick={() => handleEdit(product)}
                                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 px-3 py-1 rounded-md mx-1 font-medium transition duration-150"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-md mx-1 font-medium transition duration-150"
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

export default Product;
