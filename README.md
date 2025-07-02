# 🍃 Aroma Panel

A modern admin panel for cafes and restaurants with gallery, menu, and menu items management capabilities

## 🔑 Login as Guest into the panel

| Email           | Password |
| --------------- | -------- |
| guest@gmail.com | 12345678 |

## 🎯 Project Overview

`Aroma Panel` is a modern and user-friendly admin panel designed for managing cafe and restaurant content. This project uses modern web technologies and connects to `Appwrite` as the backend, providing complete website content management capabilities.

### Core Features:

- 📸 Gallery image management
- 🍽️ Menu and category management
- 🥤 Menu items management
- 📊 View and edit publications
- 🎨 Modern and responsive UI

## ✨ Features

- **Modern Design**: Using `Tailwind CSS` for beautiful and responsive design
- **SPA**: Single Page Application with advanced routing
- **File Management**: Upload and manage images with `Appwrite Storage`
- **Database**: Store data in `Appwrite Database`
- **Authentication**: Secure authentication system
- **AI-Powered Descriptions**: Automatically generate product descriptions using Google Gemini.
- **UI/UX**: Persian interface and user-friendly design
- **Custom Elements**: Using Web Components for reusable functionality

## 🤖 AI Features

### Automatic Description Generation

- Integrated with **Google Gemini API** to provide intelligent content creation.
- A smart `Generate Description` button that creates engaging, SEO-friendly, and character-limited (under 200 characters) descriptions for products with a single click.
- This feature significantly speeds up the content entry process and enhances product presentation on the main website.

## 🛠️ Technologies Used

### Frontend

- **HTML5**: Main page structure
- **CSS3**: Styling with Tailwind CSS
- **JavaScript (ES6+)**: Application logic
- **Vite**: Build and development tool
- **Web Components**: Reusable components

### Backend & Services

- **Appwrite**: Backend-as-a-Service
  - Database: Data storage
  - Storage: File management
  - Account: User authentication

### UI Libraries

- **Tailwind CSS v4**: CSS framework
- **Ionicons**: Beautiful icons
- **Toastify**: Notification display

## 🚀 Installation & Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Appwrite account

### Installation Steps

1. **Clone the project**

```bash
git clone <repository-url>
cd aroma-panel
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the project root:

```env
VITE_APPWRITE_ENDPOINT=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

4. **Run the project**

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

| Variable                    | Description                 | Example                        |
| --------------------------- | --------------------------- | ------------------------------ |
| `VITE_APPWRITE_ENDPOINT`    | Appwrite server address     | `https://cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID`  | Appwrite project ID         | `your-project-id`              |
| `VITE_APPWRITE_DATABASE_ID` | Database ID                 | `your-database-id`             |
| `VITE_APPWRITE_BUCKET_ID`   | Storage bucket ID for files | `your-bucket-id`               |

## 📖 Usage Guide

### 🏠 Home Page

Welcome page that provides quick access to all sections:

- **Add Image**: Manage gallery images
- **Add Menu**: Create menu categories
- **Add Menu Item**: Add products to menu
- **View Publications**: Manage published content

### 📸 Gallery Management

- Upload images in `PNG`, `JPEG`, `JPG` formats
- Select number of columns (3 or 6 columns)
- Store in `Appwrite Storage`

### 🍽️ Menu Management

- Create new menu categories
- Upload image for each category
- Define English name for category

### 🥤 Menu Items Management

- Add new products
- Set price and double price
- Select category
- Upload product image
- Write descriptions

### 📊 View Publications

- View all published content
- Edit menu items
- Delete content
- Filter by content type
- Sort by newest/oldest

## 🗺️ Development Roadmap

### Current Version (v0.0.0)

- ✅ Basic routing system
- ✅ Gallery image management
- ✅ Menu and items management
- ✅ Responsive UI
- ✅ Appwrite integration
- ✅ Authentication system

### Future Versions

#### v1.0.0 - Core Improvements

- [ ] Complete authentication system
- [ ] User and role management
- [ ] API endpoints for frontend
- [ ] Backup and restore system
- [ ] Performance optimization

#### v1.1.0 - Advanced Features

- [ ] Online ordering system
- [ ] Inventory management
- [ ] Reporting and statistics
- [ ] Notification system
- [ ] Multi-language support

#### v1.2.0 - Business Features

- [ ] Payment system
- [ ] Discount management
- [ ] Customer loyalty system
- [ ] Advanced analytics
- [ ] Mobile API

#### v2.0.0 - Enterprise Version

- [ ] Multi-branch support
- [ ] Employee management
- [ ] Financial reports
- [ ] CRM system
- [ ] Mobile application

## 🤝 Contributing

To contribute to this project:

1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m ':white_check_mark: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

### Contribution Guidelines

- Use `Conventional Commits`
- Test your code
- Update documentation
- Use appropriate naming for variables and functions

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

**Developer**: Mahdi Rostami
**Version**: 0.0.0
