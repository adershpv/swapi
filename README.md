# Star Wars Character Explorer

A web application that displays details of characters from the Star Wars universe using the [swapi API](https://swapi.py4e.com/) and allows users to manage a favorites list.

## Features

### 1. **Character List View**
- Displays a paginated list of Star Wars characters with their:
  - Name
  - Gender
  - Home Planet
- Includes a search field to query characters by name.
- Clicking on a character navigates to their details page.

### 2. **Character Details View**
- Displays detailed information about the selected character:
  - Name
  - Hair Color
  - Eye Color
  - Gender
  - Home Planet
- Lists:
  - Films the character has appeared in.
  - Starships the character has piloted.
- Provides the ability to add/remove the character from the favorites list.

### 3. **Favorites View**
- Displays a list of all favorite characters with their:
  - Name
  - Height
  - Gender
  - Home Planet
- Allows the removal of characters from the favorites list.

### 4. **Bonus Feature**
- Enables users to amend the height or gender of a character. Changes are stored locally.

## Technologies Used
- **React**: For building the user interface.
- **TypeScript**: For type safety and maintainability.
- **Next.js**: For server-side rendering and routing.
- **Tailwind CSS**: For styling the application.
- **SWAPI API**: For fetching Star Wars character data.
- **LocalStorage**: For managing the favorites list and storing edits.

## How to Run the Project Locally

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/adershpv/swapi.git
   cd swapi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Testing
- **Unit Tests**: Key components and hooks are covered with unit tests.
- **Testing Framework**: Jest and React Testing Library are used.
- To run tests:
  ```bash
  npm run test
  # or
  yarn test
  ```

## Considerations for Scaling
1. **Maintainability**:
   - Components are modular and reusable.
   - TypeScript ensures type safety across the application.

2. **Scalability**:
   - The directory structure is organized for easy addition of new features.
   - Hooks and utilities abstract common logic, reducing duplication.

3. **Collaboration**:
   - Clear separation of concerns makes it easier for multiple teams to work on different features.

## Future Enhancements
- **Backend API**: Implement a custom backend for additional features.
- **Authentication**: Allow users to save their favorites across devices.
- **Theme Support**: Add light and dark mode.

---

Happy exploring the galaxy! 🚀

