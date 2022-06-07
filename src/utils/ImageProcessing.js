export const processImage = async (file, width, height) => {
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

    const data = await getBase64(file);
    return await cropImage(data);

};

const cropImage = async (dataUrl) => {
    const originalImage = new Image();
    originalImage.src = dataUrl;

    const cropJob = new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        originalImage.addEventListener('load', function() {

            const minDim = Math.min(originalImage.width, originalImage.height);
            canvas.width = minDim;
            canvas.height = minDim;

            //draw the image
            ctx.drawImage(
                originalImage,
                (originalImage.width - minDim) / 2,
                (originalImage.height - minDim) / 2,
                minDim,
                minDim,
                0,
                0,
                minDim,
                minDim
            );

            resolve(canvas.toDataURL("image/jpeg", 0.9));
        });
    })

    return await cropJob;
}

export const isValidImage = (file) => {
    return file.size / 1024 <= 1024;
};