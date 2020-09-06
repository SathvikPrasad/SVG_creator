

const create_user = (name, email, password, roles, contact, is_active) => {
    axios
        .post("https://13.233.134.135/api/v1/user/manage", {
            "roles": roles,
            "name": name,
            "email": email,
            "password": password,
            "contact": contact,
            "is_active": true

        })
        .then((res) => {
            console.log(res);

        })
        .catch((err) => {
            console.log(err);
            alert(err)

        });

}
// create_user("sathvik", "sathvik@gmail.com", "sathvik", ['creator'], "9502502631", true)




// const asset_GET_SESSION_ID = () => {
//     axios
//         .post("https://13.233.134.135/api/v1/user/auth", {
//             "email": "sathvikprasad97@gmail.com",
//             "password": "sathvik",
//         })
//         .then((res) => {
//             // console.log(res.data.token);
//             sessionStorage.setItem('session', res.data.token)
//             assets_GET()

//         })
//         .catch((err) => {
//             console.log(err);
//         });

// }



const asset_POST = (asset) => {
    console.log(asset);
    axios.post("https://15.206.173.187/api/v1/asset", asset)
        .then((res) => {
            console.log(res);

        })
        .catch((err) => {
            console.log(err.message);
            alert(err)

        });

}



const assets_GET = () => {
    axios
        .get("https://15.206.173.187/api/v1/asset", {
            params: {
                "session": sessionStorage.getItem("session"),
            },

        })
        .then((res) => {
            console.log(res);
            assets_data(res.data.assets)


        })
        .catch((err) => {
            console.log(err);
            alert(err)

        });
}




const asset_DELETE = (id) => {
    axios
        .delete(`https://15.206.173.187/api/v1/asset/${id}`, {
            data: { session: sessionStorage.getItem("session") }
        })
        .then((res) => {
            console.log(res);
            assets_data(res.data.assets)


        })
        .catch((err) => {
            console.log(err);
            // alert(err)
        });
}



if (sessionStorage.getItem('session')) {
    $('#loggedIn_name').text(sessionStorage.getItem('name'))
    assets_GET()

}
else {
    location.replace('/login')

}


$('#logout').on('click', () => {
    sessionStorage.clear()
    location.replace('/login')

})




