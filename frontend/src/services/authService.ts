const BASE_URL = 'http://localhost:5000/api/auth';

const signUp = async (email: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to sign up');
        }
        return await response.json();
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};

const signIn = async (email: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to sign in');
        }
        return await response.json();
    } catch (error) {
        console.error('Error during sign in:', error);
        throw error;
    }
};

export const authService = {
    signUp,
    signIn,
};