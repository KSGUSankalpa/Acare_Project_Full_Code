import React, { useState } from 'react';
import { 
  UserCircle2, 
  Building, 
  Phone, 
  BadgeCheck, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import './AddDrivers.css';

const AddDrivers = () => {
    const [userId, setUserId] = useState('');
    const [driver_name, setDriver_name] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [contact_no, setContact_no] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Set isAvailable to true by default for new drivers
            const requestData = { 
              userId, 
              driver_name, 
              hospitalId, 
              contact_no, 
              isAvailable: true 
            };
            const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Driver added successfully!',
                showConfirmButton: false,
                timer: 2000,
            });

            // Reset form
            setUserId('');
            setDriver_name('');
            setHospitalId('');
            setContact_no('');
            
        } catch (error) {
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Register Fail !',
                text: 'Please try again.',
                showConfirmButton: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="driver-registration-page">
                <div className="animated-circles">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                
                <div className="registration-container">
                    <div className="form-header">
                        <div className="header-icon">
                            <UserCircle2 size={40} />
                        </div>
                        <div className='title'>Driver Registration</div>
                    </div>

                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-grid">
                            <div className="input-group">
                                <div className="input-wrapper">
                                    <BadgeCheck className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder=""
                                        required
                                    />
                                    <label>Driver ID</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <UserCircle2 className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={driver_name}
                                        onChange={(e) => setDriver_name(e.target.value)}
                                        placeholder=""
                                        required
                                    />
                                    <label>Driver Name</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Building className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={hospitalId}
                                        onChange={(e) => setHospitalId(e.target.value)}
                                        placeholder=""
                                        required
                                    />
                                    <label>Hospital ID</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Phone className="field-icon" size={20} />
                                    <input
                                        type="tel"
                                        value={contact_no}
                                        onChange={(e) => setContact_no(e.target.value)}
                                        placeholder=""
                                        required
                                    />
                                    <label>Contact Number</label>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>Register Driver</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddDrivers;
