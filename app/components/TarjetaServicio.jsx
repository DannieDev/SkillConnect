import React from "react";
import { useNavigate } from "react-router-dom"; // o `useRouter` de Next.js

export default function TarjetaServicio({ servicio }) {
  const navigate = useNavigate(); // Si usas Next.js, cambia por `const router = useRouter();`

  const handleClick = () => {
    navigate(`/detalle-servicio/${servicio.id}`); // o router.push(`/detalle-servicio/${servicio.id}`)
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition"
    >
      <img src={servicio.img} alt={servicio.titulo} className="w-full h-40 object-cover rounded mb-2" />
      <h3 className="text-sm text-gray-500">{servicio.categoria}</h3>
      <h2 className="text-lg font-semibold">{servicio.titulo}</h2>
      <p className="text-base text-gray-600">${servicio.precio}</p>
    </div>
  );
}
