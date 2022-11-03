//API URLs
const user_url = "https://jsonplaceholder.typicode.com/users";

const posts_url = "https://jsonplaceholder.typicode.com/posts";

// the dom variables
const tableBody = document.getElementById('body');
const tableHead = document.getElementById('head');
const table = document.getElementById('users_table');
const tableContainer = document.getElementById('table-container');
const showUsers = document.getElementById('users-btn');

//posts and users arrays
let usersarr = [];
let postsarr = [];

// the index of the row that is clicked
let index;


// getting user information
fetch(user_url).then(
    response => response.json()
).then(
    users => { 
        for (let i = 0; i < users.length; i++) {
            usersarr[i] = users[i];            
        }
        //log to check for errors
        //console.log(usersarr)
    }    
).then( ()=>{
    //displays each user in the table
    for (let i in usersarr) {
        let row =  `<tr onClick="getIndex(this)">
                    <td> ${usersarr[i].id} </td>
                    <td> ${usersarr[i].name}</td>
                    <td> ${usersarr[i].username}</td>
                </tr>`
        tableBody.innerHTML +=row;
    }
});    


// gets the index of the row that is clicked
function getIndex(x) {
    // getting the index of the row that is clicked
    index = x.rowIndex
    //test log
    //console.log(index);  
    //removing the data that is on the screen 
    table.remove();
    // callign the api and converting the response to 
    // json
    fetch(posts_url).then(
        response => response.json()
    ).then(
        posts => {
            for (let i = 0; i < posts.length; i++) {
                // adding the posts to the posts array
                postsarr[i] = posts[i];
                
            }
            //console.log(postsarr)
            // creates a new table header on the page
            let header = 
        `<table class="table table-striped" id="users_table">
        <head id="'head">
           <!-- <th>id</th>-->
            <th>Title</th>
            <th>Post</th>
        <head>
        </table>`
        //adding that data to the page
       tableContainer.innerHTML = header
        }
        
    ).then(
        () => {
            for (let i = 0; i < postsarr.length; i++) {
                // if the post's user has an ID equal to the index 
                // the post will be displayed
                if (postsarr[i].userId == index) {
                
                    let row = 
                    `<tr>
                        <!--<td>${postsarr[i].userId}</td>-->
                        <td>${postsarr[i].title}</td>
                        <td>${postsarr[i].body}</td>
                    <tr>`
                    //console.log(row)
                    // append the row to the table
                    document.getElementById('users_table').innerHTML += row;
                }
                
            } 
            
        }
    )
}


//reload the page form the beginning

showUsers.addEventListener('click', function () {
    location.reload();
})