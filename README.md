<div align="center">
  <a href="https://github.com/jordanopensource/community-web">
    <img src=".github/images/logo.svg" alt="JOSA Community" width="100" height="100">
  </a>

  <h1>Community Web</h1>
  <p><strong>The community hub for Jordan Open Source Association</strong></p>

  <p>
    <a href="https://builds.josa.dev/jordanopensource/community-web">
      <img src="https://builds.josa.dev/api/badges/jordanopensource/community-web/status.svg" alt="Build Status">
    </a>
    <img src="https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt 4">
    <img src="https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" alt="License">
  </p>

  <p>
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-features">Features</a> •
    <a href="#-development">Development</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 📖 About

Community Web is the frontend application for the [JOSA Community Portal](https://github.com/jordanopensource) — a platform that connects open source enthusiasts, tracks contributions, and fosters collaboration within the Jordanian tech community.

### Built With

| Technology | Purpose |
|------------|---------|
| [Nuxt 4](https://nuxt.com/) | Vue.js Framework |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [nuxt-auth](https://sidebase.io/nuxt-auth/) | Authentication |
| [nuxt-api-party](https://nuxt-api-party.byjohann.dev/) | API Integration |

---

## ⚡ Quick Start

### Using Docker Compose (Recommended)

The fastest way to get up and running. Make sure you have [Docker](https://docs.docker.com/get-docker/) installed.

**1. Start the API first** (required dependency):

```sh
cd community-api
cp .env.example .env  # Configure your environment variables
docker compose up -d
```

**2. Start the web frontend**:

```sh
cd community-web
cp .env.example .env  # Configure your environment variables
docker compose up
```

**3. Open your browser** at [http://localhost:3000](http://localhost:3000)

> **Note:** The web service depends on `community-api_default` network. Ensure the API is running before starting the web container.

---

## 🛠 Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (LTS recommended)
- [npm](https://www.npmjs.com/) v9+

### Local Setup

```sh
# Clone the repository
git clone https://github.com/jordanopensource/community-web.git
cd community-web

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm run start` | Launch production server |

### Production Build

```sh
# Build the application
npm run build

# Start the production server
npm run start
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more deployment options.

---

## 🏗 Project Structure

```
community-web/
├── app/
│   ├── components/    # Vue components
│   ├── composables/   # Composable functions
│   ├── middleware/    # Route middleware
│   ├── pages/         # File-based routing
│   └── assets/        # Styles and fonts
├── public/            # Static assets
├── server/
│   ├── api/           # Server API routes
│   └── utils/         # Server utilities
└── nuxt.config.ts     # Nuxt configuration
```

---

## 🗺 Roadmap

See the [open issues](https://github.com/jordanopensource/community-web/issues) for proposed features and known issues.

---

## 🤝 Contributing

Contributions make the open source community amazing! We welcome all contributions.

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for more details.

---

## 📄 License

Distributed under the **Apache License 2.0**. See [LICENSE](LICENSE) for details.

---

## 📬 Contact

**Jordan Open Source Association**

- Twitter: [@jo_osa](https://twitter.com/jo_osa)
- GitHub: [jordanopensource](https://github.com/jordanopensource)
- Project: [community-web](https://github.com/jordanopensource/community-web)

---

<div align="center">
  <sub>Built with ❤️ by the JOSA community</sub>
</div>
