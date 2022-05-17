function getHeaders() {
    return {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': "*"
    }
}

const ApiRoutes = {
    register: (email, password, location, phoneNumber) => fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            location: location,
            phone_number: phoneNumber
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(r => r.json()),

    signIn: (email, password) => fetch(`${process.env.REACT_APP_BACKEND_URL}/user/sign_in`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(r => r.json()),

    profile: () => fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {headers: getHeaders()})
        .then(r => r.json()),

    getRestaurants: () => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant`, {headers: getHeaders()})
        .then(r => r.json()),

    getRestaurant: (id) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${id}`,
        {headers: getHeaders()}).then(r => r.json()),

    postDish: (restaurantId, name, price, description) => fetch(`${process.env.REACT_APP_BACKEND_URL}/dish`, {
            method: 'POST',
            body: JSON.stringify({
                restaurant_id: restaurantId,
                name,
                price,
                description
            }),
            headers: getHeaders()
        }
    ).then(r => r.json()),
}

export default ApiRoutes;
