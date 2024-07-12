import Reserva from "../models/reserva.js";

const httpReserva = {
  //Get all reservas
  getTodo: async (req, res) => {
    try {
      const reservas = await Reserva.find()
        .populate({
          path: "idHabitacion",
          populate: {
            path: "idPiso",
            populate: {
              path: "idHotel",
            },
          },
        }).populate("idCliente");
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error)
    }
  },

  //Get reserva by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id)
        .populate("idHabitacion")
        .populate("idCliente");
      if (!reserva) {
        res.status(404).json({ message: "Reserva no encontrada" });
      } else {
        res.json(reserva);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post crear reserva
  crearReserva: async (req, res) => {
    try {
      const {
        fecha_entrada,
        fecha_salida,
        cantidad_dias,
        cantidad_adulto,
        cantidad_nino,
        costo_total,
        idHabitacion,
        idCliente,
      } = req.body;

      const reserva = new Reserva({
        fecha_entrada,
        fecha_salida,
        cantidad_dias,
        cantidad_adulto,
        cantidad_nino,
        costo_total,
        idHabitacion,
        idCliente,
      });

      await reserva.save();

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar reserva
  editarReserva: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        fecha_entrada,
        fecha_salida,
        cantidad_dias,
        cantidad_adulto,
        cantidad_nino,
        edad_nino,
        costo_total,
        idHabitacion,
        idCliente,
      } = req.body;

      const reserva = await Reserva.findByIdAndUpdate(
        id,
        {
          fecha_entrada,
          fecha_salida,
          cantidad_dias,
          cantidad_adulto,
          cantidad_nino,
          edad_nino,
          costo_total,
          idHabitacion,
          idCliente,
        },
        { new: true }
      );

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar reserva
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar reserva
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReserva;
