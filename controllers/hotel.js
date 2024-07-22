import Hotel from "../models/hotel.js";
import Piso from "../models/piso.js";

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

  getPorUsuario: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const hotel = await Hotel.find({ idUsuario }).populate("idUsuario");
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post registro proyecto
  crearHotel: async (req, res) => {
    try {
      const { nombre, descripcion, correo, direccion, telefono, pisos, idUsuario } =
        req.body;

      const hotel = new Hotel({
        nombre,
        descripcion,
        correo,
        direccion,
        telefono,
        pisos,
        idUsuario,
      });

      await hotel.save();

      for (let i = 1; i <= pisos; i++) {
        const piso = new Piso({
          num_piso: i,
          idHotel: hotel._id,
        });
        await piso.save();
      }

      const HotelBusca = await Hotel.findById(hotel._id).populate("pisos");

      res.json(HotelBusca);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  editarHotel: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, correo, direccion, telefono, pisos, idUsuario } =
        req.body;

      const hotel = await Hotel.findByIdAndUpdate(
        id,
        {
          nombre,
          descripcion,
          direccion,
          correo,
          telefono,
          pisos,
          idUsuario,
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
