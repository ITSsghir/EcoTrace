const { VertexAI } = require('@google-cloud/vertexai');
const { default: axios } = require('axios');
const fs = require('fs');
const { URL } = require('url');

// Initialize Vertex with your Cloud project and location
const projectId = 'tactile-octagon-418317';
const locationId = 'europe-west4';
const model = 'gemini-pro-vision';

/**
 * 
 * @param {string} filePath 
 * @returns {Promise<string>} the file as a base64 string
 */
async function getFileAsBase64(filePath) {
    if (!filePath) {
        return null;
    }
    // URLs don't work, revise later
    if (filePath.startsWith('http') || filePath.startsWith('https')) {
        const url = new URL(filePath);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data).toString('base64');
    }
    return filePath;
}

/**
 * 
 * @param {string} filePath 
 * @returns {string} the mimetype of the file
 */
function getMimeType(extension) {
    const extensionToMimeType = {
        png: "image/png",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        webp: "image/webp",
        heic: "image/heic",
        heif: "image/heif",
        mov: "video/mov",
        mpeg: "video/mpeg",
        mp4: "video/mp4",
        mpg: "video/mpg",
        avi: "video/avi",
        wmv: "video/wmv",
        mpegps: "video/mpegps",
        flv: "video/flv",
    };

    return extensionToMimeType[extension] || null;
}

/**
 * 
 * @param {string} projectId 
 * @param {dtring} projectLocation 
 * @param {dtring} model 
 * @param {string} inputFilePath 
 * @param {string} userPrompt 
 * @returns {Promise<string>} the response from the Vertex Vision AI API
 */
async function callGeminiAPI(
    projectId,
    projectLocation,
    model,
    inputFilePath,
    userPrompt,
    extension
) {
    // Initialize Vertex with your Cloud project and location
    const vertexAI = new VertexAI({
        project: projectId,
        location: projectLocation,
    });

    // Instantiate the model
    const generativeVisionModel = vertexAI.preview.getGenerativeModel({
        model: model,
    });

    // Construct the request with the user question only, assuming no file is uploaded
    const textPart = {
        text: userPrompt,
    };
    let requestPart = [textPart];

    // If the user has selected a file, add it to the request
    if (inputFilePath) {
        // Gemini requires the file in base64 and with a mimetype
        const base64File = await getFileAsBase64(inputFilePath);
        const mimeType = getMimeType(extension);

        const filePart = {
            inlineData: {
                data: base64File,
                mimeType: mimeType,
            },
        };

        // Push the file information to  requestPart
        requestPart.push(filePart);
    }

    const request = {
        contents: [{ role: "user", parts: requestPart }],
    };

    // Create the response stream
    let aggregatedResponse;
    try {
        const responseStream = await generativeVisionModel.generateContentStream(
            request
        );

        // Wait for the response stream to complete
        aggregatedResponse = await responseStream.response;
    } catch (error) {
        console.error("Error calling the API:", error);
        return new Promise((_, reject) => {
            reject(error);
        });
    }

    return aggregatedResponse.candidates[0].content.parts[0].text;
}

/**
 * 
 * @param {string} imagePath 
 * @returns {Promise<string>} the prediction from the API
 */
async function predict(imagePath, extension, prompt) {
    if (!imagePath) {
        return new Promise((_, reject) => {
            reject('No image provided');
        });
    }
    const response = await callGeminiAPI(projectId, locationId, model, imagePath, prompt, extension)
            .then((prediction) => {
                return new Promise((resolve) => {
                    resolve(prediction);
                });
            })
            .catch((err) => {
                console.error(err);
                return new Promise((_, reject) => {
                    reject('Error calling the API'+ err);
                });
            }      
        );
    return response;
}

// Export the function
module.exports = { predict };