const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

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

const guestMode = async () => {
    try {
        const response = await fetch(`${BASE_URL}/guest`, {
            method: 'POST',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to enter guest mode');
        }
        return await response.json();
    } catch (error) {
        console.error('Error during guest mode:', error);
        throw error;
    }
};

export const authService = {
    signUp,
    signIn,
    guestMode,
};