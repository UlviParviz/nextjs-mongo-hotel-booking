
# Bookly - Hotel Booking Platform

**Bookly** is a modern hotel booking platform built with **Next.js** and **TypeScript**, integrated with **Stripe** for payments and **MongoDB** for data management. This platform allows users to search for hotels, make reservations, leave reviews, and manage their bookings, while providing administrators with comprehensive control over the platform's operations.

## Features

### User Functionality
- **Hotel Booking**: Search for hotels, view room details, and make reservations.
- **Review and Rating**: Add reviews and rate hotels after booking.
- **Booking Management**: View and manage your bookings.
- **Invoice Management**: Download booking invoices in PDF format.
- **Profile Management**: Update personal information, change password, and upload avatar.
- **Password Recovery**: If a user forgets their password, an email with a password reset link is sent to their Gmail account using Nodemailer.

### Admin Functionality
- **User Management**: View and manage all users.
- **Room Management**: Create, update, and delete rooms.
- **Booking Management**: Oversee all bookings and their statuses.
- **Review Management**: Moderate and manage reviews.
- **Role Management**: Change user roles and permissions.

### Technology Stack
- **Next.js**: Framework for server-side rendering and building the React application.
- **TypeScript**: Adds type safety and improves development experience.
- **Stripe**: Handles secure payment processing.
- **MongoDB**: NoSQL database for storing users, hotels, bookings, and reviews.
- **Bootstrap**: Provides responsive design and styling.
- **NextAuth**: Authentication solution for user login and session management.
- **Node-Geocoder**: Geocoding services for location-based features.
- **Nodemailer**: Used for sending password reset emails.

## Configuration

After cloning the repository, you need to configure your environment variables. Edit the `next.config.mjs` file to include your specific settings for API URLs, database connections, Stripe keys, email settings, and other configurations.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- MongoDB instance set up.
- Stripe account for payment processing.
- Nodemailer configuration for email services.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UlviParviz/nextjs-mongo-hotel-booking.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd nextjs-mongo-hotel-booking
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:3000` in your browser to see the application.

## Usage

### For Users
- **Browse Hotels**: Use the search functionality to find hotels by location, date, and room type.
- **Make a Reservation**: Select a hotel, choose a room, and complete the booking process.
- **Review and Rate**: After booking, leave a review and rate the hotel.
- **Manage Bookings**: View, edit, or cancel your bookings from your profile.
- **Download Invoices**: Access and download invoices for your bookings in PDF format.
- **Update Profile**: Modify your personal details, change your password, and upload a new avatar.
- **Password Recovery**: Request a password reset email if you forget your password.

### For Admins
- **User Management**: View, edit, or delete user accounts.
- **Room Management**: Add, update, or remove rooms from the platform.
- **Booking Oversight**: Manage all bookings and review their statuses.
- **Review Moderation**: Approve or remove reviews.
- **Role Management**: Change user roles and permissions as needed.

