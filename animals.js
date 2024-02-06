$(() => {
    console.log("ready");

    const ANIMAL_URL = "https://api.api-ninjas.com/v1/animals?name=";
    const API_KEY = "8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k";

    $(".search-btn").on("click", () => {
        let search = $("#user-search").val();
        getAnimals(ANIMAL_URL + search, API_KEY);
    });

    const getAnimals = async (url, apiKey) => {
        try {
            let response = await fetch(url, {headers: {'X-Api-Key': apiKey,}
            });

            if (!response.ok) {
                throw new Error("Oh no! Something went wrong. " + response.status);
            }

            let data = await response.json();
            let animal = data[0].name;
            
            displayAnimal(animal);
        } catch (error) {
            $(".animals").append(`<p>Oops! Something went wrong: ${error}`);
        }
    };

    const displayAnimal = (data) => {
        console.log("Animal data: ", data); 
        $(".animals").append(`
            <p class="animal-name">${data}</p>
        `)
    };
    
});