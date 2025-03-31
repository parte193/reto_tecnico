import { Sale, SaleFormData, ProductType, Franchise } from '../types';
import { API_URL } from '../config.ts';

const TOKEN_KEY = 'token';

// Función auxiliar para obtener el token
const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Obtener todas las ventas
export const getSales = async (): Promise<Sale[]> => {
  try {
    const response = await fetch(`${API_URL}/api/sales`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las ventas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getSales:', error);
    return [];
  }
};

// Crear una nueva venta
export const createSale = async (saleData: SaleFormData): Promise<Sale> => {
  try {
    // Convertir valores string a número
    const payload = {
      id_producto_tipo: parseInt(saleData.id_producto_tipo),
      cupo_solicitado: parseFloat(saleData.cupo_solicitado.replace(/\./g, '').replace(',', '.')),
      id_franquicia: saleData.id_franquicia ? parseInt(saleData.id_franquicia) : null,
      tasa: saleData.tasa ? parseFloat(saleData.tasa) : null,
    };

    const response = await fetch(`${API_URL}/api/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la venta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createSale:', error);
    throw error;
  }
};

// Obtener una venta por su ID
export const getSaleById = async (id: number): Promise<Sale> => {
  try {
    const response = await fetch(`${API_URL}/api/sales/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la venta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getSaleById:', error);
    throw error;
  }
};

// Actualizar una venta existente
export const updateSale = async (id: number, saleData: SaleFormData): Promise<void> => {
  try {
    // Convertir valores string a número
    const payload = {
      id_producto_tipo: parseInt(saleData.id_producto_tipo),
      cupo_solicitado: parseFloat(saleData.cupo_solicitado.replace(/\./g, '').replace(',', '.')),
      id_franquicia: saleData.id_franquicia ? parseInt(saleData.id_franquicia) : null,
      tasa: saleData.tasa ? parseFloat(saleData.tasa) : null,
    };

    const response = await fetch(`${API_URL}/api/sales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar la venta');
    }
  } catch (error) {
    console.error('Error en updateSale:', error);
    throw error;
  }
};

// Eliminar una venta
export const deleteSale = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/sales/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la venta');
    }
  } catch (error) {
    console.error('Error en deleteSale:', error);
    throw error;
  }
};

// Obtener tipos de productos
export const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${API_URL}/api/sales/options/products`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los tipos de productos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getProductTypes:', error);
    return [];
  }
};

// Obtener franquicias
export const getFranchises = async (): Promise<Franchise[]> => {
  try {
    const response = await fetch(`${API_URL}/api/sales/options/franchises`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken() || '',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las franquicias');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getFranchises:', error);
    return [];
  }
};
