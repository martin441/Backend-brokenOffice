const { db_sync } = require("../config/db");
const { User, Office } = require("../models");

const seedUserOffices = async () => {
  const users = [
    {
      name: "Super Admin",
      lastName: "Owner",
      type: "superAdmin",
      role: "God",
      password: "12345",
      email: "superadmin@globant.com",
    },
    {
      name: "Admin",
      lastName: "lite",
      type: "admin",
      role: "admin",
      password: "12345",
      email: "admin@globant.com",
    },
    {
      name: "Service",
      lastName: "Staff",
      type: "service",
      role: "Staff",
      password: "12345",
      email: "service@globant.com",
    },
    {
      name: "Standard",
      lastName: "Staff",
      type: "standard",
      role: "Staff",
      password: "12345",
      email: "standard@globant.com",
    },
  ];

  const offices = [
    {
      name: "Bahia Blanca",
      address: {
        street: "Dr. Luis María Drago 45",
        zip: "B8000DCA",
        floor: "9° piso",
      },
      coordinates: "-38.71961235719416, -62.26707802202223",
    },

    {
      name: "Buenos Aires",
      address: {
        street: "Carlos M. Della Paolera 261, CABA",
        zip: "C1001ADA",
        floor: "",
      },
      coordinates: "-34.595164849778385, -58.37107472919439",
    },

    {
      name: "Cordoba",
      address: {
        street: "Av. Colón 3440, esquina Zipoli. Barrio Alto Alberdi",
        zip: "5003",
        floor: "",
      },
      coordinates: "-31.400418168552886, -64.22622374454102",
    },

    {
      name: "La Plata",
      address: {
        street: "Calle 6 N°572",
        zip: "B1902CLX",
        floor: "1° piso",
      },
      coordinates: "-34.909168831879626, -57.954606433887214",
    },

    {
      name: "Mar del Plata",
      address: {
        street: "Avenida Colón 1114",
        zip: "B7600FXR",
        floor: "",
      },
      coordinates: "-38.01079581604551, -57.535591359322616",
    },
    {
      name: "Ushuaia",
      address: {
        street: "C. Onas 223",
        zip: "V9410",
        floor: "piso 5",
      },
      coordinates: "-54.808711367401585, -68.31899351489317",
    },
    {
      name: "Tucumán",
      address: {
        street: "Av. Juan Domingo Perón 2300,",
        zip: "T4107",
        floor: "",
      },
      coordinates: "-26.799265029344973, -65.30305880116478",
    },
    {
      name: "Tandil",
      address: {
        street: "General Paz 539",
        zip: "B7000",
        floor: "",
      },
      coordinates: "-37.32496190735314, -59.13066882171529",
    },
    {
      name: "Rosario",
      address: {
        street: "Gral. Alvear 1670",
        zip: "S2000QGR",
        floor: "",
      },
      coordinates: "-26.799240489041185, -65.30289562719635",
    },
    {
      name: "Rosario",
      address: {
        street: "Madres de Plaza 25 de Mayo 3020",
        zip: "S2000QGR",
        floor: "",
      },
      coordinates: "-32.926363502244996, -60.66068869022631",
    },
    {
      name: "Resistencia",
      address: {
        street: "Pte. Dr. Arturo Frondizi 174",
        zip: "H3500CAD",
        floor: "5° piso",
      },
      coordinates: "-27.461998145014306, -58.97729540815109",
    },
    {
      name: "Mendoza",
      address: {
        street: "Montevideo 230",
        zip: "M5500GGF",
        floor: "5° piso",
      },
      coordinates: "-32.89242561164258, -68.8432275172835",
    },
    {
      name: "Mendoza",
      address: {
        street: "Gutierrez 50",
        zip: "M5500GGF",
        floor: "1° piso",
      },
      coordinates: "-32.88828635707043, -68.83951027310734",
    },
    {
      name: "Mendoza",
      address: {
        street: "Darragueira 7097",
        zip: "M5505",
        floor: "1° piso",
      },
      coordinates: "-32.97147011018864, -68.8757536732037",
    },
  ];

  const test = {
    name: "Super Admin",
    lastName: "Owner",
    type: "superAdmin",
    role: "God",
    password: "12345",
    email: "superadmin66@globant.com",
  }

  try {
    await db_sync();
    /* users.forEach(async (item) => {
      return await User.create(item);
    })
    await Office.insertMany(offices); */
    await User.create(test)
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

seedUserOffices();
