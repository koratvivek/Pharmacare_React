import axios from 'axios';
import { useState, useEffect } from 'react';
import { GrCalendar } from 'react-icons/gr';
import { useLocation } from 'react-router-dom';
import LoadingModal from './LoadingModal';


export default function EnhancedBookingForm({ token }) {
    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.doctor) {
            setDoctor(location.state.doctor);
        }
        if (location.state?.date) {
            setDate(location.state.date);
        }
    }, [location]);

    const handleBooking = async (event) => {
        event.preventDefault(); // Prevent form submission refresh

        // Collect user details
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;

        if (!doctor || !date) {
            alert("Doctor or Date information is missing.");
            return;
        }

        try {
            const bookingResponse = await axios.post(
                'https://pharmacare-django.onrender.com/api/book-appointment/',
                {
                    doctor_id: doctor.id,
                    date: date,
                    location: doctor.location,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    address: address,
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                }
            );

            if (bookingResponse.status === 201) {
                // Call the payment function
                await handlePayment(doctor, token);
            } else {
                alert('Error booking appointment. Please try again.');
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handlePayment = async (doctor, token) => {
        setIsLoading(true);
        try {
            const checkoutResponse = await axios.post(
                'https://pharmacare-django.onrender.com/api/checkout/',
                {
                    items: [
                        {
                            doctor_id: doctor.id,
                            doctor_name: doctor.name,
                            fees: doctor.fees,
                            date: date,
                            location: doctor.location,
                        },
                    ],
                    purchase_type: 'appointment',
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                }
            );


            // Redirect to Stripe checkout
            if (checkoutResponse.status === 200) {
                const sessionId = checkoutResponse.data.sessionId;
                const stripe = window.Stripe('pk_test_51Q27uLSCmOJFa9ssaPk3olhoVC62aiKqCFm4hlqeMV51Oo30p9P8R5Qzftl0Q2HsPsMGmf2ISod28txwV3u5PFcB00htJkKGza'); // Replace with your Stripe publishable key
                await stripe.redirectToCheckout({ sessionId });
            }
        } catch (error) {
            handleError(error);
        }
        finally {
            setIsLoading(false)
        }
    };

    const handleError = (error) => {
        if (error.response && error.response.data.error) {
            alert(error.response.data.error);
        } else {
            alert('Error processing request. Please check your network connection.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <LoadingModal isOpen={isLoading} />
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
                <p>
                    Enter your details to confirm booking with{' '}
                    {doctor ? doctor.name : 'loading...'}
                </p>
            </div>
            <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="w-full border rounded-md p-2"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="w-full border rounded-md p-2"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full border rounded-md p-2"
                        placeholder="john@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        className="w-full border rounded-md p-2"
                        placeholder="+1 (555) 123-4567"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">
                        Address
                    </label>
                    <textarea
                        id="address"
                        className="w-full border rounded-md p-2"
                        placeholder="123 Main St, City, State, ZIP"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Booking Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full border rounded-md p-2 cursor-pointer"
                            value={date || ''}
                            readOnly
                        />
                        <GrCalendar className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                    </div>
                </div>
                {doctor && (
                    <div className="p-4 border rounded-md">
                        <p>
                            <strong>Name:</strong> {doctor.name}
                        </p>
                        <p>
                            <strong>Specialty:</strong>{doctor.specialties.map(specialization => specialization.name).join(', ')}
                        </p>
                        <p>
                            <strong>Price:</strong> {doctor.fees}
                        </p>
                    </div>
                )}
                <div className="flex items-center">
                    <input id="terms" type="checkbox" className="mr-2" required />
                    <label htmlFor="terms">
                        I confirm the booking details and agree to the terms of service
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Confirm Booking and Pay
                </button>
            </form>
        </div>
    );
}
