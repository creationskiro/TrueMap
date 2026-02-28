# TrueMap

**"Where Google Maps Ends, TrueMap Begins"**

TrueMap is an open-source, AI-powered 3D mapping engine designed to democratize spatial data. Our goal is to map the "99% of unmapped indoor spaces" by providing developers and the community with the tools to generate complex 3D architectures using nothing but a smartphone.

---

## 🚀 Features
- **Procedural 3D City Rendering**: High-performance Three.js engine for rendering complex cities, malls, airports, and road networks.
- **AI-Powered Indoor Scanning (Beta)**: Tools to translate smartphone video data into interactive 3D floorplans.
- **Community Driven**: Anyone can map a space and contribute to the global TrueMap database.
- **Modern Stack**: Built natively on Next.js 15, React Three Fiber, Tailwind V4, and Prisma.
- **Custom High-Security Auth**: Fully independent JWT-based authentication system built from scratch without reliance on third-party SaaS providers like Supabase or Firebase.

## 🛠 Tech Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS v4, Framer Motion
- **3D Engine**: Three.js, React Three Fiber, React Three Drei
- **Backend**: Next.js Server Actions, API Routes
- **Database Architecture**: Prisma ORM (SQLite for Dev, easily migrable to PostgreSQL for Prod)
- **Authentication**: Custom JWT (jose), bcryptjs

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Local Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/TrueMap/truemap.git
   cd truemap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy the example environment file and configure your local secrets.
   ```bash
   cp .env.example .env
   ```

4. Initialize the Database:
   Generate the Prisma client and push the schema to your local SQLite database.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the Development Server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the 3D City Engine in action!

## 🤝 Contributing
We believe the only way to map the entire indoor world is together. We welcome contributions from developers, 3D artists, and spatial enthusiasts. 

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, development process, and how to submit pull requests.

## 🏢 Enterprise Dashboard (TrueMap Cloud)
While the core TrueMap engine and mapping tools are fully open-source, we also provide a premium managed solution for massive venues (Airports, Megamalls, Stadiums) requiring high-volume API access, private deployment, and advanced analytics. For enterprise inquiries, please contact ZTXO ARTLFY PRIVATE LIMITED.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
