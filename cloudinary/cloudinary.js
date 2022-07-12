
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: 'dajtxxkvg',
    api_key: '864934733624837',
    api_secret: 'XZQXnKv01NlwzlS3qVsQ9RL9GTM',
    secure: true
});

module.exports = cloudinary;