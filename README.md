# GCX Website - Full Stack Project

A modern full-stack web application built with Vue.js 3 (frontend) and Laravel 10 (backend), featuring a blog system with CMS-like functionality.

## 🚀 Tech Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Heroicons** - Beautiful SVG icons

### Backend
- **Laravel 10** - PHP web framework
- **MySQL** - Database (via XAMPP)
- **Eloquent ORM** - Database abstraction layer
- **Laravel Migrations** - Database schema management
- **Laravel Seeders** - Database seeding

## 📁 Project Structure

```
GCX_website/
├── frontend/                 # Vue.js 3 application
│   ├── src/
│   │   ├── components/      # Reusable Vue components
│   │   ├── views/          # Page components
│   │   ├── stores/         # Pinia state management
│   │   ├── router/         # Vue Router configuration
│   │   └── plugins/        # Axios configuration
│   └── package.json
├── backend/                 # Laravel 10 API
│   ├── app/
│   │   ├── Http/Controllers/Api/  # API controllers
│   │   └── Models/         # Eloquent models
│   ├── database/
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/       # Database seeders
│   └── routes/api.php      # API routes
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
