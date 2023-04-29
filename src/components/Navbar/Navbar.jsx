import React from 'react'
import './navbar.css'
import { handleAuthClick, handleSignOutClick, handleUpload } from '../../utils';

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
                    ? <div className='nav-right-container'>
                        <span className='nav-text-wrap'>{user.email}</span>
                        <div>
                            <img src={user.imageURL} className='profile-img' />
                        </div>
                        <div className='nav-btn-container'>
                            <label htmlFor='uploadFileInput'>
                                <span className='btn-wrapper'>
                                    Upload
                                </span>
                                <input type='file' id='uploadFileInput' onChange={handleUpload} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <div className='nav-btn-container'
                            onClick={handleSignOutClick.bind(this,setIsLoggedIn)}
                        >
                            <span className='btn-wrapper'>Sign Out</span>
                        </div>
                    </div>

                    : <div className='nav-btn-container'
                        onClick={handleAuthClick.bind(this, setIsLoggedIn)}
                    >
                        <span className='btn-wrapper'>Sign In</span>
                    </div>
            }
        </div>

    )
}

export default Navbar