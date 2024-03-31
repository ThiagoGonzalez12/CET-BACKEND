## Servicio Técnico - API

| Method | Endpoints            | Explanation                    |
| :----- | :------------------- | :----------------------------- |
| POST   | /api/auth/login      | User login                     |
| GET    | /api/auth/user       | Verify user is authenticated   |
| GET    | /api/auth/admin      | Verify user is admin           |
| GET    | /api/users           | Get all users (only admin)     |
| GET    | /api/users/:id       | Get user by id (only admin)    |
| POST   | /api/users           | Create user (only admin)       |
| PUT    | /api/users/:id       | Update user (only admin)       |
| DELETE | /api/users/:id       | Delete user by id (only admin) |
| GET    | /api/clients         | Get all clients                |
| GET    | /api/clients/:id     | Get client by id               |
| POST   | /api/clients         | Create client                  |
| PUT    | /api/clients/:id     | Update client                  |
| DELETE | /api/clients/:id     | Delete client                  |
| GET    | /api/gallery/:userId | Get client pdfs                |
| GET    | /api/gallery/pdf/:id | Get pdf by id                  |
| POST   | /api/gallery         | Create pdf                     |
| PUT    | /api/gallery/:id     | Update pdf                     |
| DELETE | /api/gallery/:id     | Delete pfd                     |
