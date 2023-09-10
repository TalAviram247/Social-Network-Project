# Read me

## Social Network Name

VirtualHub

## Additional Pages

1. About Us
2. Contact Us

## Additional Features

1. Delete Your Own Post
2. Unlike Post
3. Enhanced User Search (enhanced search functionality, allowing users to search for other members by substrings, not just limited to prefix searches.)

## Challenges Faced

1. It's the first time I'm building such a big project.
2. I had to familiarize myself with new technologies and architectures.
3. I had to work without a partner, which was challenging.

## Server routes

Execute "npm test" in the backend directory to run tests

### Contact Routes:

- POST /contact
- GET /contact

### Post Routes

- GET /posts
- POST /posts
- GET /posts/like/:postId
- DELETE /posts/:postId

### Settings Routes

- GET /settings
- PUT /settings

### User Routes

- GET /users
- GET /users/follow/:username
- POST /users/login
- GET /users/logout
- GET /users/refresh
- POST /users/signup
- DELETE /users/:username
