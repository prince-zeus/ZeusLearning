import './WalkInApplicationSuccessPage.css'
import ApplicationSuccess from '../assets/check_black_24dp.svg'

export function WalkInApplicationSuccessPage() {
  return (
    <div className="application-success-job-card-container">
      <div className="application-success-job-card">
        <div className="application-success-job-car-title">Congratulations ! You have successfully applied for the walk-in opportunity</div>
        <div className="horizontal-line"></div>

        <div className="details-summary-collapse-content-container">
          <div className="details-summary-collapse-content-text">Date & Time of Walk-In :</div>
          <div className="details-summary-collapse-content-text-details">{"03rd July 2021 \n 9:00 AM to 11:00 AM"}</div>
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
    </div>
  )
}
