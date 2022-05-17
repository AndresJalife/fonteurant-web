export const uploadFile = (file, filename, id, onprogress, onloadSucceed, onloadFailed) => {
    const dropboxToken = "sl.BHv8XFBubR81Srzgg0SNHCVVLG1nrH-LHlpiY2bz6OyWXFeICZOMDJc4LETl9LSwZZg7B2xetSkl-qlSNL2gOFDPB45YGP-xk-U0J36Jvk69bv32vmYPgYnTtSA5OknxQOAsdteJ1gDy"
    let xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (evt) => {
        // const percentComplete = parseInt(100.0 * evt.loaded / evt.total);
        // Upload in progress. Do something here with the percent complete.
        if (onprogress) onprogress()
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            // const fileInfo = JSON.parse(xhr.response);
            // Upload succeeded. Do something here with the file info.
            if (onloadSucceed) onloadSucceed()
        } else {
            // const errorMessage = xhr.response || 'Unable to upload file';
            // Upload failed. Do something here with the error.
            if (onloadFailed) onloadFailed()
        }
    };

    xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
    xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
        path: `/${id}-${filename}`,
        mode: 'add',
        autorename: true,
        mute: false
    }));

    xhr.send(file);
}
