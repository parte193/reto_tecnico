const Sale = require('../models/Sale');

// Crear una venta
exports.createSale = async (req, res) => {
  try {
    const { 
      id_producto_tipo, 
      cupo_solicitado, 
      id_franquicia, 
      tasa 
    } = req.body;
    
    // Validar campos según el tipo de producto
    if (id_producto_tipo == 3 && !id_franquicia) {
      return res.status(400).json({ message: 'La franquicia es requerida para Tarjeta de Crédito' });
    }
    
    if ((id_producto_tipo == 1 || id_producto_tipo == 2) && !tasa) {
      return res.status(400).json({ message: 'La tasa es requerida para este tipo de producto' });
    }
    
    const saleId = await Sale.create({
      id_producto_tipo,
      cupo_solicitado,
      id_franquicia: id_producto_tipo == 3 ? id_franquicia : null,
      tasa: id_producto_tipo != 3 ? tasa : null,
      id_usuario_creacion: req.user.id
    });
    
    res.status(201).json({ 
      message: 'Venta creada exitosamente',
      saleId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todas las ventas
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.getAll();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener una venta por ID
exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id);
    
    if (!sale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    
    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar una venta
exports.updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      id_producto_tipo, 
      cupo_solicitado, 
      id_franquicia, 
      tasa 
    } = req.body;
    
    // Validar campos según el tipo de producto
    if (id_producto_tipo == 3 && !id_franquicia) {
      return res.status(400).json({ message: 'La franquicia es requerida para Tarjeta de Crédito' });
    }
    
    if ((id_producto_tipo == 1 || id_producto_tipo == 2) && !tasa) {
      return res.status(400).json({ message: 'La tasa es requerida para este tipo de producto' });
    }
    
    const updated = await Sale.update(
      id,
      {
        id_producto_tipo,
        cupo_solicitado,
        id_franquicia: id_producto_tipo == 3 ? id_franquicia : null,
        tasa: id_producto_tipo != 3 ? tasa : null
      },
      req.user.id
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    
    res.json({ message: 'Venta actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar una venta
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await Sale.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    
    res.json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener tipos de productos
exports.getProductTypes = async (req, res) => {
  try {
    const types = await Sale.getProductTypes();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener franquicias
exports.getFranchises = async (req, res) => {
  try {
    const franchises = await Sale.getFranchises();
    res.json(franchises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};