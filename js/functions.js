'use strict';
'use strict';

const fetchProducts = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        return {
            success: true,
            body: data
        };
    } catch (error) {
        return {
            success: false,
            body: error.message
        };
    }
};

const fetchCategories = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const data = parser.parseFromString(text, "application/xml");

        return {
            success: true,
            body: data
        };
    } catch (error) {
        return {
            success: false,
            body: error.message
        };
    }
};

export { fetchProducts, fetchCategories };