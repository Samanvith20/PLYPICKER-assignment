# Project Name
 Ecommerce project
## Description
This project is a web application built with Next.js, MongoDB, and NextAuth for user authentication. It allows users to submit reviews for products, view their submissions, and for admins to manage those reviews. The application features user roles, including "admin" and "team member," to control access to different functionalities.

## Features
- User authentication with NextAuth
- Role-based access control (admin and team member)
- Create, read, and manage product reviews
- View user submissions
- Admin dashboard for managing pending requests

## Live Demo
You can view the live application at: [Live Demo Link](https://plypicker-assignment-black.vercel.app/)

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (or your chosen hosting provider)

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Clone the Repository
  git clone https://github.com/Samanvith20/PLYPICKER-assignment.git
cd PLYPICKER-assignment

### Environment Variables
Create a `.env.local` file in the root of the project and add the following variables:
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=Your_cloudinary_key


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Open your browser and navigate to `http://localhost:3000`.

## Usage
- **Sign Up / Sign In**: Users can create an account or log in to submit reviews.
- **Submit Reviews**: Users can submit reviews for products.
- **View Submissions**: Users can view their submitted reviews in their profile.
- **Admin Dashboard**: Admins can view and manage pending requests.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
