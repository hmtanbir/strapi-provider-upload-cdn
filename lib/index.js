'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const fs = require('fs');
const path = require('path');
const {env} = require("strapi-utils");

const uploadPath = env('UPLOADS_PATH');
const cdnUrl = env('CDN_URL');

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'cdn',
  name: 'Custom CDN provider',
  init: (config) => {
    return {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          // write file in public/assets folder
          fs.writeFile(path.join(uploadPath , `/${file.hash}${file.ext}`), file.buffer, (err) => {
            if (err) {
              return reject(err);
            }

            file.url = cdnUrl + `/${file.hash}${file.ext}`;

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
