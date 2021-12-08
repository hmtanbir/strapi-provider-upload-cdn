'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const fs = require('fs');
const path = require('path');
const uploadPath = strapi.config.uploads.path;
const cdnUrl = strapi.config.uploads.cdnUrl;
const imagePath = cdn_url + uploadPath;
/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'local-custom-provider',
  name: 'Local provider',
  init: (config) => {
    return {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          // write file in public/assets folder
          fs.writeFile(path.join(uploadPath , `/${file.hash}${file.ext}`), file.buffer, (err) => {
            if (err) {
              return reject(err);
            }

            file.url = path.join(imagePath , `/${file.hash}${file.ext}`);

            resolve();
          });
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(uploadPath , `/${file.hash}${file.ext}`);

          if (!fs.existsSync(filePath)) {
            return resolve('File doesn\'t exist');
          }

          // remove file from public/assets folder
          fs.unlink(filePath, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      }
    };
  }
};
