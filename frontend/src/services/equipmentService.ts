// Refactor fetch calls to this file

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

let token: string | null = null;

export const setToken = (newToken: string | null) => {
    token = newToken;
}

const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const getAllEquipment = async () => {
    
    try {
      const response = await fetch(`${BASE_URL}/api/equipment`, {
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }
      const data = await response.json();
        return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred while fetching equipment');
    } 
};

export const getAllLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/locations`, {
        headers: getHeaders(),
      });
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err instanceof Error ? err : new Error('An error occurred while fetching locations');
    }
};

export const getAllTypes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/types`, {
        headers: getHeaders(),
      });
        if (!response.ok) {
            throw new Error('Failed to fetch equipment types');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw err instanceof Error ? err : new Error('An error occurred while fetching equipment types');
    }
};

export const deleteEquipment = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/equipment/${id}`, {
        headers: getHeaders(),
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

export const createEquipment = async (model: string, equipmentType: string, locationId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/equipment`, {
            headers: getHeaders(), 
            method: 'POST',
            body: JSON.stringify({ model, equipment_type: equipmentType, location_id: locationId }),
        });
        if (!response.ok) {
            throw new Error('Failed to add equipment');
        }
        return response.json();
    }   
    catch (err) {
        throw err instanceof Error ? err : new Error('Failed to add equipment');
    }
};

export const updateEquipment = async (id: number, model: string, equipmentType: string, locationId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/api/equipment/${id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({ model, equipment_type: equipmentType, location_id: locationId }),
        });
        if (!response.ok) {
            throw new Error('Failed to update equipment details');
        }
        return response.json();
    }
    catch (err) {
        throw err instanceof Error ? err : new Error('Failed to update equipment details');
    }
};

export const bulkDelete = async (ids: number[]) => {
    try {
      const response = await fetch(`${BASE_URL}/api/equipment/bulk`, {
        headers: getHeaders(),
        body: JSON.stringify({ ids }),
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete selected items');
      }
      return response.json();
    } catch (err) {
        throw err instanceof Error ? err : new Error('Failed to delete selected items');
    }
};

