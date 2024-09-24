# OlderWiser Platform

OlderWiser is a digital platform designed to help everyone grow, with a focus on family-oriented activities and personal development.

## Tech Stack

- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component
- **State Management**: React Hooks (useState)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later) or yarn (v1.22.0 or later)

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/olderwiser-platform.git
   cd olderwiser-platform
   ```

2. Install the dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
olderwiser-platform/
├── components/
│   ├── ActivityButton.tsx
│   ├── ActivityCard.tsx
│   ├── ActivityGrid.tsx
│   ├── Hero.tsx
│   └── MembershipCard.tsx
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── styles/
│   └── globals.css
├── public/
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev`: Runs the app in development mode.
- `npm run build` or `yarn build`: Builds the app for production.
- `npm start` or `yarn start`: Runs the built app in production mode.
- `npm run lint` or `yarn lint`: Runs the linter to check for code quality issues.

## Deployment

This project can be easily deployed on platforms like Vercel or Netlify, which offer seamless integration with Next.js projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).