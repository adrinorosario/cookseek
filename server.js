import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import process from "process";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = 3000;
const API_KEY = process.env.SPOONACULAR_API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

function convertString(input) {
    return input.split(',').join(',+');
}

app.post("/getrecipes", async (req, res) => {
    try {
        const result = req.body;
        //console.log(result.ingredients);
        const reqIngStr = convertString(result.ingredients)

        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${reqIngStr}&number=5`);
        //console.log(response.data);
        let recipes = [];

        for(var i = 0; i < response.data.length; i++){

            var recipe = {
                id: response.data[i].id,
                name: response.data[i].title,
                image: response.data[i].image,
            }
            var ingredientsArr = [];
            for (var j = 0; j < response.data[i].missedIngredientCount; j++) {
                ingredientsArr.push(response.data[i].missedIngredients[j].original);
            }
            for (var k = 0; k < response.data[i].usedIngredientCount; k++) {
                ingredientsArr.push(response.data[i].usedIngredients[k].original);
            }
            for (var m = 0; m < response.data[i].missedIngredientCount; m++) {
                ingredientsArr.push(response.data[i].missedIngredients[m].original);
            }
            recipe.ingredients = ingredientsArr;
            recipes.push(recipe);
        }
        //console.log(recipes.ingredients);

        res.render("index.ejs", {ingredients: recipes});
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getrecipes", async (req, res) => {
    try {
        const id = req.query.id;
        const dishName = req.query.name;
        //console.log(id);

        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`);

        let cooking_steps = [];
        for (var i = 0; i < response.data[0].steps.length; i++) {
            var stp = response.data[0].steps[i].step;
            cooking_steps.push(stp);
        }
        //console.log(cooking_steps);
        

        res.render("instructions.ejs", {name: dishName, analysedSteps: cooking_steps});

    } catch (err) {
        console.log(err.message);
    }
})

app.get("/similar", async (req, res) => {
    try {
        const id = req.query.id;

        let similarRecipes = [];

        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${API_KEY}`);
        //console.log(response.data);

        for (var i =0; i < response.data.length; i++) {
            var recipe = {
                id: response.data[i].id,
                name: response.data[i].title,
                source: response.data[i].source
            }
            similarRecipes.push(recipe);
        }

        res.render("index.ejs", {recipesSimilar: similarRecipes});

    } catch (err) {
        console.log(err.message);
    }
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});