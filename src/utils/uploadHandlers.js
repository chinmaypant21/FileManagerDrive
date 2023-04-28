import { gapi } from "gapi-script"

async function getFileData(event) {
    const selectedFile = event.target.files[0]
    const path = URL.createObjectURL(selectedFile)
    const response = await fetch(path)
    return ({
        name: selectedFile.name,
        blob: await response.blob()
    })
}

async function handleUpload(event) {
    const { name, blob } = await getFileData(event)
    const file = new File([blob], name, { type: blob.type });
    const contentType = file.type || 'application/octet-stream';
    const user = gapi.auth2.getAuthInstance().currentUser.get();
    const oauthToken = user.getAuthResponse().access_token;

    const initResumable = new XMLHttpRequest();
    initResumable.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', true);
    initResumable.setRequestHeader('Authorization', 'Bearer ' + oauthToken);
    initResumable.setRequestHeader('Content-Type', 'application/json');
    initResumable.setRequestHeader('X-Upload-Content-Length', file.size);
    initResumable.setRequestHeader('X-Upload-Content-Type', contentType);

    initResumable.onreadystatechange = function () {
        if (initResumable.readyState === XMLHttpRequest.DONE && initResumable.status === 200) {
            const locationUrl = initResumable.getResponseHeader('Location');
            const reader = new FileReader();

            reader.onload = (e) => {
                const uploadResumable = new XMLHttpRequest();
                uploadResumable.open('PUT', locationUrl, true);
                uploadResumable.setRequestHeader('Content-Type', contentType);
                uploadResumable.setRequestHeader('X-Upload-Content-Type', contentType);
                uploadResumable.send(reader.result);

                uploadResumable.onreadystatechange = function () {
                    if (uploadResumable.readyState === XMLHttpRequest.DONE && uploadResumable.status === 200) {
                        console.log(uploadResumable.response);
                    }
                    else {
                    }
                };
            };

            reader.readAsArrayBuffer(file);
        }
    };

    initResumable.send(JSON.stringify({
        'name': file.name,
        'mimeType': contentType,
        'Content-Type': contentType,
        'Content-Length': file.size
    }))
}

export default handleUpload