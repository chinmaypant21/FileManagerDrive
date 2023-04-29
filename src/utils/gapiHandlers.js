import { gapi } from 'gapi-script';

export const handleAuthClick = (setIsLoggedIn,event) => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        setIsLoggedIn(true)
      })
  };

export const handleSignOutClick = (setIsLoggedIn,event) => {
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      auth2.disconnect()
      setIsLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
    }
    );
  }
