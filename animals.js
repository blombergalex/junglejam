$(() => {
    console.log("ready");

    const ANIMAL_URL = "https://api.api-ninjas.com/v1/animals?name=";
    const API_KEY = "8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k";
    

    const getRandomNumber = () => {
       return Math.floor(Math.random() * 10); //replace 10 with amount of objects returned
    }
    
    
    $(".search-btn").on("click", () => {
        let search = $("#user-search").val();
        getAnimalName(ANIMAL_URL + search, API_KEY);
        $(".animals").empty();
        note();
    });
    
    const note = () => {
        if ($("#user-search").val().length <= 3) {
            $(".note").empty().append(`<p>Don't be boring You're not getting a regular ${$("#user-search").val()}, whatever that is. Be a bit more specific next time.<br> This is what I got for you:</p>`);
        } else {$(".note").empty()};
    };
    
    const getAnimalName = async (url, apiKey) => {
        const randomNumber = getRandomNumber();
        console.log("Number: " + randomNumber);
        
        try {
            let response = await fetch(url, {headers: {'X-Api-Key': apiKey,}
        });
        
        if (!response.ok) {
            throw new Error("Oh no! Something went wrong. Error code: " + response.status);
        }
        
            let data = await response.json();
            let animal = data[randomNumber].name;
            let length = data[randomNumber].characteristics.length || "Info missing, use your imagination"
            let diet = data[randomNumber].characteristics.main_prey || "Unfortunately there's no info on this animals diet";
            let location = data[randomNumber].locations || "You'll have to use your amazing geography skills for this one";
            let fancyName = data[randomNumber].taxonomy.scientific_name || "Oh no! The smartfaces didn't come up with a fancy scientific name for this animal";
            let slogan = data[randomNumber].characteristics.slogan || "Not popular enough to have a catchy slogan";

            console.log(data);
            
            displayAnimal(animal);
            displayFancyName(fancyName);
            displayLength(length);
            displayDiet(diet);
            displayLocation(location);
            displaySlogan(slogan);
        } catch (error) {
            $(".note").empty().append(`<p>Oi! I don't know anything about this animal. Does "${$("#user-search").val()}" really exist? Or are you messing with mee? <br><br> I'm getting this problem: ${error}. <br><br> Hmm... Maybe try a different search? </p>`);
        }
    };

    const displayAnimal = (data) => {
        console.log("Animal data: ", data); //remove later
    
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

    
});