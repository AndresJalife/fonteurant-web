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

    createRestaurant: (ownerId, name, address, cbu, wallet_address, schedule, location_scope, tags, picture) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant`, {
        method: 'POST',
        body: JSON.stringify({
            "owner_id": ownerId,
            "name": name,
            "address": address,
            "cbu": cbu,
            "wallet_address": wallet_address,
            "schedule": schedule,
            "location_scope": location_scope,
            "tags": tags,
            "picture": picture
        }),
        headers: getHeaders()
    }).then(r => r.json()),

    getRestaurant: (id) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${id}`,
        {headers: getHeaders()}).then(r => r.json()),

    getRestaurantReviews: (id) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/review/${id}`,
        {headers: getHeaders()}).then(r => r.json()),

    postDish: (restaurantId, name, price, description, picture, tags) => fetch(`${process.env.REACT_APP_BACKEND_URL}/dish`, {
            method: 'POST',
            body: JSON.stringify({
                restaurant_id: restaurantId,
                name,
                price,
                description,
                picture,
                tags
            }),
            headers: getHeaders()
        }
    ).then(r => r.json()),

    updateRestaurant: (restId, name, address, cbu, wallet_address, schedule, location_scope, tags, picture) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${restId}`, {
        method: 'PUT',
        body: JSON.stringify({
            "name": name,
            "address": address,
            "cbu": cbu,
            "wallet_address": wallet_address,
            "schedule": schedule,
            "location_scope": location_scope,
            "tags": tags,
            "picture": picture
        }),
        headers: getHeaders()
    }).then(r => r.json()),

    putDish: (restaurantId, dishId, name, price, description, picture, tags) => fetch(`${process.env.REACT_APP_BACKEND_URL}/dish/${restaurantId}/${dishId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                price,
                description,
                picture,
                tags
            }),
            headers: getHeaders()
        }
    ).then(r => r.json()),

    deleteDish: (restaurantId, dishId) => fetch(`${process.env.REACT_APP_BACKEND_URL}/dish/${restaurantId}/${dishId}`, {
        method: 'DELETE',
        headers: getHeaders()
    }),

    getDishes: (restaurantId) => fetch(`${process.env.REACT_APP_BACKEND_URL}/dish/${restaurantId}`, {headers: getHeaders()}).then(r => r.json()),

    editUser: (name, location, phone_number, credit_card) => fetch(`${process.env.REACT_APP_BACKEND_URL}/user/update`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                location,
                phone_number,
                credit_card
            }),
            headers: getHeaders()
        }
    ).then(r => r.json()),

    postOrder: (dishes, payment_method, user_id, restaurant_id) => fetch(`${process.env.REACT_APP_BACKEND_URL}/order`, {
            method: 'POST',
            body: JSON.stringify({
                dishes,
                payment_method,
                user_id,
                restaurant_id
            }),
            headers: getHeaders()
        }
    ).then(r => r.json()),

    uploadReview: (rating, comment, restoId) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/review/${restoId}`, {
        method: 'POST',
        body: JSON.stringify({
            score: rating,
            review: comment,
        }),
        headers: getHeaders()
    }),
    getMoneyMetrics: (restoId) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${restoId}/metrics/money`, {headers: getHeaders()}).then(r => r.json()),
    getOrdersMetrics: (restoId) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${restoId}/metrics/orders`, {headers: getHeaders()}).then(r => r.json())

}

export default ApiRoutes;
