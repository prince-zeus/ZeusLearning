// import React from 'react'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import JobDetails from '../data/jobdetails.json'
import JobRoles from '../data/job_roles.json'
import LocationIcon from '../assets/location_on_black_24dp.svg'
import Loader from "../components/Loader";
import './WalkInDetailsPage.css'

export function WalkInDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({});
  const [jobRoles, setJobRoles] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    setJobRoles(JobRoles);
  }, [])

  useEffect(()=>{
    getJobDetails(id);
  },[id])

  const getJobDetails = async (id) => {
    const Job = await JobDetails.filter(job => job.job_id == id);
    setJob(Job[0]);
    setTimeout(()=>{
      setLoading(false);
    },500)
  }

  let {job_id, job_title, dateandtime, location, job_roles, tags, general_instructions, instructions_for_the_exam, minimum_system_requirements, process, time_slots} = job;
  const updated_job_roles = jobRoles.filter(jobRole => job_roles?.includes(jobRole.job_role_id));

  return (
    <div className="job-card">
      {!loading && job_id != null ?
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
                    {updated_job_roles.map((jobRole, index) => {
                      const {job_role_icon, job_role_title} = jobRole;
                      return (
                        <>
                          <div className="job-role-container" key={index}>
                            <div className="job-role-icon-cover"><img className="job-role-icon" src={window.location.origin + job_role_icon} alt='Job Role Icon' /></div>
                            <div className="job-role-title">{job_role_title}</div>
                          </div>
                          {updated_job_roles.length != index+1 && <div className="vertical-line"></div>}
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
                <button type='button' className="apply-button">Apply</button>
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
                  return (
                    <div className="job-card-time-slot-radio-text" key={index}>
                      <input type="radio" name="job-card-time-slot" id={`job-card-time-slot-${index}`} checked={index == 0 ? true : false} />
                      <label htmlFor={`job-card-time-slot-${index}`} className="job-card-radio"></label>
                      <div>{timeSlot}</div>
                    </div>
                  )
                })}
              </div>

              <div className="horizontal-line"></div>

              <div className="job-card-preference-container">
                <div className="job-card-preference-text">Select Your Preference :</div>

                {updated_job_roles.map((jobRole, index) => {
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

              <div className="horizontal-line"></div>

              <div className="job-card-upload-resume-container">
                <label className="job-card-upload-icon"></label>
                <div className="job-card-upload-resume-text">Upload Updated Resume</div>
              </div>
            </div>

            <div className="job-card-roles-details-container">
              {updated_job_roles.map((jobRole, index) => {
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
