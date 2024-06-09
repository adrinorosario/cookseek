# Fridge Recipe Finder

Fridge Recipe Finder is a web application that helps you find recipes based on the ingredients you have in your fridge. Simply enter the ingredients, and the app will provide you with a list of recipes you can make. Additionally, you can find similar recipes and detailed cooking instructions.

## Features

- **Ingredient-Based Recipe Search**: Enter the ingredients you have, and get recipes that you can make with them.
- **Similar Recipes**: Find recipes similar to the ones you like.
- **Cooking Instructions**: Get step-by-step cooking instructions for your chosen recipe.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap, EJS (Embedded JavaScript templates)
- **Backend**: Node.js, Express.js
- **API**: Spoonacular API
- **Environment Variables**: dotenv

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Spoonacular API Key

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/fridge-recipe-finder.git
    cd fridge-recipe-finder
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Spoonacular API key:
    ```
    SPOONACULAR_API_KEY=your_api_key_here
    ```

4. Start the application:
    ```sh
    npm start
    ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

1. **Home Page**: Enter the ingredients you have in the textarea provided and submit the form to get recipes.
2. **Recipe List**: Click on a recipe to get the detailed cooking instructions or find similar recipes.
3. **Instructions Page**: Follow the step-by-step instructions to cook your chosen recipe.
4. **Similar Recipes**: Click on "Get similar recipes" to find recipes similar to the one you're viewing.

## Folder Structure

```
fridge-recipe-finder/
├── public/
│   └── css/
│       └── styles.css
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   ├── index.ejs
│   ├── instructions.ejs
│   ├── about.ejs
├── .env
├── package.json
├── server.js
└── README.md
```

## API Endpoints

- `GET /` - Home page.
- `POST /getrecipes` - Fetches recipes based on ingredients.
- `GET /getrecipes` - Fetches cooking instructions for a specific recipe.
- `GET /similar` - Fetches similar recipes based on recipe ID.
- `GET /about` - About page.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue or contact the project maintainers.

---

Happy cooking! 🍳

