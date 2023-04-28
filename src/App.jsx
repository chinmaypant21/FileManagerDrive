import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { handleUpload } from './utils';
import { Search, Loading, DocumentTable, Button } from './components';
import './App.css';


const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';


function App() {
  const [signedInUser, setSignedInUser] = useState()
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false)
  const [documents, setDocuments] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    handleClientLoad();
    console.log('useEffect')
  }, [])


  const listFiles = (searchTerm = null) => {
    console.log('handlingList', searchTerm)
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        // pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        spaces: 'drive',
        q: searchTerm ? `name contains '${searchTerm}'` : null,
      })
      .then(function (response) {
        setIsFetchingGoogleDriveFiles(false);
        const res = JSON.parse(response.body);
        setDocuments(res.files);
      });
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      setIsLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
      const user = gapi.auth2.getAuthInstance().currentUser
      setSignedInUser({
        name: user.le.wt.Ad,
        imageURL: user.le.wt.hK,
        email: user.le.wt.cu
      });
      listFiles();
    }
  };

  const initClient = () => {
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        (function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        })()
        , function (error) { }
      );
  };

  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        setIsLoggedIn(true)
      })
  };

  const handleSignOutClick = (event) => {
    console.log('signout')
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      auth2.disconnect()
      setIsLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
    }
    );
  }

  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient)
  };

  return (
    <div className="App">
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
              <span>{signedInUser.email}</span>
              <div>
                <img src={signedInUser.imageURL} className='profile-img'/>
              </div>
              <div className='nav-btn-container'>
                <label htmlFor='uploadFileInput'>
                  <span className='btn-wrapper'>
                    Upload File
                  </span>
                  <input type='file' id='uploadFileInput' onChange={(e) => {handleUpload(e)}} style={{ display: 'none' }} />
                </label>
              </div>
              <div className='nav-btn-container'
                onClick={handleSignOutClick}
              >
                <span className='btn-wrapper'>Sign Out</span>
              </div>
            </div>

            : <div className='nav-btn-container'
                onClick={handleAuthClick}
              >
              <span className='btn-wrapper'>Sign In</span>
            </div>
        }
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          isLoggedIn
            ? <>
              <Search listHandler={listFiles} />

              {
                isFetchingGoogleDriveFiles
                  ? <Loading />
                  : <DocumentTable documents={documents} />
              }
            </>
            : <>
              <div className='login-element-container' onClick={handleAuthClick}>
                Login to Access Drive
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default App;
