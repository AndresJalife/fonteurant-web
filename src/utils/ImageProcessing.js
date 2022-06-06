export const processImage = async (file) => {
    const getBase64 = (file) => new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });

    // Deberiamos recortar la foto?

    return await getBase64(file);
};

export const isValidImage = (file) => {
    return file.size / 1024 <= 512;
};