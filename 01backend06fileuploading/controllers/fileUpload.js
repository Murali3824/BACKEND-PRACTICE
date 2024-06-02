const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileUpload -> handler fumction
exports.localFileUpload = async(req,res) => {
    try {
        // fetch file from request
        const file = req.files.murali;
        console.log("FILE CAME ->",file);
        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH ->",path);

        // add path to move function
        file.mv(path, (err) => {
            console.log(err);
        });
        // create successfull response
        res.json({
            success:true,
            message:'local file uploaded'
        })
    } catch (error) {
        console.log("not able to upload the file in the server");
        console.log(error);
    }
}

// Function to check if the file type is supported
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// Function to upload a file to Cloudinary
async function uploadFileToCloudinary(filePath, folder, quality, resourceType) {
    try {
        const options = { folder, resource_type: resourceType || "image" }; // default resource type is image
        if (quality) options.quality = quality;

        const result = await cloudinary.uploader.upload(filePath, options);
        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
}

// Image upload handler
exports.imageUpload = async (req, res) => {
    try {
        // Fetch data
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Ensure file is uploaded
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const file = req.files.imageFile;
        console.log("File",file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            });
        }

        // Upload file to Cloudinary
        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file.tempFilePath, "Codehelp");
        console.log(response);

        // Save in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

// video upload handler
exports.videoUpload = async (req, res) => {
    try {
        // Fetch data
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            });
        }

        // Upload file to Cloudinary
        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file.tempFilePath, "Codehelp", null, 'video');
        console.log(response);

        // Save in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        });
        console.log("fileData",fileData);
        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'Video successfully uploaded',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}


// Image size reducer handler
exports.imageSizeReducer = async (req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            });
        }

        // Cloudinary upload
        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file.tempFilePath, "Codehelp", 90);
        console.log(response);

        // Save in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}