$(() => {
    console.log("ready");

    const ANIMAL_URL = "https://api.api-ninjas.com/v1/animals?name=";
    const API_KEY = "8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k";
    
    
    $(".search-btn").on("click", () => {
        let search = $("#user-search").val();
        getAnimals(ANIMAL_URL + search, API_KEY);
        note();
    });
    
    const note = () => {
        
        if ($("#user-search").val().length <= 3) {
            console.log("unspecific search")
            $(".note").empty().append(`<p>Don't be boring You're not getting a regular ${$("#user-search").val()}, whatever that is. Be a bit more specific next time ;) This is what I got for you:</p>`);
        } else {$(".note").empty()};
    };

    const getAnimals = async (url, apiKey) => {
        try {
            let response = await fetch(url, {headers: {'X-Api-Key': apiKey,}
            });

            if (!response.ok) {
                throw new Error("Oh no! Something went wrong. Error code: " + response.status);
            }

            let data = await response.json();
            let animal = data[0].name;
            // let characteristics = moreData[0].characteristics;
            console.log(data);
            
            displayAnimal(animal);
        } catch (error) {
            $(".note").empty().append(`<p>Oi! I don't know anything about this animal. Does ${$("#user-search").val()} really exist? Or are you messing with mee?</p>`);
        }
    };

    const displayAnimal = (data) => {
        console.log("Animal data: ", data); 
        $(".animals").empty().append(`
            <p class="animal-name">${data}</p>
            <p>Found in: </p>
            `)
        };
        // <p>Characteristics: ${data}</p> //
        
        // <p>Eats: ${characteristics.prey} //
    // const 
    
});