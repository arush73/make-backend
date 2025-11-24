# Make Backend CLI 🛠️

A powerful Command Line Interface (CLI) tool to instantly scaffold a production-ready Node.js backend application. It sets up a robust Express.js server with MongoDB, Authentication, and best practices out of the box.

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

<div id="-features">

## 🚀 Features

The generated boilerplate comes pre-configured with:

-   **Authentication System**:
    -   Complete User Auth (Register, Login, Logout).
    -   **OAuth Integration**: Google and GitHub strategies via Passport.js.
    -   **JWT Authentication**: Secure stateless auth with Access and Refresh tokens.
    -   **Session Management**: Express Session support.
-   **Security Best Practices**:
    -   **Rate Limiting**: Built-in protection against brute-force attacks.
    -   **CORS**: Configured for cross-origin resource sharing.
    -   **Secure Cookies**: HttpOnly and Secure flags.
-   **Robust Architecture**:
    -   **MVC Pattern**: Organized structure with Controllers, Models, and Routes.
    -   **Error Handling**: Centralized error handling with custom `ApiError` class.
    -   **Response Formatting**: Standardized API responses using `ApiResponse`.
-   **Developer Experience**:
    -   **Logging**: Integrated Winston and Morgan for comprehensive logging.
    -   **Input Validation**: Zod schemas for request validation.
    -   **Environment Config**: Dotenv support for secure configuration.

</div>

<div id="-tech-stack">

## 🛠️ Tech Stack

The scaffolded project uses the following technologies:

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Authentication**: [Passport.js](https://www.passportjs.org/), JWT, Bcrypt
-   **File Storage**: [Cloudinary](https://cloudinary.com/) (Pre-configured)
-   **Email Service**: [Nodemailer](https://nodemailer.com/) with [Mailgen](https://github.com/eladnava/mailgen)
-   **Validation**: [Zod](https://zod.dev/)
-   **Logging**: [Winston](https://github.com/winstonjs/winston), [Morgan](https://github.com/expressjs/morgan)

</div>

<div id="-installation">

## ⚙️ Installation (does now work currently)

You can use the tool directly via `npx` without installing it globally:

```bash
npx make-backend <project-name>
```

Or install it globally (optional):

```bash
npm install -g make-backend
```

</div>

<div id="-usage">

## 💻 Usage

1.  **Create a new project:**
    ```bash
    npx make-backend my-awesome-app
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd my-awesome-app
    ```

3.  **Install dependencies:**
    (The CLI attempts to run this, but if skipped)
    ```bash
    npm install
    ```

4.  **Configure Environment Variables:**
    Rename `.env.sample` to `.env` and update the values.
    ```bash
    cp .env.sample .env
    ```

5.  **Start the Server:**
    ```bash
    npm run dev
    ```

</div>

<div id="-project-structure">

## 📂 Project Structure

The generated project follows a clean and scalable structure:

```
my-app/
├── src/
│   ├── app.js           # Express app setup
│   ├── index.js         # Entry point
│   ├── constants.js     # Global constants
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middlewares (Auth, Multer, etc.)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helpers (ApiError, ApiResponse, AsyncHandler)
│   ├── validators/      # Zod schemas
│   ├── logger/          # Logger configuration
│   └── passport/        # Passport strategies
├── public/              # Static assets
├── .env.sample          # Env template
└── package.json         # Dependencies
```

</div>

<div id="-contributing">

## 🤝 Contributing

Contributions are welcome! If you want to improve the boilerplate or the CLI tool:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

</div>

## 📄 License

This project is licensed under the ISC License.
