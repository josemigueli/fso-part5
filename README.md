# Blog List App

This project is a web application developed as part of the **Full Stack Open** course from the University of Helsinki. It is a React-based frontend application that allows users to manage a list of blogs. The application includes features such as user authentication, creating new blogs, liking blogs, and deleting blogs. Additionally, the project includes end-to-end (E2E) tests written with Cypress to ensure the functionality of the application.

## Features

- **User Authentication**: Users can log in and log out. The application uses token-based authentication to manage user sessions.
- **Blog Management**:
  - Users can create new blogs by providing a title, author, and URL.
  - Users can like blogs, and the number of likes is updated in real-time.
  - Users can delete blogs they have created.
- **Notification System**: The application displays success and error messages to inform users of the outcome of their actions.
- **Sorting by Likes**: Blogs are automatically sorted by the number of likes in descending order.

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Testing**: Cypress (for E2E tests), Vitest (for unit tests)
- **Styling**: Basic CSS for notifications and blog containers
- **State Management**: React's built-in state management (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

**IMPORTANT:** For this part to work you need to have the backend developed in part 4 of this course running. You can see the installation details [here.](https://github.com/josemigueli/fso-part4)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/josemigueli/fso-part5.git
   ```

2. Navigate to the project directory:
   ```bash
   cd fso-part5
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- To start the development server:

  ```bash
  npm run dev
  ```

  The application will be available at `http://localhost:5173`.

- To build the application for production:

  ```bash
  npm run build
  ```

- To preview the production build:
  ```bash
  npm run preview
  ```

### Running Tests

- To run unit tests:

  ```bash
  npm run test
  ```

- To run Cypress E2E tests:
  ```bash
  cd blogs-e2e-tests-cypress
  npm install
  npm run cypress:open
  ```
  This will open the Cypress test runner.

## Testing

The project includes both unit tests and end-to-end tests:

- **Unit Tests**: Written using Vitest and React Testing Library. These tests cover individual components and their functionality.
- **E2E Tests**: Written using Cypress. These tests simulate user interactions with the application and verify that the application behaves as expected.

### Example E2E Test Scenarios

1. **Login**: Tests that a user can log in with correct credentials and that login fails with incorrect credentials.
2. **Blog Creation**: Tests that a user can create a new blog and that the blog is displayed in the list.
3. **Liking a Blog**: Tests that a user can like a blog and that the like count is updated.
4. **Deleting a Blog**: Tests that a user can delete a blog they created and that the blog is removed from the list.
5. **Sorting by Likes**: Tests that blogs are sorted by the number of likes in descending order.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **Vite**: A fast build tool for modern web applications.
- **Cypress**: A JavaScript-based end-to-end testing framework.
- **Vitest**: A Vite-native unit testing framework.

## License

This project is licensed under the MIT License.

---

This project was developed as part of the Full Stack Open course by the University of Helsinki. For more information about the course, visit [Full Stack Open](https://fullstackopen.com/en/).
