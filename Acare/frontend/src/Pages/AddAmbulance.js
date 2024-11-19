import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Ambulance, Hospital } from 'lucide-react';
import './AddAmbulance.css';
import Navbar from '../components/Navbar';

const AddAmbulance = () => {
    const [ambulanceNo, setAmbulanceNo] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const requestData = { 
                Ambulance_no: ambulanceNo,
                hospitalId 
            };
            const response = await axios.post('http://localhost:5000/api/Ambulance/add', requestData);
            
            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Ambulance added successfully!',
                timer: 3000,
                showConfirmButton: false,
            });
            
            // Clear form
            setAmbulanceNo('');
            setHospitalId('');
            
        } catch (error) {
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error adding ambulance !',
                text: ' Please try again.',
                showConfirmButton: true,
            });
            console.error('Error during adding:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="driver-registration-page">
            {/* Animated Background */}
            <div className="animated-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>

            {/* Main Container */}
            <div className="registration-container">
                {/* Header */}
                <div className="form-header">
                    <div className="header-icon">
                        <Ambulance size={40} />
                    </div>
                    <div className='title1'>Add New Ambulance</div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Ambulance ID Input */}
                        <div className="input-group">
                            <div className="input-wrapper">
                                <Ambulance className="field-icon" size={20} />
                                <input
                                    type="text"
                                    id="ambulanceNo"
                                    value={ambulanceNo}
                                    onChange={(e) => setAmbulanceNo(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="ambulanceNo">Ambulance ID</label>
                            </div>
                        </div>

                        {/* Hospital ID Input */}
                        <div className="input-group">
                            <div className="input-wrapper">
                                <Hospital className="field-icon" size={20} />
                                <input
                                    type="text"
                                    id="hospitalId"
                                    value={hospitalId}
                                    onChange={(e) => setHospitalId(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="hospitalId">Hospital ID</label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            'Register Ambulance'
                        )}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};
 
export default AddAmbulance;
