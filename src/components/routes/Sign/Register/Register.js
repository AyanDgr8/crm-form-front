// /src/components/routes/Sign/Register/Register.js

import React, { useState, useEffect } from 'react';
import './Register.css'; 
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword  } from "../../../../Firebase";


const Register = () => {
    const navigate = useNavigate(); 
    
    const [alertMessage, setAlertMessage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        dob:'',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validateForm()) return;

        // Disable the submit button to prevent multiple submissions
        e.target.querySelector('button[type="submit"]').disabled = true;
    

        // If validations pass, submit the form data
        const apiUrl = "https:localhost:5000/user-register";
        try {
            // Prepare request data
            const requestData = {
                ...formData
            };

            // Submit the form data
            await axios.post(apiUrl, requestData);
            
            console.log('Registration successful');
            setAlertMessage('User registered successfully!');
            // Register user with Firebase backend
            await registerWithFirebase();
            handleSubmissionSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            handleSubmissionError(error);
        }
    };

    // Function to register user with Firebase backend
    const registerWithFirebase = async () => {
        try {
            const { firstName, email, password } = formData;
            await registerWithEmailAndPassword(firstName, email, password);
            console.log('User registered with Firebase');
        } catch (error) {
            console.error('Error registering user with Firebase:', error);
            throw error; // Rethrow the error to handle it in the handleSubmit function
        }
    };

    // Function to validate form inputs
    const validateForm = () => {
        const { username, firstName, lastName, email, password, phone, dob } = formData;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if any required field is empty
        if (!username || !password || !firstName || !lastName || !phone || !email || !dob) {
            setAlertMessage('Please fill in all the required fields');
            return false;
        }

        // Validate phone number
        if (!phoneRegex.test(phone)) {
            setAlertMessage('Please enter a valid phone number');
            return false;
        }

        // Validate email address
        if (!emailRegex.test(email)) {
            setAlertMessage('Please enter a valid email address');
            return false;
        }

        // Validate password length
        if (password.length < 8) {
            alert('Please enter a password with a minimum length of 8 characters');
            return false;
        }

        // Validate date of birth
        const today = new Date();
        const dobDate = new Date(dob);
        const minAgeDate = new Date(today.getFullYear() - 90, today.getMonth(), today.getDate()); 
        const maxAgeDate = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate()); 
    
        if (dobDate > today || dobDate < minAgeDate || dobDate > maxAgeDate) {
            setAlertMessage('Please enter a valid date of birth between 8 and 90 years from today');
            return false;
        }
    
        // If all validations pass, return true
        return true;
    
    };


    // Function to handle successful form submission
    const handleSubmissionSuccess = () => {
        // Reset form data
        resetForm();

        // Redirect to login page after alert is dismissed
        setTimeout(() => {
            navigate("/user-login");
        }, 500); 
    };



    

    // Function to handle form submission error


    const handleSubmissionError = (error) => {
        if (error.response && error.response.data && error.response.data.message) {
            setAlertMessage(error.response.data.message); 
        } else {
            setAlertMessage('An error occurred. Please try again later.'); 
        }
    };

    // Function to reset the form
    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            dob:''
        });
    };

    



    // **************
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    useEffect(() => {
        if (alertMessage) {
            // Show alert
            alert(alertMessage);

            // Clear alert message
            setAlertMessage(null);
        }
    }, [alertMessage]);
    
    

    return(
        <div>
            <section className='above-form'>
              <img 
                src="/uploads/game-bg.png"
                className='game-bg'
                alt="game-bg"
              />
              <div className='form-header'>
                <img 
                src="/uploads/game-logo.png"
                className='game-logo'
                alt="game-logo"
                />
                <img 
                src="/uploads/game-head.png"
                className='game-head'
                alt="game-head"
                />
              </div>
            </section>

            <form 
                id="form_container"
                className='form-register'
                action="https://multycomm-backend.onrender.com/user-register"
                method="post" 
                onSubmit={handleSubmit} 
                encType="multipart/form-data"
            >
                
                <div className='form-heading'>
                    <h3 className='form-line1'>Registration</h3>                 
                </div>

                {/* ******** */}

                <div className="row mb-4 mob">

                  <div className="col">
                      <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form6Example3" className="form-control inputs" 
                              name="username" value={formData.username} onChange={handleChange}
                              placeholder='Username'  required 
                          />
                          {/* <label class="form-label" for="form6Example3">Username</label> */}
                      </div>
                  </div>

                  

                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                      <input type="text" id="form6Example6" className="form-control inputs" 
                        name="password" value={formData.password} onChange={handleChange}  
                        placeholder='Password' required 
                      />
                      {/* <label class="form-label" for="form6Example6">Password</label> */}
                    </div>
                  </div>

                </div>

                {/* ************ */}
            

                <div className="row mb-4 mob">
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id="form6Example1" className="form-control inputs" 
                                name="firstName" value={formData.firstName} onChange={handleChange}  
                                placeholder='First Name' required 
                            />
                            {/* <label class="form-label" for="form6Example1">First name</label> */}
                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id="form6Example2" className="form-control inputs" 
                                name="lastName" value={formData.lastName} onChange={handleChange} 
                                placeholder='Last Name' required
                            />
                            {/* <label class="form-label" for="form6Example2">Last name</label> */}
                        </div>
                    </div>
                </div>


                {/* ***************** */}

                <div className="row mb-4 mob"> 

                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                      <input type="email" id="form6Example5" className="form-control inputs" 
                        name="email" value={formData.email} onChange={handleChange}
                        placeholder='Email' required
                      />
                      {/* <label class="form-label" for="form6Example5">Email</label> */}
                    </div>
                  </div>
                  

                  <div className="col">
                    <div data-mdb-input-init className="form-outline">
                        <input type="number" id="form6Example4" className="form-control inputs"     
                            name="phone" value={formData.phone} onChange={handleChange}
                            placeholder='Phone' required 
                        />
                        {/* <label class="form-label" for="form6Example4">Phone</label> */}
                    </div>
                  </div>

                </div>


                {/* ***************** */}
                <div className="row mb-4 mob">
                    

                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input
                                type="date"
                                id="dob"
                                className="form-control inputs"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                placeholder="Date of Birth"
                                required
                            />
                        </div>
                    </div>

                    <div className="col gender-column">
                        {/* <label htmlFor="gender" className='gender-word'>Gender:</label> */}
                        <div data-mdb-input-init className="form-outline rd-btn">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                className='rd-btns'
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="male">Male</label>

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                className='rd-btns'
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="female">Female</label>

                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                value="other"
                                className='rd-btns'
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>


                </div>


                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4 sbt-btn ">Register</button>
                
                

                {/* ***************** */}

                {/* <div>
                    <button onClick={handleRegisterWithGoogle} className="google-link">Register with Google</button>
                </div> */}

                <div>
                    <h6 className="head2">Already have an account?</h6>
                    <Link to="/user-login" className="login-link">
                        Login
                    </Link>
                </div>
            

            </form>

        </div>
    )

};

export default Register;