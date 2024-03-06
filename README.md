## 1337 Typing - Revamped with NestJS, Socket.io, and Next.js 14

This repository houses the code for a revamped version of the **1337 Typing** application, a web-based typing game that challenges players to achieve the highest word count within a minute. 

### Technologies

* **Backend:** NestJS
* **Frontend:** Next.js 14
* **Styling:** Tailwind CSS
* **Database:** PostgreSQL (managed with Prisma)
* **Real-time communication:** Socket.io 

### Running the application

This project utilizes Docker for containerized deployment. Prerequisites include:

* Docker installed: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

**1. Clone the repository:**

```
git clone https://github.com/Proxy-o/1337type.git
```

**2. Build and run the application:**

```
cd 1337type
docker-compose up -d
```

This command builds the Docker images for frontend and backend services, creates and starts the containers, and detaches from the process, allowing the application to run in the background.

**3. Access the application:**

Once the containers are running, access the application at:

```
http://localhost:3000
```

### Development

**1. Setting up development environment:**

```
docker-compose up -d
```

This starts the containers in detached mode for development.

**2. Running the frontend development server:**

```
cd frontend
npm run dev
```

This starts the Next.js development server, allowing hot reloading of code changes.

**3. Running the backend development server:**

```
cd backend
npm run dev
```

This starts the NestJS development server.

### Docker Compose

The `docker-compose.yml` file defines the service configuration for both frontend and backend. You can customize the configuration based on your needs.

### Code Structure

* `backend`: NestJS server code
* `frontend`: Next.js application code
* `prisma`: Prisma schema and configuration files
* `docker-compose.yml`: Docker Compose configuration file

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.

### Contributing

Pull requests and feedback are welcome! Please refer to the contributing guidelines outlined in the `CONTRIBUTING.md` file before contributing.
