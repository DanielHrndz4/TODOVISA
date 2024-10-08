import URI from "../admin/uri.api";

const fetchData = async (cookieJWT) => {
    try {
        const response = await fetch(
            `${URI}/protected-route`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jwt: cookieJWT })
            }
        );

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

export default fetchData;