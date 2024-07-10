import Hotel from "../models/hotel.js";

const httpHotel = {
  //Get
  getTodo: async (req, res) => {
    try {
      const hotel = await Hotel.find();
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post registro proyecto
  crearHotel: async (req, res) => {
    try {
      const { nombre, descripcion, direccion, telefono } = req.body;

      const hotel = new Hotel({
        nombre,
        descripcion,
        direccion,
        telefono,
      });

      await hotel.save();

      const HotelBusca = await Hotel.findById(hotel._id);

      res.json(HotelBusca);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  editarHotel: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, direccion, telefono } = req.body;

      const hotel = await Hotel.findByIdAndUpdate(
        id,
        {
          nombre,
          descripcion,
          direccion,
          telefono,
        },
        { new: true }
      );

      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const hotel = await Hotel.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const hotel = await Hotel.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpHotel;
