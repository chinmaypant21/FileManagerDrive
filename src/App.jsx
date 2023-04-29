import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { handleAuthClick, handleUpload } from './utils';
import { Search, Loading, DocumentTable, Button } from './components';
import Navbar from './components/Navbar/Navbar';
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

  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient)
  };

  return (
    <div className="App">
      <Navbar user={signedInUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
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
              <div className='login-element-container' onClick={handleAuthClick.bind(this,setIsLoggedIn)}>
                Login to Access Drive
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default App;
