import './WalkInApplicationSuccessPage.css'
import ApplicationSuccess from '../assets/check_black_24dp.svg'
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Loader from '../components/Loader';

export function WalkInApplicationSuccessPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    getJob(id);
  },[id])

  const getJob = async (id) => {
    const response = await axios.post(`/api/appliedjob/${id}`,
      JSON.stringify({userID: user.userID}),
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
    );
    setApplication(response?.data);
    setLoading(false);
  }

  const {time, dateandtime} = application;

  return (
    <div className="application-success-job-card-container">
      {!loading && application?.users_id != null ?
        (<div className="application-success-job-card">
          <div className="application-success-job-car-title">Congratulations ! You have successfully applied for the walk-in opportunity</div>
          <div className="horizontal-line"></div>

          <div className="details-summary-collapse-content-container">
            <div className="details-summary-collapse-content-text">Date & Time of Walk-In :</div>
            <div className="details-summary-collapse-content-text-details">{`${dateandtime.split(" to ")[0].replace(/-/g, ' ')} \n ${time}`}</div>
          </div>

          <div className="horizontal-line"></div>

          <div className="details-summary-collapse-content-container">
            <div className="details-summary-collapse-content-text">Venue of Walk-In :</div>
            <div className="details-summary-collapse-content-text-details">{"Zeus Systems Pvt. Ltd. \n1402, 14th Floor, Tower B, Peninsula Business Park. Ganpatrao Kadam Marg \nLower Parel (W) \nMumbai - 400 013 \nPhone: +91-22-66600000"}</div>
          </div>

          <div className="horizontal-line"></div>

          <div className="details-summary-collapse-content-container">
            <div className="details-summary-collapse-content-text">THINGS TO REMEMBER :</div>
            <div className="details-summary-collapse-content-text-details">{"- Please report 30 MINUTES prior to your reporting time. \n- Download your Hall Ticket from below and carry it with you during your Walk-In."}</div>
          </div>

          <div className="horizontal-line"></div>

          <button type='button' className="download-hall-ticket-button">DOWNLOAD HALL TICKET</button>


          <div className="application-success-job-card-icon"><img src={ApplicationSuccess} alt="Application Success Icon" /></div>
        </div>
        )
      : (
        <Loader />
      )}
    </div>
  )
}
