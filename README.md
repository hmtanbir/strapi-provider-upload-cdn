# strapi-provider-upload-cdn
Local provider for strapi CDN upload

## add first in your package.json
```
"strapi-provider-upload-cdn": "https://github.com/hmtanbir/strapi-provider-upload-cdn.git",
```
### install the plugin
```
yarn
```
### add config in config/plugins.js

```
module.exports = ({ env }) => ({
  upload: {
    provider: 'cdn',
    providerOptions: {
      path: env('UPLOADS_PATH'),
      cdnUrl: env('CDN_URL'),
    },
  },
});
```


Set two ENV variables:

1. UPLOADS_PATH
2. CDN_URL

Example:


UPLOADS_PATH=/home/hmtanbir/www/bdmade/kphfarm/backend/public/uploads/images
CDN_URL="http://localhost/bdmade/kphfarm/backend/public/uploads/images"
