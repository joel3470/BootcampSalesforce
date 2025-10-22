const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ImageService {
    // Descarga una imagen desde una URL y la guarda localmente
    static async downloadImage(imageUrl, fileName) {
        try {
            const response = await axios({
                method: 'GET',
                url: imageUrl,
                responseType: 'stream'
            });

            const downloadPath = path.join(__dirname, '../../../downloads', fileName);
            
            // Crear directorio si no existe
            const dir = path.dirname(downloadPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const writer = fs.createWriteStream(downloadPath);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(downloadPath));
                writer.on('error', reject);
            });
        } catch (error) {
            throw new Error('Error downloading image: ' + error.message);
        }
    }

    // Descarga la imagen de un usuario específico
    static async downloadUserImage(userId) {
        try {
            const UserService = require('./UserService');
            const user = await UserService.getUserById(userId);
            
            // Generar nombre único para el archivo
            const fileName = `user_${userId}_${Date.now()}.jpg`;
            const downloadPath = await this.downloadImage(user.picture, fileName);
            
            return {
                success: true,
                fileName,
                path: downloadPath,
                originalUrl: user.picture,
                userName: user.name
            };
        } catch (error) {
            throw new Error('Error downloading user image: ' + error.message);
        }
    }

    // Descarga múltiples imágenes en paralelo
    static async downloadMultipleUserImages(userIds) {
        try {
            const downloadPromises = userIds.map(id => this.downloadUserImage(id));
            return await Promise.all(downloadPromises);
        } catch (error) {
            throw new Error('Error downloading multiple images: ' + error.message);
        }
    }
}

module.exports = ImageService;
