import './RegistrationPage.css'
import BackIcon from "../assets/arrow_upward_black_24dp.svg"
import { useEffect, useState } from 'react'
import JobRoles from '../data/job_roles.json'
import Technologies from '../data/technologies.json'
import ProfileIcon from '../assets/profile-user.svg'
import EditIcon from '../assets/pen.svg'

export default function RegistrationPage() {
  const [currentStep ,setCurrentStep] = useState(1);
  const [jobRoles, setJobRoles] = useState([]);
//   const [technologies, setTechnologies] = useState(Technologies);
  const [applicantType, setApplicationType] = useState("experienced");

  useEffect(() => {
    setJobRoles(JobRoles);
  }, [])

  const onPrevious = () => {
    setCurrentStep(prev => {
        if(prev > 1) {
            return prev - 1;
        }
        return prev;
    })
  }

  const onNext = () => {
    setCurrentStep(prev => {
        if(prev < 4) {
            return prev + 1;
        }
        return prev;
    })
  }

  return (
    <div className="registration-page-container">
        <div className="registration-page-actionbar">
            <img src={BackIcon} alt="Back Button" className="registration-page-actionbar-back-icon" />

            <div className="registration-page-actionbar-text">Create an account</div>

            <div className="registration-page-actionbar-actions">
                <button type='button' className='registration-page-actionbar-cancel-button'>Cancel</button>
                <button type='button' className='registration-page-actionbar-create-button'>Create</button>
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
                        <input type="text" className="registration-text-field width-480" id="firstname" placeholder="John" />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Last Name*</div>
                        <input type="text" className="registration-text-field width-480" id="lastname" placeholder="Watson" />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Email*</div>
                        <input type="text" className="registration-text-field width-480" id="email" placeholder="Johnwatson@example.com" />
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Phone Number*</div>
                        <div className="registration-phone-number-container">
                            <div />
                            <input type="number" className="registration-country-code-text-field" id="countrycode" placeholder="91" />
                            <input type="number" className="registration-phone-number-text-field" id="phonenumber" placeholder="9876543210" />
                        </div>
                    </div>

                    <div className="job-card-upload-resume-container">
                        <label className="job-card-upload-icon"></label>
                        <div className="job-card-upload-resume-text">Upload Resume</div>
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">Enter Portfolio URL (if any)</div>
                        <input type="text" className="registration-text-field width-480" id="portfolio" placeholder="www.myportfolio.in" />
                    </div>

                    <div className="job-card-preference-container">
                        <div className="job-card-preference-text">Preferred Job Roles*</div>

                        {jobRoles.map((jobRole, index) => {
                        const {job_role_title} = jobRole;
                        return (
                            <div className="job-card-preference-checkbox-text" key={index}>
                                <input type="checkbox" name="job-card-preference" id={`job-card-preference-${index}`} />
                                <label htmlFor={`job-card-preference-${index}`} className="job-card-checkbox"></label>
                                <div>{job_role_title}</div>
                            </div>
                        )
                        })}
                    </div>

                    <div className="registration-title-text-field-container">
                        <div className="registration-text-field-title">If You Are Registering Via A Referral, Please Mention Full Name Of The Employee Who Referred You</div>
                        <input type="text" className="registration-text-field width-480" id="firstname" placeholder="" />
                    </div>

                    <div className="job-card-preference-checkbox-text">
                        <input type="checkbox" name="job-card-preference" id={`send-me-update`} />
                        <label htmlFor={`send-me-update`} className="job-card-checkbox"></label>
                        <div>Send me job related updates via mail</div>
                    </div>

                    <div className="registration-upload-display-picture-container">
                        <img src={ProfileIcon} alt="Profile Icon" />
                        <div className="registration-upload-text-container">
                            <div className="registration-upload-display-picture-button">UPLOAD DISPLAY PICTURE</div>
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
                    <details open={true}>
                        <summary>Educational Qualifications</summary>
                        <div className="educational-qualifications-collapse-container">
                            <div className="registration-title-text-field-container">
                                <div className="registration-text-field-title">Aggregate Percentage*</div>
                                <input type="text" className="registration-text-field width-180" id="aggreatepercentage" placeholder="65" />
                            </div>

                            <div className="registration-title-text-field-container">
                                <label htmlFor="year-of-passing" className="registration-text-field-title">Year of Passing*</label>
                                <select className='width-180' name="state" id="year-of-passing">
                                    <option value="alabama">2020</option>
                                </select>
                            </div>

                            <div className="registration-text-field-list">
                                <div className="registration-title-text-field-container">
                                    <label htmlFor="year-of-passing" className="registration-text-field-title">Qualification*</label>
                                    <select className='' name="state" id="year-of-passing">
                                        <option value="alabama">Bachelor in Technology (B.Tech)</option>
                                    </select>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <label htmlFor="year-of-passing" className="registration-text-field-title">Stream*</label>
                                    <select className='' name="state" id="year-of-passing">
                                        <option value="alabama">Information Technology</option>
                                    </select>
                                </div>
                            </div>

                            <div className="registration-text-field-list">
                                <div className="registration-title-text-field-container">
                                    <label htmlFor="year-of-passing" className="registration-text-field-title">College*</label>
                                    <select className='' name="state" id="year-of-passing">
                                        <option value="alabama">Pune Institute of Technology (PIT)</option>
                                    </select>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please enter your college name</div>
                                    <input type="text" className="registration-text-field" id="email" placeholder="" />
                                </div>
                            </div>

                            <div className="registration-title-text-field-container">
                                <div className="registration-text-field-title">Where is your college located?*</div>
                                <input type="text" className="registration-text-field width-180" id="email" placeholder="Pune" />
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
                                        <input type="text" className="registration-text-field width-180" id="aggreatepercentage" placeholder="5" />
                                    </div>

                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">Current CTC* (In Rupees)</div>
                                        <input type="text" className="registration-text-field width-180" id="aggreatepercentage" placeholder="5,00,000" />
                                    </div>

                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">Expected CTC* (In Rupees)</div>
                                        <input type="text" className="registration-text-field width-180" id="aggreatepercentage" placeholder="6,50,000" />
                                    </div>

                                    <div className="job-card-preference-container">
                                        <div className="job-card-preference-text">Select All The Technologies You Expertise In*</div>

                                        {Technologies.map((technology, index) => {
                                        return (
                                            <div className="job-card-preference-checkbox-text" key={index}>
                                                <input type="checkbox" name="job-card-preference" id={`job-card-preference-${index}`} />
                                                <label htmlFor={`job-card-preference-${index}`} className="job-card-checkbox"></label>
                                                <div>{technology.technology}</div>
                                            </div>
                                        )
                                        })}
                                    </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please mention</div>
                                    <input type="text" className="registration-text-field width-half" id="aggreatepercentage" placeholder="" />
                                </div>

                                <div className="job-card-preference-container">
                                    <div className="job-card-preference-text">Select All The Technologies You Are Familiar In</div>

                                    {Technologies.map((technology, index) => {
                                    return (
                                        <div className="job-card-preference-checkbox-text" key={index}>
                                            <input type="checkbox" name="job-card-preference" id={`job-card-preference-${index}`} />
                                            <label htmlFor={`job-card-preference-${index}`} className="job-card-checkbox"></label>
                                            <div>{technology.technology}</div>
                                        </div>
                                    )
                                    })}
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please mention</div>
                                    <input type="text" className="registration-text-field width-half" id="aggreatepercentage" placeholder="" />
                                </div>

                                <div className="experience-professional-qualifications-applican-container">
                                    <div className="professional-qualifications-applicant-type-text">Are you currently on notice period?*</div>
                                    <div className="professional-qualifications-applicant-type-radio-container">
                                        <div className="job-card-time-slot-radio-text">
                                            <input type="radio" name="notice-period" id={`notice-period-yes`} defaultChecked={true} />
                                            <label htmlFor={`notice-period-yes`} className="job-card-radio"></label>
                                            <div>Yes</div>
                                        </div>
                                        <div className="job-card-time-slot-radio-text">
                                            <input type="radio" name="notice-period" id={`notice-period-no`} />
                                            <label htmlFor={`notice-period-no`} className="job-card-radio"></label>
                                            <div>No</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="registration-text-field-list">
                                    <div className="registration-title-text-field-container">
                                        <div className="registration-text-field-title">If Yes, when will your notice period end?*</div>
                                        <input type="date" className="registration-text-field" id="email" placeholder="" />
                                    </div>

                                    <div className="registration-title-text-field-container">
                                        <label htmlFor="year-of-passing" className="registration-text-field-title">How long is your notice period?* (Mention in months)</label>
                                        <select className='' name="state" id="year-of-passing">
                                            <option value="alabama">2 months</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="experience-professional-qualifications-applican-container">
                                    <div className="professional-qualifications-applicant-type-text">Have You Appeared For Any Test By Zeus in the past 12 months?*</div>
                                    <div className="professional-qualifications-applicant-type-radio-container">
                                        <div className="job-card-time-slot-radio-text">
                                            <input type="radio" name="appeared" id={`appeared-yes`} defaultChecked={true} />
                                            <label htmlFor={`appeared-yes`} className="job-card-radio"></label>
                                            <div>Yes</div>
                                        </div>
                                        <div className="job-card-time-slot-radio-text">
                                            <input type="radio" name="appeared" id={`appeared-no`} />
                                            <label htmlFor={`appeared-no`} className="job-card-radio"></label>
                                            <div>No</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If Yes, which role did you apply for?</div>
                                    <input type="text" className="registration-text-field width-half" id="aggreatepercentage" placeholder="" />
                                </div>
                            </div>

                            :

                            applicantType == "fresher" ? <div className="experience-professional-qualification-applicant-container fresher-professional-qualification-applicant-container">
                                <div className="job-card-preference-container">
                                    <div className="job-card-preference-text">Select All The Technologies You Are Familiar In</div>

                                    {Technologies.map((technology, index) => {
                                    return (
                                        <div className="job-card-preference-checkbox-text" key={index}>
                                            <input type="checkbox" name="job-card-preference" id={`job-card-preference-${index}`} />
                                            <label htmlFor={`job-card-preference-${index}`} className="job-card-checkbox"></label>
                                            <div>{technology.technology}</div>
                                        </div>
                                    )
                                    })}
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If others, please mention</div>
                                    <input type="text" className="registration-text-field width-half" id="aggreatepercentage" placeholder="" />
                                </div>

                                <div className="experience-professional-qualifications-applican-container">
                                    <div className="professional-qualifications-applicant-type-text">Have You Appeared For Any Test By Zeus in the past 12 months?*</div>
                                    <div className="professional-qualifications-applicant-type-radio-container">
                                        <div className="job-card-time-slot-radio-text">
                                            <input type="radio" name="appeared" id={`appeared-yes`} defaultChecked={true} />
                                            <label htmlFor={`appeared-yes`} className="job-card-radio"></label>
                                            <div>Yes</div>
                                        </div>
                                        <div className="job-card-time-slot-radio-text">
                                            <input type="radio" name="appeared" id={`appeared-no`} />
                                            <label htmlFor={`appeared-no`} className="job-card-radio"></label>
                                            <div>No</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="registration-title-text-field-container">
                                    <div className="registration-text-field-title">If Yes, which role did you apply for?</div>
                                    <input type="text" className="registration-text-field width-half" id="aggreatepercentage" placeholder="" />
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
