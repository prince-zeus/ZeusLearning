import { useEffect, useState } from 'react'
import './ListingPage.css'
import JobDetails from '../data/jobdetails.json'
import JobRoles from '../data/job_roles.json'
import LocationIcon from '../assets/location_on_black_24dp.svg'
import { useNavigate } from 'react-router-dom'

export function ListingPage() {
  const [jobs, setJobs] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setJobs(JobDetails);
    setJobRoles(JobRoles);
  }, []);
  return (
    <div className="listing-container">
      {jobs.map(job => {
        let {job_id, job_title, dateandtime, location, job_roles, tags} = job;
        const updated_job_roles = jobRoles.filter(jobRole => job_roles.includes(jobRole.job_role_id));
        return (
          <div className="job-card-main-details" key={job_id}>
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
            {updated_job_roles.length > 0 && <div className="horizontal-line"></div>}
            <div className="job-roles-container">
              <div className="job-role-text">Job Roles :</div>
              {updated_job_roles.length > 0 && <div className="job-roles">
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
              </div>}
            </div>
            {tags.length > 0 && <div className="job-tags-container">
              {tags.map((tag, index) => {
                return (
                  <>
                    <div className="job-tag-text" key={index}>{tag}</div>
                    {tags.length != index+1 && <div className="vertical-line"></div>}
                  </>
                )
              })}
            </div>}
            <button type='button' className="view-more-details-button" onClick={() => navigate(`/jobs/${job_id}`)}>View More Details</button>
          </div>
        )
      })}
    </div>
  )
}
