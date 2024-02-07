$(() => {
    const ANIMAL_URL = "https://api.api-ninjas.com/v1/animals?name=";
    const API_KEY = "8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k";
    
    const search = () => {
        let userInput = $("#user-search").val();
        getAnimalName(ANIMAL_URL + userInput, API_KEY);
        $(".animals").empty();
        note();
    };
    
    const note = () => {
        if ($("#user-search").val().length <= 3) {
            $(".note").empty().append(`<p>Don't be boring You're not getting a regular ${$("#user-search").val()}. Be a bit more specific next time.<br> This is what I got you:</p>`);
        } else {$(".note").empty()};
    };
    
    const getAnimalName = async (url, apiKey) => {
        try {
            let response = await fetch(url, {headers: {'X-Api-Key': apiKey}
            });
        if (!response.ok) {
            throw new Error("Oh no! Something went wrong. Error code: " + response.status);
        }
        let data = await response.json();
        let numberOfArrayElements = data.length;        
        const randomNumber = () => Math.floor(Math.random() * numberOfArrayElements);
        const getRandomElement = randomNumber();

        let animal = data[getRandomElement].name;
        let length = data[getRandomElement].characteristics.length || "Info missing, use your imagination"
        let diet = data[getRandomElement].characteristics.main_prey || "Unfortunately there's no info on this animals diet";
        let location = data[getRandomElement].locations || "You'll have to use your amazing geography skills for this one";
        let fancyName = data[getRandomElement].taxonomy.scientific_name || "Oh no! The smartfaces didn't come up with a fancy scientific name for this animal";
        let slogan = data[getRandomElement].characteristics.slogan || "Not popular enough to have a catchy slogan";

        displayAnimal(animal);
        displayFancyName(fancyName);
        displayLength(length);
        displayDiet(diet);
        displayLocation(location);
        displaySlogan(slogan);
        } catch (error) {
            $(".note").empty().append(`
            <p>Oi! I don't know anything about this animal. Does "${$("#user-search").val()}" really exist? Or are you messing with me?</p>
            <p class="error-code">I'm getting this problem: <br> <span>${error}.</span></p>
            <p>Hmm... Maybe try a different search? </p>
            `);
        }
    };

    const displayAnimal = (data) => {    
        $(".animals").empty().append(`
            <p class="animal-name">${data}</p>
            `)
        };

    const displayFancyName = (data) => {
        $(".animals").append(`
            <p>Scientific name: ${data}</p>
        `)
    }

    const displayLocation = (data) => {
            $(".animals").append(`
                <p>Found in: ${data}</p>  
                `)
            };

    const displayDiet = (data) => {
        $(".animals").append(`
            <p>Likes to eat: ${data}</p>
        `);
    };

    const displayLength = (data) => {
        $(".animals").append(`
            <p>Length: ${data}</p>  
            `)
        };

    const displaySlogan = (data) => {
        $(".animals").append(`
            <p>Slogan: ${data}</p>  
            `)
        };
    
    $(".search-btn").on("click", search);
    $("#user-search").on("keypress", function(event) {
        if (event.which === 13) {
            search();
        };
    });
});