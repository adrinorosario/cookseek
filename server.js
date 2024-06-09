import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

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

        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=4c22b12ee0694a33b892498adb9db578&ingredients=${reqIngStr}&number=5`);
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
            recipe["ingredients"] = ingredientsArr;
            recipes.push(recipe);
        }
        //console.log(recipes);

        res.render("index.ejs", {ingredients: recipes});
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});