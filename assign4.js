// $(() => {
//     console.log("ready")

    // const ANIMAL_URL = "https://api.api-ninjas.com/v1/animals?name=8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k"
    
    // $(".search-btn").on("click", () => {
    //     let search = $("#user-search").val();
    // })
    
    
    
    // const getAnimals = async (url) => {
    //     try {
    //         let response = await fetch (url)

    //         if (!response.ok) {
    //             throw new Error("Oh no! Something is missing." + response.status)
    //         }
    //         let data = await response.json()
    //         let animal = data; //enter correct path for data objects
    //         console.log(data);

            
    //     }   catch (error) {
    //         $(".animals").append(`<p>Oops! Something went wrong: ${error}`);
    //     }
    // }

// })

// fetch("https://reqres.in/api/users/") 
// fetch("https://api.api-ninjas.com/v1/animals?name=fox")
//     .then (response => {
//         if (response.ok) {
//             console.log("Fetch successful")
//         } else {
//             console.log("Oops! Something went wrong")
//         }
//     })
//     .then(data => console.log(data))    
//     .catch(error => console.log ("Error"))

var search = 'fox';
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/animals?name=' + search,
    headers: { 'X-Api-Key': '8vIIuF5yMMxMuUSYsTIIrQ==KfWC81Zd84v21P0k'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});