import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import LocationIcon from '../assets/location_on_black_24dp.svg'
import Loader from "../components/Loader";
import './WalkInDetailsPage.css'
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { ApplyJobMutation } from "../graphql/mutation";
import { useMutation } from "@apollo/client";

export function WalkInDetailsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resume_link: "",
    time_slots_id: 0,
    selected_job_roles: []
  });

  const [applyJobMutation] = useMutation(ApplyJobMutation);

  useEffect(()=>{
    getJob(id);
  },[id])

  const getJob = async (id) => {
    const response = await axios.get(`/api/jobs/${id}`,
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setJob(response?.data[0]);
    setLoading(false);
  }

  let {job_title, dateandtime, location, job_roles, tags, general_instructions, instructions_for_the_exam, minimum_system_requirements, process, time_slots} = job;

  const {resume_link, time_slots_id, selected_job_roles} = formData;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    try {

      applyJobMutation({
        variables: {
          appliedFormData: {...formData, users_id: user.userID}
        },
        onCompleted: (data) => {
          const {applyJob} = data;
          setFormData({
            resume_link: "",
            time_slots_id: 0,
            selected_job_roles: []
          });
          navigate(`/jobs/${applyJob}/applicationsuccess`, { replace: true });
        },
        onError: (error) => {
          // Handle the error from the mutation
          alert(error.message);
        }
      })
        // const response = await axios.post('/api/appliedjob',
        //     JSON.stringify({resume_link, time_slots_id, selected_job_roles, users_id: user.userID}),
        //     {
        //         headers: { 'Content-Type': 'application/json' },
        //         withCredentials: true
        //     }
        // );

        // const {insertId} = response.data;
        // setFormData({
        //   resume_link: "",
        //   time_slots_id: "",
        //   selected_job_roles: []
        // });
        // navigate(`/jobs/${insertId}/applicationsuccess`, { replace: true });
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
    <div className="job-card">
      {!loading && job?.id != null ?
        (
          <>
            <div className="job-card-details">
              <div className="job-card-main-details">
                <h2 className="job-card-title">{job_title}</h2>
                <div className="date-time-location-container">
                  <div className="date-time-text">Date & Time :</div>
                  <div className="date-time-location">
                    <div className="date-time">{dateandtime}</div>
                    <div className="vertical-line"></div>
                    <div className="location-container">
                      <img className="location-icon" src={LocationIcon} alt='Location Icon'/>
                      <div className="location-text">{location}</div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-line"></div>
                <div className="job-roles-container">
                  <div className="job-role-text">Job Roles :</div>
                  <div className="job-roles">
                    {job_roles.map((jobRole, index) => {
                      const {job_role_icon, job_role_title} = jobRole;
                      return (
                        <>
                          <div className="job-role-container" key={index}>
                            <div className="job-role-icon-cover"><img className="job-role-icon" src={window.location.origin + job_role_icon} alt='Job Role Icon' /></div>
                            <div className="job-role-title">{job_role_title}</div>
                          </div>
                          {job_roles.length != index+1 && <div className="vertical-line"></div>}
                        </>
                      )
                    })}
                  </div>
                </div>
                {tags?.length > 0 && <div className="job-tags-container">
                  {tags.map((tag, index) => {
                    return (
                      <>
                        <div className="job-tag-text" key={index}>{tag}</div>
                        {tags.length != index+1 && <div className="vertical-line"></div>}
                      </>
                    )
                  })}
                </div>}
                <button type='button' className="apply-button" onClick={handleSubmit}>Apply</button>
              </div>
              <details className="job-card-main-details-collapse">
                    <summary className="job-card-main-details-summary">Pre-requisites & Application Process</summary>
                    <div className="details-summary-collapse-content">
                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">General Instructions :</div>
                        <div className="details-summary-collapse-content-text-details">{general_instructions}</div>
                      </div>

                      <div className="horizontal-line"></div>

                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">Instructions for the Exam :</div>
                        <div className="details-summary-collapse-content-text-details">{instructions_for_the_exam}</div>
                      </div>

                      <div className="horizontal-line"></div>

                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">Minimum System Requirements :</div>
                        <div className="details-summary-collapse-content-text-details">{minimum_system_requirements}</div>
                      </div>

                      <div className="horizontal-line"></div>

                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">Process :</div>
                        <div className="details-summary-collapse-content-text-details">{process}</div>
                      </div>
                    </div>
              </details>
            </div>

            <div className="job-card-time-slot-preference-container">
              <div className="job-card-time-slot-preference-text">Time Slots & Preferences</div>
              <div className="job-card-time-slot-container">
                <div className="job-card-time-slot-text">Select a Time Slot :</div>

                {time_slots.map((timeSlot, index) => {
                  const {id, time} = timeSlot;
                  return (
                    <div className="job-card-time-slot-radio-text" key={index}>
                      <input 
                        type="radio" 
                        id={`job-card-time-slot-${index}`} 
                        name="time_slots_id" 
                        value={id}
                        checked={time_slots_id === id}
                        onChange={handleChange}
                      />
                      <label htmlFor={`job-card-time-slot-${index}`} className="job-card-radio"></label>
                      <div>{time}</div>
                    </div>
                  )
                })}
              </div>

              <div className="horizontal-line"></div>

              <div className="job-card-preference-container">
                <div className="job-card-preference-text">Select Your Preference :</div>

                {job_roles.map((jobRole, index) => {
                  
                  const {id, job_role_title} = jobRole;
                  return (
                    <div className="job-card-preference-checkbox-text" key={index}>
                      <input 
                        type="checkbox" 
                        id={`job-card-selected-preference-${index}`} 
                        name="selected_job_roles" 
                        value={id}
                        checked={selected_job_roles.includes(id)}
                        onChange={handleCheckBoxListChange}
                      />
                      <label htmlFor={`job-card-selected-preference-${index}`} className="job-card-checkbox"></label>
                      <div>{job_role_title}</div>
                    </div>
                  )
                })}
              </div>

              <div className="horizontal-line"></div>

              <div className="job-card-upload-resume-container">
                <label className="job-card-upload-icon"></label>
                <input 
                    type="file" 
                    name="resume_link"
                    value={resume_link}
                    onChange={handleChange}
                    id="resume-upload" 
                    style={{display:'none'}} />
                <label className="job-card-upload-resume-text" htmlFor='resume-upload'>{resume_link ? resume_link : "Upload Updated Resume"}</label>
              </div>
            </div>

            <div className="job-card-roles-details-container">
              {job_roles.map((jobRole, index) => {
                const {job_role_title, gross_compensation_package, role_description, requirements} = jobRole;
                return (
                  <details key={index}>
                    <summary>{job_role_title}</summary>
                    <div className="details-summary-collapse-content">
                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">Gross Compensation Package :</div>
                        <div className="details-summary-collapse-content-text-details">{gross_compensation_package}</div>
                      </div>

                      <div className="horizontal-line"></div>

                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">Role Description :</div>
                        <div className="details-summary-collapse-content-text-details">{role_description}</div>
                      </div>

                      <div className="horizontal-line"></div>

                      <div className="details-summary-collapse-content-container">
                        <div className="details-summary-collapse-content-text">Requirements :</div>
                        <div className="details-summary-collapse-content-text-details">{requirements}</div>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </>
        )
      : (
        <Loader />
      )}
    </div>
  )
}
