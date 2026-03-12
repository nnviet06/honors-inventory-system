// Refactor fetch calls to this file

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

let token = null;

export const setToken = (newToken: string | null) => {
    token = newToken;
}

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

export const getAllLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/locations`);
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
      const response = await fetch(`${BASE_URL}/api/types`);
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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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


