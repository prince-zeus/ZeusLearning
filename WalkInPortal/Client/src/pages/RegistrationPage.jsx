import './RegistrationPage.css'
import BackIcon from "../assets/arrow_upward_black_24dp.svg"
import { useEffect, useState } from 'react'
// import JobRoles from '../data/job_roles.json'
// import Technologies from '../data/technologies.json'
import ProfileIcon from '../assets/profile-user.svg'
import EditIcon from '../assets/pen.svg'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios from '../api/axios'

export default function RegistrationPage() {
  const [currentStep ,setCurrentStep] = useState(1);
  const [jobRoles, setJobRoles] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [streams, setStreams] = useState([]);
  const [applicantType, setApplicationType] = useState("experienced");
  const { user, is2FAVerified } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    profile_image: "",
    resume: "",
    portfolio_url: "",
    preferred_job_roles: [],
    reffered_name: "",
    is_email_notification: 0,
    aggreagate_percentage: "",
    year_of_passing: 0,
    qualifications_id: 0,
    streams_id: 0,
    colleges_id: 0,
    other_college_name: "",
    college_location: "",
    year_of_experience: "",
    current_ctc: "",
    expected_ctc: "",
    experience_technologies: [],
    other_experience_technologies: "",
    familiar_technologies: [],
    other_familiar_technologies: "",
    on_notice_period: 0,
    notice_period_end_date: "",
    notice_period_duration: 0,
    test_appearence: 0,
    test_appearence_role: ""
  });

  console.log(formData);

  useEffect(() => {
    if(!user || !is2FAVerified) {
        getAllJobRoles();
    }
  }, [is2FAVerified, user])

  const getAllJobRoles = async () => {
    const response = await axios.get(`/api/jobroles`,
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setJobRoles(response?.data);
  }

  useEffect(() => {
    if(!user || !is2FAVerified) {
        getAllQualifications();
    }
  }, [is2FAVerified, user])

  const getAllQualifications = async () => {
    const response = await axios.get(`/api/qualifications`,
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setQualifications(response?.data);
  }

  useEffect(() => {
    if(!user || !is2FAVerified) {
        getAllColleges();
    }
  }, [is2FAVerified, user])

  const getAllColleges = async () => {
    const response = await axios.get(`/api/colleges`,
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setColleges(response?.data);
  }

  useEffect(() => {
    if(!user || !is2FAVerified) {
        getAllStreams();
    }
  }, [is2FAVerified, user])

  const getAllStreams = async () => {
    const response = await axios.get(`/api/streams`,
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setStreams(response?.data);
  }

  useEffect(() => {
    getTechnologies();
  }, [])

  const getTechnologies = async () => {
    const response = await axios.get(`/api/technologies`,
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setTechnologies(response?.data);
  };

  if(user && !is2FAVerified) {
    return <Navigate to="/verify-2fa" state={{from: from}} replace />
  }

  if(user && is2FAVerified) {
    return <Navigate to={from} replace />
  }

  const {first_name, last_name, email, password, phone_number, profile_image, resume, portfolio_url, preferred_job_roles, reffered_name, is_email_notification, 
        aggreagate_percentage, year_of_passing, qualifications_id, streams_id, colleges_id, other_college_name, college_location, 
        year_of_experience, current_ctc, expected_ctc, experience_technologies, other_experience_technologies, familiar_technologies, 
        other_familiar_technologies, on_notice_period, notice_period_end_date, notice_period_duration, test_appearence, test_appearence_role} = formData;

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? +checked : type === "radio" || type === "select-one" ? +value : value
        }
    })
  }

  const handleCheckBoxListChange = (event) => {
    const {name, value, checked} = event.target;
    setFormData(prevFormData => {
        // If the checkbox is checked, add the value to the array, otherwise, remove it
        const updatedArray = checked
            ? [...prevFormData[name], +value]
            : prevFormData[name].filter((item) => item !== +value);
        return {
            ...prevFormData,
            [name]: updatedArray
        }
    })
  }

  const Year_Of_Passing = [
    {
        id: 1,
        year: 2020
    },
    {
        id: 2,
        year: 2021
    },
    {
        id: 3,
        year: 2022
    },
    {
        id: 4,
        year: 2023
    },
    {
        id: 5,
        year: 2024
    },
    {
        id: 6,
        year: 2025
    }
  ]

  const Month_Duration = [
    {
        id: 1,
        months: "1 months"
    },
    {
        id: 2,
        months: "2 months"
    },
    {
        id: 3,
        months: "3 months"
    },
    {
        id: 4,
        months: "4 months"
    },
    {
        id: 5,
        months: "5 months"
    },
    {
        id: 6,
        months: "6 months"
    },{
        id: 7,
        months: "7 months"
    },
    {
        id: 8,
        months: "8 months"
    },
  ]

  const onPrevious = () => {
    setCurrentStep(prev => (prev > 1) ? prev - 1 : prev);
  }

  const onNext = () => {
    setCurrentStep(prev => (prev < 4) ? prev + 1 : prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    try {
        const registrationFormData = {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            profile_image,
            resume,
            portfolio_url,
            preferred_job_roles,
            reffered_name,
            is_email_notification,
            aggreagate_percentage,
            year_of_passing,
            qualifications_id,
            streams_id,
            colleges_id,
            other_college_name,
            college_location,
            year_of_experience,
            current_ctc,
            expected_ctc,
            experience_technologies,
            other_experience_technologies,
            familiar_technologies,
            other_familiar_technologies,
            on_notice_period,
            notice_period_end_date,
            notice_period_duration: Month_Duration.filter(duration => duration.id === 3)[0].months,
            test_appearence,
            test_appearence_role,
            applicantType
        }
        await axios.post('/api/register',
            JSON.stringify(registrationFormData),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone_number: "",
            profile_image: "",
            resume: "",
            portfolio_url: "",
            preferred_job_roles: [],
            reffered_name: "",
            is_email_notification: 0,
            aggreagate_percentage: "",
            year_of_passing: 0,
            qualifications_id: 0,
            streams_id: 0,
            colleges_id: 0,
            other_college_name: "",
            college_location: "",
            year_of_experience: "",
            current_ctc: "",
            expected_ctc: "",
            experience_technologies: [],
            other_experience_technologies: "",
            familiar_technologies: [],
            other_familiar_technologies: "",
            on_notice_period: 0,
            notice_period_end_date: "",
            notice_period_duration: 0,
            test_appearence: 0,
            test_appearence_role: ""
        });
    } catch (err) {
        if (!err?.response) {
            alert('No Server Response');
        } else if (err.response?.status === 400) {
            alert('Missing Username or Password');
        } else if (err.response?.status === 401) {
            alert('Unauthorized');
        } else if(err.response?.status === 500) {
            alert('Internal Server Error');
        } else {
            alert('Login Failed');
        }
    }
  };

  return (
    <div className="registration-page-container">
        <div className="registration-page-actionbar">
            <img src={BackIcon} alt="Back Button" className="registration-page-actionbar-back-icon" />

            <div className="registration-page-actionbar-text">Create an account</div>

            <div className="registration-page-actionbar-actions">
                <button type='button' className='registration-page-actionbar-cancel-button'>Cancel</button>
                <button type='button' className='registration-page-actionbar-create-button' onClick={handleSubmit}>Create</button>
            </div>
        </div>

        <div className="multi-step-form-container">
            <div className="multi-step-form-progress-bar">
                <div className={`step-${currentStep}`} id="checkout-progress" data-current-step={`${currentStep}`}>
                    <div className="progress-bar">
                        <div className={`step step-1 ${currentStep > 1 ? "valid" : ""} ${currentStep == 1 ? "active" : ""}`} onClick={() => setCurrentStep(1)}><span className={`${currentStep > 1 ? "opaque" : ""}`}> 1</span>
                        <div className={`edit-icon ${currentStep > 1 ? "" : "opaque"}`}></div>
                        <div className="step-label" onClick={() => setCurrentStep(1)}>Personal Information</div>
                        </div>

                        <div className={`step step-2 ${currentStep > 2 ? "valid" : ""} ${currentStep == 2 ? "active" : ""}`} onClick={() => setCurrentStep(2)}><span className={`${currentStep > 2 ? "opaque" : ""}`}> 2</span>
                        <div className={`edit-icon ${currentStep > 2 ? "" : "opaque"}`}></div>
                        <div className="step-label" onClick={() => setCurrentStep(2)}>Qualifications</div>
                        </div>

                        <div className={`step step-3 ${currentStep > 3 ? "valid" : ""} ${currentStep == 3 ? "active" : ""}`} onClick={() => setCurrentStep(3)}><span className={`${currentStep > 3 ? "opaque" : ""}`}> 3</span>
                        <div className={`edit-icon ${currentStep > 3 ? "" : "opaque"}`}></div>
                        <div className="step-label" onClick={() => setCurrentStep(3)}>Review and Proceed</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="multi-step-form">
                <div className={`registration-preview-edit-container ${currentStep == 3 ? "active" : ""}`}>
                    <div className="registration-preview-title">Personal Information</div>
                    <div className="registration-preview-edit-button-container">
                        <img className="registration-preview-edit-icon" src={EditIcon} alt='Edit Icon'/>
                        <div className="registration-preview-edit-text">Edit</div>
                    </div>
                </div>

                <div className={`page page-1 ${currentStep == 1 || currentStep == 3 ? "active" : ""}`}>
                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">First Name*</div>
                        <input
                            className="registration-text-field width-480" 
                            type="text" 
                            name="first_name"
                            value={first_name} 
                            onChange={handleChange} 
                            placeholder="John" 
                        />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Last Name*</div>
                        <input 
                            className="registration-text-field width-480" 
                            type="text" 
                            name="last_name"
                            value={last_name} 
                            onChange={handleChange}
                            placeholder="Watson" />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Email*</div>
                        <input 
                            className="registration-text-field width-480" 
                            type="text" 
                            name="email"
                            value={email} 
                            onChange={handleChange} 
                            placeholder="Johnwatson@example.com" />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Password*</div>
                        <input 
                            className="registration-text-field width-480" 
                            type="password" 
                            name="password"
                            value={password} 
                            onChange={handleChange} 
                            placeholder="******" />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Phone Number*</div>
                        <div className="registration-phone-number-container">
                            <div />
                            <input type="number" className="registration-country-code-text-field" id="countrycode" placeholder="91" />
                            <input 
                                className="registration-phone-number-text-field" 
                                type="text" 
                                name="phone_number"
                                value={phone_number} 
                                onChange={handleChange}
                                placeholder="9876543210" />
                        </div>
                    </div>

                    <div className="job-card-upload-resume-container">
                        <label className="job-card-upload-icon"></label>
                        <input 
                            type="file" 
                            name="resume"
                            value={resume}
                            onChange={handleChange}
                            id="resume-upload" 
                            style={{display:'none'}} />
                        <label className="job-card-upload-resume-text" htmlFor='resume-upload'>{resume ? resume : "Upload Resume"}</label>
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Enter Portfolio URL (if any)</div>
                        <input 
                            className="registration-text-field width-480" 
                            type="text"
                            name="portfolio_url"
                            value={portfolio_url}
                            onChange={handleChange}
                            placeholder="www.myportfolio.in" />
                    </div>

                    <div className="job-card-preference-container">
                        <div className="job-card-preference-text">Preferred Job Roles*</div>

                        {jobRoles.map((jobRole, index) => {
                        const {id, job_role_title} = jobRole;
                        return (
                            <div className="job-card-preference-checkbox-text" key={index}>
                                <input 
                                    type="checkbox" 
                                    id={`job-card-preference-${index}`} 
                                    name="preferred_job_roles" 
                                    value={id}
                                    onChange={handleCheckBoxListChange}
                                />
                                <label htmlFor={`job-card-preference-${index}`} className="job-card-checkbox"></label>
                                <div>{job_role_title}</div>
                            </div>
                        )
                        })}
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">If You Are Registering Via A Referral, Please Mention Full Name Of The Employee Who Referred You</div>
                        <input 
                            className="registration-text-field width-480" 
                            type="text" 
                            name="reffered_name"
                            value={reffered_name}
                            onChange={handleChange}
                            placeholder="" />
                    </div>

                    <div className="job-card-preference-checkbox-text">
                        <input 
                            type="checkbox" 
                            name="is_email_notification" 
                            value={is_email_notification}
                            onChange={handleChange}
                            id={`send-me-update`} />
                        <label htmlFor={`send-me-update`} className="job-card-checkbox"></label>
                        <div>Send me job related updates via mail</div>
                    </div>

                    <div className="registration-upload-display-picture-container">
                        <img src={ProfileIcon} alt="Profile Icon" />
                        <div className="registration-upload-text-container">
                            <input 
                                type="file" 
                                name="profile_image"
                                value={profile_image}
                                onChange={handleChange}
                                id="picture-upload" 
                                style={{display:'none'}} />
                            <label className="registration-upload-display-picture-button" htmlFor='picture-upload'>{"UPLOAD DISPLAY PICTURE"}</label>
                            {/* <div className="registration-upload-display-picture-button">UPLOAD DISPLAY PICTURE</div> */}
                            <div className="registration-upload-display-picture-max-size">Max. image size: 5 MB</div>
                        </div>
                    </div>
                </div>

                <div className={`registration-preview-edit-container ${currentStep == 3 ? "active" : ""}`}>
                    <div className="registration-preview-title">Qualifications</div>
                    <div className="registration-preview-edit-button-container">
                        <img className="registration-preview-edit-icon" src={EditIcon} alt='Edit Icon'/>
                        <div className="registration-preview-edit-text">Edit</div>
                    </div>
                </div>

                <div className={`page page-2 ${currentStep == 2 || currentStep == 3 ? "active" : ""}`}>
                    <details>
                        <summary>Educational Qualifications</summary>
                        <div className="educational-qualifications-collapse-container">
                            <div className="registration-title-text-field-container">
                                <div className="registration-text-field-title">Aggregate Percentage*</div>
                                <input 
                                    className="registration-text-field width-180"
                                    type="text" 
                                    name="aggreagate_percentage"
                                    value={aggreagate_percentage}
                                    onChange={handleChange}
                                    placeholder="65" />
                            </div>

                            <div className="registration-title-text-field-container">
                                <label htmlFor="year-of-passing" className="registration-text-field-title">Year of Passing*</label>
                                <select 
                                    className='width-180' 
                                    id="year-of-passing"
                                    name="year_of_passing" 
                                    value={year_of_passing}
                                    onChange={handleChange}
                                >
                                    <option key={0} value={0}>Select Option</option>
                                    {Year_Of_Passing.map(Year => {
                                        const {id, year} = Year;
                                        return (<option key={id} value={year}>{year}</option>)
                                    })}
                                </select>
                            </div>

                            <div className="registration-text-field-list">
                                <div className="registration-title-text-field-container">
                                    <label htmlFor="qualifications_id" className="registration-text-field-title">Qualification*</label>
                                    <select 
                                        className='' 
                                        id="qualifications_id"
                                        name="qualifications_id" 
                                        value={qualifications_id} 
                                        onChange={handleChange}
                                    >
                                        <option key={0} value={0}>Select Option</option>
                                        {qualifications.map(qualification => {
                                            const {id, qualification_name} = qualification;
                                            return (<option key={id} value={id}>{qualification_name}</option>)
                                        })}
                                    </select>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <label htmlFor="streams_id" className="registration-text-field-title">Stream*</label>
                                    <select 
                                        className='' 
                                        id="streams_id" 
                                        name="streams_id" 
                                        value={streams_id} 
                                        onChange={handleChange}
                                    >
                                        <option key={0} value={0}>Select Option</option>
                                        {streams.map(stream => {
                                            const {id, stream_name} = stream;
                                            return (<option key={id} value={id}>{stream_name}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="registration-text-field-list">
                                <div className="registration-title-text-field-container">
                                    <label htmlFor="colleges_id" className="registration-text-field-title">College*</label>
                                    <select 
                                        className='' 
                                        id="colleges_id" 
                                        name="colleges_id" 
                                        value={colleges_id} 
                                        onChange={handleChange}
                                    >
                                        <option key={0} value={0}>Select Option</option>
                                        {colleges.map(college => {
                                            const {id, college_name} = college;
                                            return (<option key={id} value={id}>{college_name}</option>)
                                        })}
                                    </select>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please enter your college name</div>
                                    <input 
                                        className="registration-text-field"
                                        type="text"
                                        name="other_college_name"
                                        value={other_college_name}
                                        onChange={handleChange}
                                        placeholder="" />
                                </div>
                            </div>

                            <div className="registration-title-text-field-container">
                                <div className="registration-text-field-title">Where is your college located?*</div>
                                <input 
                                    className="registration-text-field width-180" 
                                    type="text" 
                                    name="college_location"
                                    value={college_location}
                                    onChange={handleChange}
                                    placeholder="Pune" />
                            </div>
                        </div>
                    </details>

                    <details>
                        <summary>Professional Qualifications</summary>
                        <div className="professional-qualifications-collapse-container">
                            <div className="professional-qualifications-applicant-type-container">
                                <div className="professional-qualifications-applicant-type-text">Applicant Type*</div>
                                <div className="professional-qualifications-applicant-type-radio-container">
                                    <div className="job-card-time-slot-radio-text">
                                        <input type="radio" name="applicant-type" id={`fresher`} value={"fresher"} onChange={(e) => setApplicationType(e.target.value)} />
                                        <label htmlFor={`fresher`} className="job-card-radio"></label>
                                        <div>Fresher</div>
                                    </div>
                                    <div className="job-card-time-slot-radio-text">
                                        <input type="radio" name="applicant-type" id={`experienced`} value={"experienced"} onChange={(e) => setApplicationType(e.target.value)} defaultChecked={true} />
                                        <label htmlFor={`experienced`} className="job-card-radio"></label>
                                        <div>Experienced</div>
                                    </div>
                                </div>
                            </div>

                            {/* This is conditional Rendering based on selected radio */}

                            {applicantType == "experienced" ? 
                                <div className="experience-professional-qualification-applicant-container">
                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">Years of Experience*</div>
                                        <input 
                                            className="registration-text-field width-180"
                                            type="text" 
                                            name="year_of_experience"
                                            value={year_of_experience}
                                            onChange={handleChange}
                                            placeholder="5" />
                                    </div>

                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">Current CTC* (In Rupees)</div>
                                        <input 
                                            className="registration-text-field width-180"
                                            type="text" 
                                            name="current_ctc"
                                            value={current_ctc}
                                            onChange={handleChange}
                                            placeholder="5,00,000" />
                                    </div>

                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">Expected CTC* (In Rupees)</div>
                                        <input 
                                            className="registration-text-field width-180"
                                            type="text" 
                                            name="expected_ctc"
                                            value={expected_ctc}
                                            onChange={handleChange}
                                            placeholder="6,50,000" />
                                    </div>

                                    <div className="job-card-preference-container">
                                        <div className="job-card-preference-text">Select All The Technologies You Expertise In*</div>

                                        {technologies.map((tech) => {
                                            const {id, technology} = tech;
                                            return (
                                                <div className="job-card-preference-checkbox-text" key={id}>
                                                    <input 
                                                        type="checkbox" 
                                                        id={`job-card-expertise-technology-${id}`} 
                                                        name="experience_technologies"
                                                        value={id}
                                                        onChange={handleCheckBoxListChange}
                                                    />
                                                    <label htmlFor={`job-card-expertise-technology-${id}`} className="job-card-checkbox"></label>
                                                    <div>{technology}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please mention</div>
                                    <input 
                                        className="registration-text-field width-half"
                                        type="text" 
                                        name="other_experience_technologies"
                                        value={other_experience_technologies}
                                        onChange={handleChange} 
                                        placeholder="" />
                                </div>

                                <div className="job-card-preference-container">
                                    <div className="job-card-preference-text">Select All The Technologies You Are Familiar In</div>
                                    {technologies.map((tech) => {
                                        const {id, technology} = tech;
                                        return (
                                            <div className="job-card-preference-checkbox-text" key={id}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`job-card-familiar-technology-${id}`} 
                                                    name="familiar_technologies"
                                                    value={id}
                                                    onChange={handleCheckBoxListChange}
                                                />
                                                <label htmlFor={`job-card-familiar-technology-${id}`} className="job-card-checkbox"></label>
                                                <div>{technology}</div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please mention</div>
                                    <input 
                                        className="registration-text-field width-half"
                                        type="text" 
                                        name="other_familiar_technologies"
                                        value={other_familiar_technologies}
                                        onChange={handleChange} 
                                        placeholder="" />
                                </div>

                                <div className="experience-professional-qualifications-applican-container">
                                    <div className="professional-qualifications-applicant-type-text">Are you currently on notice period?*</div>
                                    <div className="professional-qualifications-applicant-type-radio-container">
                                        <div className="job-card-time-slot-radio-text">
                                            <input 
                                                type="radio" 
                                                name="on_notice_period" 
                                                value={1}
                                                checked={on_notice_period == 1}
                                                onChange={handleChange}
                                                id={`notice-period-yes`} />
                                            <label htmlFor={`notice-period-yes`} className="job-card-radio"></label>
                                            <div>Yes</div>
                                        </div>
                                        <div className="job-card-time-slot-radio-text">
                                            <input 
                                                type="radio" 
                                                name="on_notice_period" 
                                                value={0}
                                                checked={on_notice_period == 0}
                                                onChange={handleChange}
                                                id={`notice-period-no`} />
                                            <label htmlFor={`notice-period-no`} className="job-card-radio"></label>
                                            <div>No</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="registration-text-field-list">
                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">If Yes, when will your notice period end?*</div>
                                        <input 
                                            className="registration-text-field" 
                                            type="date" 
                                            name="notice_period_end_date" 
                                            value={notice_period_end_date}
                                            onChange={handleChange}
                                            placeholder="" />
                                    </div>

                                    <div className="registration-title-text-field-container">
                                        <label htmlFor="year-of-passing" className="registration-text-field-title">How long is your notice period?* (Mention in months)</label>
                                        <select 
                                            className=''  
                                            id="notice_period_duration"
                                            name="notice_period_duration" 
                                            value={notice_period_duration}
                                            onChange={handleChange}
                                        >
                                            <option value={0}>Select Option</option>
                                            {Month_Duration.map(Duration => {
                                                const {id, months} = Duration;
                                                return (<option key={id} value={id}>{months}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="experience-professional-qualifications-applican-container">
                                    <div className="professional-qualifications-applicant-type-text">Have You Appeared For Any Test By Zeus in the past 12 months?*</div>
                                    <div className="professional-qualifications-applicant-type-radio-container">
                                        <div className="job-card-time-slot-radio-text">
                                            <input 
                                                type="radio" 
                                                name="test_appearence" 
                                                value={1}
                                                checked={test_appearence == 1}
                                                onChange={handleChange}
                                                id={`appeared-yes`} />
                                            <label htmlFor={`appeared-yes`} className="job-card-radio"></label>
                                            <div>Yes</div>
                                        </div>
                                        <div className="job-card-time-slot-radio-text">
                                            <input 
                                                type="radio" 
                                                name="test_appearence" 
                                                value={0}
                                                checked={test_appearence == 0}
                                                onChange={handleChange}
                                                id={`appeared-no`} />
                                            <label htmlFor={`appeared-no`} className="job-card-radio"></label>
                                            <div>No</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If Yes, which role did you apply for?</div>
                                    <input 
                                        className="registration-text-field width-half"
                                        type="text"
                                        name="test_appearence_role" 
                                        value={test_appearence_role}
                                        onChange={handleChange} 
                                        placeholder="" />
                                </div>
                            </div>

                            :

                            applicantType == "fresher" ? <div className="experience-professional-qualification-applicant-container fresher-professional-qualification-applicant-container">
                                <div className="job-card-preference-container">
                                    <div className="job-card-preference-text">Select All The Technologies You Are Familiar In</div>

                                    {technologies.map((technology) => {
                                    return (
                                        <div className="job-card-preference-checkbox-text" key={technology.id}>
                                            <input type="checkbox" name="job-card-preference" id={`job-card-preference-${technology.id}`} />
                                            <label htmlFor={`job-card-preference-${technology.id}`} className="job-card-checkbox"></label>
                                            <div>{technology.technology}</div>
                                        </div>
                                    )
                                    })}
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please mention</div>
                                    <input 
                                        className="registration-text-field width-half"
                                        type="text" 
                                        name="other_familiar_technologies"
                                        value={other_familiar_technologies}
                                        onChange={handleChange} 
                                        placeholder="" />
                                </div>

                                <div className="experience-professional-qualifications-applican-container">
                                    <div className="professional-qualifications-applicant-type-text">Have You Appeared For Any Test By Zeus in the past 12 months?*</div>
                                    <div className="professional-qualifications-applicant-type-radio-container">
                                        <div className="job-card-time-slot-radio-text">
                                            <input 
                                                type="radio" 
                                                name="test_appearence" 
                                                value={1}
                                                checked={test_appearence == 1}
                                                onChange={handleChange}
                                                id={`appeared-yes`} />
                                            <label htmlFor={`appeared-yes`} className="job-card-radio"></label>
                                            <div>Yes</div>
                                        </div>
                                        <div className="job-card-time-slot-radio-text">
                                            <input 
                                                type="radio" 
                                                name="test_appearence" 
                                                value={0}
                                                checked={test_appearence == 0}
                                                onChange={handleChange}
                                                id={`appeared-no`} />
                                            <label htmlFor={`appeared-no`} className="job-card-radio"></label>
                                            <div>No</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If Yes, which role did you apply for?</div>
                                    <input 
                                        className="registration-text-field width-half"
                                        type="text"
                                        name="test_appearence_role" 
                                        value={test_appearence_role}
                                        onChange={handleChange} 
                                        placeholder="" />
                                </div>
                            </div>
                            : null
                            }
                        </div>
                    </details>
                </div>
            </div>

            <div className="multi-step-buttons-container">
                <button className={`multi-step-previous-button ${currentStep == 1 ? "disabled" : ""}`} type="button" onClick={() => onPrevious()}>Previous</button>
                <button className={`multi-step-next-button ${currentStep == 3 ? "disabled" : ""}`} type="button" onClick={() => onNext()}>Next</button>
            </div>
        </div>
    </div>
  )
}
