# menu-website
## Related Projects
* [menu-api](https://github.com/virtbad/menu-api)
* [menu-updater](https://github.com/virtbad/menu-updater)
* [menu-telegram-bot](https://github.com/virtbad/menu-telegram-bot)
* [menu-cli](https://github.com/virtbad/menu-cli)

## Setup
Before the site can be deployed you'll need to create a ```.env.local``` file in the root folder. This file should include the following environment variables:
```javascript
NEXT_PUBLIC_API_URL=        // your api url
NEXT_PUBLIC_HOSTNAME=       // the hostname of the deployed site e.g. https://example.com
NEXT_PUBLIC_SEO_KEYWORDS=   // the base keyword set for seo e.g. keyword1,keyword2,...
NEXT_PUBLIC_GOOGLE=         // the google search console key to observe the site via google search console
NEXT_PUBLIC_MSAL_CLIENTID=  // the client id for the microsoft authentication library
NEXT_PUBLIC_MSAL_AUTHORITY= // the authority id for the microsoft authentication library
NEXT_PUBLIC_TITLE_PREFIX=   // the base title for every site e.g. NAME | Home, where NAME is this variable
NEXT_PUBLIC_FRONTEND_REPO=  // url to the repository of the menu-website 
NEXT_PUBLIC_BACKEND_REPO=   // url to the repository of the menu-api
NEXT_PUBLIC_DOCUMENTATION=  // url to the documentation of the menu-api
NEXT_PUBLIC_ORGA=           // url to our orga
NEXT_PUBLIC_TELEGRAM=       // url to the menu-telegram-bot to add it to your chats
NEXT_PUBLIC_CLI=            // url to the repository of the menu-cli
NEXT_PUBLIC_LOCATION=       // location where this website belongs to
```
Additionally you'll need to have [Node.js](https://nodejs.org/en/) installed in order to deploy the site.
## Deploy
After cloning this repository you must first install all dependencies of the website. Additionally you'll need to have Next.js installed on your system
```bash
# install all depenencies
npm install 
# install Next.js
npm install -g next
```
```bash
# deploy the website locally in dev mode on port 8000
npm run start:dev
# deploy the website locally in production mode on port 8000
npm run start:build
```
