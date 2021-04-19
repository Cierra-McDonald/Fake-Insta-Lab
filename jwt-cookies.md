** utils/jws.js
  - npm i jsonwebtoken
  - const sign = to sign the token
  - const verify = to verify token signature

** app.js
  - need to add app.use(require('cookie-parser')());

** controllers/auth.js
  - add /verify endpoint using ensureAuth

** lib/middleware/ensureAuth.js
  - npm i cookie-parser
  - import verify from ../util/jwt
  - add ensureAuth.js middleware

** conrollers/users.js
  - add a users conroller
  - add a methon on users model
