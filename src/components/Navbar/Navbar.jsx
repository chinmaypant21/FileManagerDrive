import React from 'react'
import './navbar.css'
import { gapi } from 'gapi-script';
import { handleUpload } from '../../utils';


const handleAuthClick = (setIsLoggedIn,event) => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        setIsLoggedIn(true)
      })
  };

  const handleSignOutClick = (setIsLoggedIn,event) => {
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      auth2.disconnect()
      setIsLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
    }
    );
  }

const Navbar = (props) => {
    const user = props.user
    const isLoggedIn = props.isLoggedIn
    const setIsLoggedIn = props.setIsLoggedIn

    return (
        <div className='nav-container'>
            <div className='nav-logo-container'>
                <img src='https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png'
                    style={{ objectFit: 'contain' }}
                    alt='drive logo'
                />
                <h2 style={{ color: '#444746' }}>Google Drive File Manager</h2>
            </div>

            {
                isLoggedIn
                    ? <div className='nav-left-container'>
                        <span>{user.email}</span>
                        <div>
                            <img src={user.imageURL} className='profile-img' />
                        </div>
                        <div className='nav-btn-container'>
                            <label htmlFor='uploadFileInput'>
                                <span className='btn-wrapper'>
                                    Upload File
                                </span>
                                <input type='file' id='uploadFileInput' onChange={(e) => { handleUpload(e) }} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <div className='nav-btn-container'
                            onClick={e => {handleSignOutClick(setIsLoggedIn,e)}}
                        >
                            <span className='btn-wrapper'>Sign Out</span>
                        </div>
                    </div>

                    : <div className='nav-btn-container'
                        onClick={(e) => {handleAuthClick(setIsLoggedIn,e)}}
                    >
                        <span className='btn-wrapper'>Sign In</span>
                    </div>
            }
        </div>

    )
}

export default Navbar