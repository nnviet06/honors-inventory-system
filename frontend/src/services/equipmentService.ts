// Refactor fetch calls to this file

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

let token = null;

export const setToken = (newToken: string | null) => {
    token = newToken;
}

// Refactor from EquipTable 
export const getAllEquipment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/equipment`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }
      const data = await response.json();
        return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred while fetching equipment');
    } 
  };

export const deleteEquipment = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/equipment/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete equipment');
      }
      return response.json();
    } catch (err) {
        throw err instanceof Error ? err : new Error('Failed to delete equipment');
    }
  };