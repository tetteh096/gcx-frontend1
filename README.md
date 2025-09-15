# GCX Website - Multi-Component Application

A comprehensive web application suite built with modern technologies, featuring a main website, market data platform, and CMS backend.

## 🚀 Tech Stack

### Frontend (Vue.js)
- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeVue** - UI component library
- **Vue i18n** - Internationalization

### Market Data App (Next.js)
- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Stripe** - Payment processing

### Backend Services
- **Laravel 12** - PHP web framework
- **Go 1.21** - High-performance backend
- **MySQL 8.0** - Primary database
- **Redis** - Caching and sessions

## 📁 Project Structure

```
GCX_website/
├── frontend/                 # Vue.js 3 main website
│   ├── src/
│   │   ├── components/      # Reusable Vue components
│   │   ├── views/          # Page components
│   │   ├── stores/         # Pinia state management
│   │   ├── locales/        # i18n translations
│   │   └── services/       # API services
│   └── package.json
├── gcx_marketdata/          # Next.js market data app
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # React components
│   │   └── services/       # API services
│   └── package.json
├── backend/                 # Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/  # API controllers
│   │   └── Models/         # Eloquent models
│   ├── database/
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/       # Database seeders
│   └── composer.json
├── go-backend/              # Go high-performance backend
│   ├── cmd/                # Command-line tools
│   ├── internal/           # Internal packages
│   ├── routes/             # API routes
│   └── go.mod
├── PRODUCTION_README.md     # Production deployment guide
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

1. **Node.js** (v16 or higher)
2. **XAMPP** (for PHP, MySQL, and Apache)
3. **Git** (for version control)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure your database in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=gcx_website
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. Generate application key:
   ```bash
   C:/xampp/php/php.exe artisan key:generate
   ```

5. Run database migrations:
   ```bash
   C:/xampp/php/php.exe artisan migrate
   ```

6. Seed the database with sample data:
   ```bash
   C:/xampp/php/php.exe artisan db:seed --class=BlogPostSeeder
   ```

7. Start the Laravel development server:
   ```bash
   C:/xampp/php/php.exe artisan serve
   ```

8. The backend API will be available at `http://localhost:8000`

## 📋 Features

### Frontend Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Blog System** - Complete blog with listing, detail views, and search
- **Navigation** - Smooth client-side routing with Vue Router
- **State Management** - Centralized state with Pinia
- **API Integration** - Real-time data from Laravel backend

### Backend Features
- **RESTful API** - Complete CRUD operations for blog posts
- **Database Management** - Migrations and seeders for data management
- **Validation** - Input validation and error handling
- **JSON Responses** - Clean API responses for frontend consumption

## 🔌 API Endpoints

### Blog Posts
- `GET /api/posts` - Get all published blog posts
- `POST /api/posts` - Create a new blog post
- `GET /api/posts/{slug}` - Get a specific blog post by slug
- `PUT /api/posts/{id}` - Update a blog post
- `DELETE /api/posts/{id}` - Delete a blog post

### Sample API Response
```json
{
  "id": 1,
  "title": "Getting Started with Vue.js 3",
  "slug": "getting-started-with-vue-js-3",
  "content": "Vue.js 3 introduces the Composition API...",
  "excerpt": "Learn how to get started with Vue.js 3...",
  "author": "John Doe",
  "featured_image": "https://images.unsplash.com/...",
  "tags": ["Vue.js", "JavaScript", "Frontend"],
  "published_at": "2025-08-06T10:00:00.000000Z"
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Custom blue gradient (`primary-600`, `primary-700`)
- **Secondary**: Gray tones for UI elements
- **Background**: Light gray (`gray-50`) for clean appearance

### Components
- **Buttons**: Primary and secondary button styles
- **Cards**: Consistent card layout for blog posts
- **Navigation**: Responsive navbar with mobile menu
- **Forms**: Styled form elements with validation

## 🚀 Development

### Running Both Servers
1. Start the backend (Laravel):
   ```bash
   cd backend
   C:/xampp/php/php.exe artisan serve
   ```

2. Start the frontend (Vue.js):
   ```bash
   cd frontend
   npm run dev
   ```

### Available URLs
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/api/posts`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check that both servers are running
2. Verify database connection in `.env`
3. Check browser console for API errors
4. Ensure XAMPP MySQL service is running

## 🎯 Next Steps

- [ ] Add authentication system
- [ ] Implement admin panel for blog management
- [ ] Add image upload functionality
- [ ] Implement search and filtering
- [ ] Add comments system
- [ ] Create user profiles
- [ ] Add email notifications
- [ ] Implement caching strategies
