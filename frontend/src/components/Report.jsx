import React, { useState, useEffect } from 'react';
import axios from 'axios';

const REPORT_API_URL = 'http://localhost:5000/api/reports/customer-product-summary';

const Report = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const response = await axios.get(REPORT_API_URL);
            setReportData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load report data');
            console.error('Error fetching report:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto font-sans shadow-lg bg-indigo-50 rounded-xl my-8 border border-indigo-100">
            <div className="flex justify-between items-center mb-6 border-b-2 border-indigo-200 pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-indigo-900">Premium Customers Report</h2>
                    <p className="text-indigo-600 mt-1">Purchases exceeding $100.00 sorted by value</p>
                </div>
                <button 
                    onClick={fetchReport}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition shadow-sm"
                >
                    Refresh Report
                </button>
            </div>
            
            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-sm font-medium">{error}</div>}

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Customer Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loading && reportData.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-8 text-gray-500 font-medium animate-pulse">Loading report data...</td></tr>
                        ) : reportData.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-8 text-gray-500 font-medium mb-4">No data available for this report.</td></tr>
                        ) : (
                            reportData.map((row, index) => (
                                <tr key={index} className="hover:bg-indigo-50 transition duration-150 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{row.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{row.product_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                            {row.category || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-bold">
                                        ${parseFloat(row.price).toFixed(2)}
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

export default Report;
