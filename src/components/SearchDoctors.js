import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DoctorDetail from './DoctorProfile';

const SearchDoctors = ({ token }) => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await axios.get('https://pharmacare-django.onrender.com/api/specializations/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                });
                setSpecializations(response.data);
            } catch (error) {
                console.error('Error fetching specializations:', error);
                setError('Could not fetch specializations. Please try again later.');
            }
        };
        fetchSpecializations();
    }, [token]);

    const handleCheckboxChange = (specializationId) => {
        setSelectedSpecializations((prevSelected) => {
            if (prevSelected.includes(specializationId)) {
                return prevSelected.filter(id => id !== specializationId);
            } else {
                return [...prevSelected, specializationId];
            }
        });
    };

    const searchDoctors = async () => {
        setError('');
        try {
            const response = await axios.get('https://pharmacare-django.onrender.com/api/available-doctors/', {
                headers: {
                    'Authorization': `Token ${token}`
                },
                params: {
                    location: location,
                    date: date,
                    specializations: selectedSpecializations.join(','),
                },
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setError('Could not fetch doctors. Please check your inputs and try again.');
        }
    };

    const isSearchDisabled = !location || !date || selectedSpecializations.length === 0;

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-lg min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Search Doctors</h2>
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Select Specialization(s):</h3>
                {specializations.map((specialization) => (
                    <label key={specialization.id} className="block">
                        <input
                            type="checkbox"
                            value={specialization.id}
                            onChange={() => handleCheckboxChange(specialization.id)}
                            className="mr-2"
                        />
                        {specialization.name}
                    </label>
                ))}
            </div>
            <button
                onClick={searchDoctors}
                disabled={isSearchDisabled}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${isSearchDisabled && 'opacity-50 cursor-not-allowed'}`}
            >
                Search Doctors
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <ul className="mt-4">
                {doctors.length === 0 ? (
                    <li>No doctors found for the selected criteria.</li>
                ) : (
                    doctors.map((doctor) => (
                        // <li key={doctor.id} className="border-b py-4">
                        //     <Link to={`/doctor/${doctor.id}`} className="text-blue-600 hover:underline">
                        //         {doctor.name} ({doctor.specialties.map(s => s.name).join(', ')})
                        //     </Link>
                        // </li>
                        <DoctorDetail doctor={doctor} date={date}></DoctorDetail>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SearchDoctors;
