/**
 * Formatea un número como valor monetario en formato colombiano
 * @param value Valor a formatear
 * @returns String formateado (ej: 1.000.000)
 */
export const formatCurrency = (value: number | string): string => {
    if (!value) return '0';
    
    // Convertir a string y eliminar puntos si ya existen
    const cleanValue = value.toString().replace(/\./g, '');
    
    // Convertir a número para formatear
    const numberValue = parseFloat(cleanValue.replace(',', '.'));
    
    // Formatear con separador de miles
    return numberValue.toLocaleString('es-CO', {
      maximumFractionDigits: 0
    });
  };
  
  /**
   * Formatea un valor de tasa (ej: 10.58%)
   * @param value Valor a formatear
   * @returns String formateado con 2 decimales
   */
  export const formatRate = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined) return '';
    
    // Convertir a número
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Formatear con 2 decimales
    return numberValue.toFixed(2);
  };
  
  /**
   * Formatea una fecha ISO a formato legible
   * @param dateString Fecha en formato ISO
   * @returns Fecha formateada (ej: 01/01/2023 14:30)
   */
  export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };