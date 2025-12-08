import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

export const dataFalseStock = [
  { id: 1, name: "Entradas", stock: 100, minStock: 5, icon: <RiArrowDownLine /> },
  { id: 2, name: "Salidas", stock: 88, minStock: 5, icon: <RiArrowUpLine /> },
];

export const dataTrueStock = [
  { id: 1, name: "Producto 1", stock: 10, minStock: 5 },
  { id: 2, name: "Producto 2", stock: 7, minStock: 5 },
  { id: 3, name: "Producto 3", stock: 8, minStock: 5 },
];

export const listStock = [
  {
    productos: {
      id: 1,
      nombre: "Producto 1",
      descripcion: "Descripción del producto",
      codigo: "001",
      categoria: "Producto 001"
    },
    stock: 200,
    minStock: 50,
    precio: 1500,
    proveedor: "Proveedor S.A.",
    estado: "En Stock"
  },
  {
    productos: {
      id: 2,
      nombre: "Producto 2",
      descripcion: "Descripción del producto 2",
      codigo: "002",
      categoria: "Producto 002"
    },
    stock: 120,
    minStock: 30,
    precio: 1000,
    proveedor: "Proveedor S.A.",
    estado: "En Stock"
  },
  {
    productos: {
      id: 3,
      nombre: "Producto 3",
      descripcion: "Descripción del producto 3",
      codigo: "003",
      categoria: "Producto 003"
    },
    stock: 150,
    minStock: 40,
    precio: 1200,
    proveedor: "Proveedor S.A.",
    estado: "En Stock"
  },
  {
    productos: {
      id: 4,
      nombre: "Producto 4",
      descripcion: "Descripción del producto 4",
      codigo: "004",
      categoria: "Producto 004"
    },
    stock: 100,
    minStock: 50,
    precio: 900,
    proveedor: "Proveedor S.A.",
    estado: "En Stock"
  },
  {
    productos: {
      id: 5,
      nombre: "Producto 5",
      descripcion: "Descripción del producto 5",
      codigo: "005",
      categoria: "Producto 005"
    },
    stock: 180,
    minStock: 60,
    precio: 1800,
    proveedor: "Proveedor S.A.",
    estado: "En Stock"
  },

]