const fetchData = async (cookieJWT) => {
    try {
        const response = await fetch(
            // "http://localhost:3366/api/protected-route", 
            "https://todovisa.onrender.com/api/protected-route",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jwt: cookieJWT })
            }
        );

        if (response.ok) {
            console.log(response)
            return true;
        } else {
            console.log(response)
            return false;
        }
    } catch (err) {
        return false;
    }
};

export default fetchData;