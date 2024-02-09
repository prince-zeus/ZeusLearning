import ZeusLogo from '../assets/Zeus-LMS-logo.svg'
import DropdownIcon from '../assets/icons/dropdown.svg'
import './AppBar.css'
import { useAuth } from '../hooks/useAuth';

export function AppBar({ pages }) {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <img src={ZeusLogo} alt="Zeus Logo" />
            {!!user && (<div className="header-actions">
                <div className="parent">
                    <img src="https://qph.cf2.quoracdn.net/main-qimg-228c725b76e58fd97f78efcda2cec96a-lq" alt="Profile Logo" className="action-logo profile-logo" />
                    <div className="slide-in-right">
                        <div className="hamburger-dropdown-menu">
                            <input className="dropdown-sub dsc1" type="checkbox" id="dropdown-sub" name="dropdown-sub"/>
                            <label className="for-dropdown-sub" htmlFor="dropdown-sub">Content<img src={DropdownIcon} className="uil"/></label>
                            <div className="section-dropdown-sub sds1"> 
                                <a href="">Course Catalog</a>
                            </div>
                            <input className="dropdown-sub dsc2" type="checkbox" id="dropdown-sub1" name="dropdown-sub"/>
                            <label className="for-dropdown-sub" htmlFor="dropdown-sub1">Users<img src={DropdownIcon} className="uil"/></label>
                            <div className="section-dropdown-sub sds2"> 
                                <a href="">Edit Profile</a>
                            </div>
                            <input className="dropdown-sub dsc3" type="checkbox" id="dropdown-sub2" name="dropdown-sub"/>
                            <label className="for-dropdown-sub" htmlFor="dropdown-sub2">Reports<img src={DropdownIcon} className="uil"/></label>
                            <div className="section-dropdown-sub sds3"> 
                                <a href="">Report Bug</a>
                            </div>
                            <input className="dropdown-sub dsc4" type="checkbox" id="dropdown-sub3" name="dropdown-sub"/>
                            <label className="for-dropdown-sub" htmlFor="dropdown-sub3">Admin<img src={DropdownIcon} className="uil"/></label>
                            <div className="section-dropdown-sub sds4"> 
                                <a href="">Edit Settings</a>
                            </div>
                            <a href="" onClick={logout}>Logout</a>
                           
                        </div>
                    </div>
                </div>
            </div>)}
        </header>
    )
}
