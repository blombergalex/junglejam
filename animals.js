$(() => {
    const ANIMAL_URL = "https://api.api-ninjas.com/v1/animals?name=";
    const API_KEY = "8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k";
    
    const search = () => {
        let userInput = $("#user-search").val();
        getAnimalName(ANIMAL_URL + userInput, API_KEY);
        $(".animals").empty();
        note();
        clearInput();
    };
    
    const note = () => {
        if ($("#user-search").val().length <= 3) {
            $(".note").empty().append(`<p>Don't be boring You're not getting a regular <span class="short-search">${$("#user-search").val()}</span>. Be a bit more specific next time.<br> This is what I got you:</p>`);
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
        let fancyName = data[getRandomElement].taxonomy.scientific_name || "Oh no! The experts didn't come up with a fancy scientific name for this animal";
        let length = data[getRandomElement].characteristics.length || "Info missing, use your imagination"
        let diet = data[getRandomElement].characteristics.main_prey || data[getRandomElement].characteristics.prey || "Unfortunately there's no info on this animals diet";
        let location = data[getRandomElement].locations || "You'll have to use your amazing geography skills for this one";
        let slogan = data[getRandomElement].characteristics.slogan || "Not popular enough to have a catchy slogan";

        displayAnimal(animal);
        displayFancyName(fancyName);
        displayDiet(diet);
        displayLength(length);
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
        setTimeout(() => {
            $(".animals").append(`
            <p>Scientific name: ${data}</p>
            `)
        }, 500);
        };

    const displayDiet = (data) => {
        setTimeout(() => {
            $(".animals").append(`
            <p>Likes to eat: ${data}</p>
            `);
        }, 1000);
    };  
        
    const displayLength = (data) => {
        setTimeout(() => {
            $(".animals").append(`
            <p>Length: ${data}</p>  
            `)
        }, 1500);
    };
    
    const displayLocation = (data) => {
        setTimeout(() => {
            $(".animals").append(`
            <p>Found in: ${data}</p>  
            `)
        }, 2000);
    };

    const displaySlogan = (data) => {
        setTimeout(() => {
            $(".animals").append(`
            <p>Slogan: ${data}</p>  
            `)
        }, 2500);
    };

    const clearInput = () => {
        setTimeout(() => {
        $("#user-search").val("");
        }, 3000);
    }

    $(".search-btn").on("click", () => {
        search();
    });

    $("#user-search").on("keypress", function(event) {
        if (event.which === 13) {
            search();
        };
    });
});