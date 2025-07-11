# RideForYou Transportation Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS for managing the RideForYou transportation service.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Authentication**: Secure login with JWT tokens
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live data updates and notifications
- **Form Validation**: Comprehensive form validation with Zod
- **API Integration**: RESTful API integration with error handling
- **Performance**: Code splitting and lazy loading for optimal performance

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Access to the RideForYou API backend

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rideforyou-admin
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:3003/api/admin
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
REACT_APP_ENVIRONMENT=development
```

5. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   ├── forms/          # Form components
│   └── common/         # Shared components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── context/            # React contexts
└── styles/             # Global styles
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking

## 🎨 Styling

This project uses Tailwind CSS for styling with a custom design system:

- **Primary Colors**: Orange theme (`#f37a0b`)
- **Secondary Colors**: Blue theme (`#0ea5e9`)
- **Typography**: Inter font family
- **Components**: Custom component classes in `globals.css`

## 🔐 Authentication

The app uses JWT-based authentication:

1. Login with email and password
2. Token is stored securely in localStorage
3. Automatic token refresh on API calls
4. Protected routes redirect to login if unauthenticated

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible sidebar on mobile
- **Tables**: Responsive table layouts

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

3. Configure environment variables on your hosting platform

## 🔧 Configuration

### Environment Variables

- `REACT_APP_API_URL` - Backend API base URL
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API key for location services
- `REACT_APP_ENVIRONMENT` - Environment (development/production)

### API Integration

The app integrates with the RideForYou backend API:

- **Base URL**: Configured via environment variable
- **Authentication**: Bearer token in Authorization header
- **Error Handling**: Automatic error handling and user notifications

## 📚 Key Dependencies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Headless UI** - Accessible UI components

## 🎯 Features Overview

### Trip Management
- Create, edit, and view trips
- Support for return trips
- Google Maps integration for locations
- Dynamic fare calculation
- Stop management

### Booking Management
- View all bookings
- Filter and search bookings
- Export booking data

### User Management
- Manage customers, drivers, and vendors
- User profile management
- Role-based access control

### Vehicle Management
- Add and manage vehicles
- Track vehicle usage and maintenance

### Reporting & Analytics
- Trip analytics
- Revenue reporting
- User engagement metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by RideForYou Transportation Company.

## 📞 Support

For support and questions, please contact:
- Email: support@rideforyoutransport.com
- Phone: +1 343-598-0092

---

Built with ❤️ by the RideForYou Development Team
