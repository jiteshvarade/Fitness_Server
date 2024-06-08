# Fitness Website Project

This project is a fitness website that allows users to create accounts, manage their profiles, make purchases, and interact with trainers. It includes several modules such as authentication, user dashboard, wishlist management, and payment functionality.

## Features

- *Authentication*: Users can sign up, log in, and reset their passwords.
- *User Dashboard*: Users can view and edit their profile information, including food preferences, goals, achievements, mentor details, and streak information.
- *Wishlist Management*: Users can add or remove products from their wishlist.
- *Payment Integration*: Users can make payments for their orders, and receive email notifications with payment details and order information.
- *Trainer Interaction*: Trainers can log in, view user information, and communicate with users.

## Project Structure

The project is organized into several modules, each with its own functionality:

- *Auth Module*: Manages user authentication, including sign up, login, password reset, and token generation.
- *User Dashboard Module*: Handles user profile management, including food preferences, goals, achievements, mentor details, and streak information.
- *Wishlist Module*: Manages user wishlists, allowing users to add or remove products.
- *Payment Module*: Integrates payment functionality, including sending payment details and order information via email.
- *Trainer Module*: Allows trainers to log in, view user information, and communicate with users.

## Technologies Used

- *Node.js*: Backend server environment.
- *Express.js*: Web application framework for Node.js.
- *MongoDB*: NoSQL database for storing user and product information.
- *bcrypt*: Library for password hashing.
- *JWT*: JSON Web Tokens for user authentication.
- *Nodemailer*: Library for sending emails.
- *dotenv*: Module for loading environment variables from a .env file.

## Setup

To run the project locally, follow these steps:

1. Clone the repository:

   bash
   git clone https://github.com/your-username/fitness-website.git
   

2. Install dependencies:

   bash
   cd fitness-website
   npm install
   

3. Set up environment variables:

   Create a .env file in the root directory and add the following variables:

   plaintext
   EMAIL=your-email@gmail.com
   APP_PASSWD=your-email-password
   TOKEN=your-jwt-secret
   

   Replace your-email@gmail.com with your Gmail address, your-email-password with your Gmail password, and your-jwt-secret with a secret key for JWT token generation.

4. Run the server:

   bash
   npm start
   

5. Access the application:

   Open your web browser and navigate to http://localhost:3000 to access the application.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or features you'd like to see in the project.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README further based on additional information or specific project requirements.
