function getHeaders()
{
    return {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
}

const ApiRoutes = {
    register: (email, password, location, phoneNumber) => fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        method: 'POST',
        body: {
            email: email,
            password: password,
            location: location,
            phone_number: phoneNumber
        },
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(r => r.json()),

    signIn: (email, password) => fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
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
        .then(r => r.json())
}

export default ApiRoutes;