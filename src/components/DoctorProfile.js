import React from 'react';
import { Link } from 'react-router-dom';
const DoctorDetail = ({ doctor, date }) => {
    return (
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto">
            {/* Doctor Image Section */}
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                <img
                    src="https://via.placeholder.com/300"
                    alt="Dr. Jane Smith"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                />
            </div>

            {/* Doctor Details Section */}
            <div className="lg:w-2/3 lg:pl-6">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">{doctor.name}</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    {doctor.specialties.map(specialization => specialization.name).join(', ')}
                </h2>

                <div className="text-gray-600 mb-4">
                    <p><strong>Contact:</strong> jane.smith@example.com</p>
                    <p><strong>Location:</strong>{doctor.location} </p>
                    <p><strong>Fees:</strong>₹{doctor.fees} </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Qualifications:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {doctor.qualification.split(',').map((qualification, index) => (
                            <li key={index}>{qualification.trim()}</li>
                        ))}
                    </ul>
                </div>

                <p className="text-gray-800 mb-4">
                    {doctor.description}
                </p>

                {/* Buttons Section */}
                <div className="flex space-x-4">
                    <Link to={`/book-appointment/${doctor.id}`} state={{ doctor: doctor, date: date }}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-200">
                            Book Appointment
                        </button>
                    </Link>

                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition duration-200">
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;
