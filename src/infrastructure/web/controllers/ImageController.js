const ImageService = require('../../../application/services/ImageService');
const path = require('path');
const fs = require('fs');

class ImageController {
    // Descarga la imagen de un usuario
    static async downloadUserImage(req, res) {
        try {
            const userId = req.params.id;
            const result = await ImageService.downloadUserImage(userId);
            
            res.json({
                message: 'Image downloaded successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error downloading image',
                error: error.message 
            });
        }
    }

    // Sirve un archivo de imagen descargado
    static async serveDownloadedImage(req, res) {
        try {
            const fileName = req.params.fileName;
            const filePath = path.join(__dirname, '../../../../downloads', fileName);
            
            if (fs.existsSync(filePath)) {
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.error('Error sending file:', err);
                        res.status(500).json({ 
                            message: 'Error sending file',
                            error: err.message 
                        });
                    }
                });
            } else {
                res.status(404).json({ 
                    message: 'File not found',
                    fileName: fileName 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                message: 'Error serving file',
                error: error.message 
            });
        }
    }

    // Lista todas las imágenes descargadas
    static async listDownloadedImages(req, res) {
        try {
            const downloadsDir = path.join(__dirname, '../../../../downloads');
            
            if (!fs.existsSync(downloadsDir)) {
                fs.mkdirSync(downloadsDir, { recursive: true });
                return res.json({ files: [] });
            }

            const files = fs.readdirSync(downloadsDir);
            const fileInfo = files.map(file => ({
                fileName: file,
                filePath: `/api/downloads/${file}`,
                size: fs.statSync(path.join(downloadsDir, file)).size,
                createdAt: fs.statSync(path.join(downloadsDir, file)).birthtime
            }));

            res.json({ 
                count: fileInfo.length,
                files: fileInfo 
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error listing files',
                error: error.message 
            });
        }
    }

    // Descarga múltiples imágenes
    static async downloadMultipleImages(req, res) {
        try {
            const { userIds } = req.body;
            
            if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
                return res.status(400).json({ 
                    message: 'Invalid request. Please provide an array of userIds.' 
                });
            }

            const results = await ImageService.downloadMultipleUserImages(userIds);
            
            res.json({
                message: `${results.length} images downloaded successfully`,
                data: results
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error downloading multiple images',
                error: error.message 
            });
        }
    }
}

module.exports = ImageController;
