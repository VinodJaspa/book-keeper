# Eminence Technology Test Vinod Jaspa Platform

A front-end React-based platform where users can create, edit, and collaborate on books.

## Core Features

- **Unlimited Sections and Subsections:** Users can organize content into structured sections and subsections.
- **User Authentication:** Secure login and authentication system to protect user data.
- **Permission and Roles:** Manage user permissions and roles to control access and actions within the platform.

## Tools and Libraries

- **Frontend:** Developed with React JS, leveraging its latest features and capabilities (React v18).
- **State Management and APIs:** Utilizing Redux Toolkit for efficient state management and integrating with APIs.
- **Styling:** Enhanced UI/UX using a combination of Shadcn and Tailwind CSS for responsive and sleek designs.
- **Authentication and Authorization:** Implementing JSON Server Auth for straightforward authentication and authorization workflows.

## How to Use

To use this project:

1. **Clone the repository:**
git clone <repository-url>


2. **Run the client:**
cd cloud-book-writer-platform/client
npm install
npm run dev

## Implementation Strategy

- **Component Reusability:** Implementing reusable components throughout the application to maintain consistency and improve maintainability.
- **User Authentication Requirement:** Users are required to login before performing actions such as creating a book, adding sections, or deleting sections to ensure security and data integrity.
- **Backend Setup:** Using a simple backend setup with JSON Server to manage user and book records. Initial setup includes an empty array for users and books.
- **Frontend Technology:** Leveraging React v18 for its enhanced capabilities and performance optimizations.
- **Authentication and Caching:** Employing JWT decode for secure authentication and Redux Toolkit for state management and caching mechanisms to optimize performance and response times.


3. **Run the server:**
cd cloud-book-writer-platform/server
npm install
npm run start