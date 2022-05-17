function getHeaders() {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
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

  createRestaurant: (ownerId, name, address, cbu, wallet_address, schedule, location_scope) => fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant`, {
    method: 'POST',
    body: JSON.stringify({
      "owner_id": ownerId,
      "name": name,
      "address": address,
      "cbu": cbu,
      "wallet_address": wallet_address,
      "schedule": schedule,
      "location_scope": location_scope
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(r => r.json()),
}

export default ApiRoutes;
