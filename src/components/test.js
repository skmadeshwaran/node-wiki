fetch('http://3.92.205.198:8080/rest/login', {
method: 'POST',
body: JSON.stringify({
    "username": "test-test",
    "password": "test@123"
}),
headers: {
    'Content-type': 'application/json; charset=UTF-8',
},
})
.then((response) => response.json())
.then((data) => {
     console.log(data);
})
.catch((err) => {
     console.log(err.message);
});