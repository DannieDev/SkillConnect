'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function PagoServicio() {
  const { id } = useParams();

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-10 max-w-6xl mx-auto">
      {/* Sección izquierda - Información y formulario */}
      <div className="w-full md:w-2/3 pr-0 md:pr-8">
        <h1 className="text-2xl font-bold mb-2">Pagar</h1>
        <p className="text-gray-600 text-sm mb-6">
          SkillConnect mantiene una política de pago seguro, donde el trabajador recibirá su dinero. Al igual que el cliente se le mantendrá un trabajo conforme a lo cotizado.
        </p>

        <h2 className="text-lg font-semibold mb-4">Método de pago</h2>

        <div className="bg-white shadow rounded p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
         <p className="font-medium mr-4">Tarjeta de crédito/débito</p>
         <div className="flex items-center gap-2">
          <Image src="/images/Mastercard.png" alt="MasterCard" width={60} height={20} />
          <Image src="/images/visa.png" alt="Visa" width={60} height={20} />
          <Image src="/images/american.png" alt="American Express" width={60} height={20} />
          <Image src="/images/Diners-Club.png" alt="Diners Club" width={60} height={20} />
         </div>
         </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nombre en la tarjeta"
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Número de tarjeta"
              className="w-full border rounded px-4 py-2"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Fecha de vencimiento"
                className="w-1/2 border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="CVC/CVV"
                className="w-1/2 border rounded px-4 py-2"
              />
            </div>
            <label className="flex items-center text-sm mt-2">
              <input type="checkbox" className="mr-2" />
              Guardar esta tarjeta para próximas compras
            </label>
          </form>
        </div>

        {/* Imagen representativa del servicio */}
        <div className="mt-4">
          <Image
            src="/images/servicio-electricidad.jpg"
            alt="Servicio"
            width={600}
            height={300}
            className="rounded-lg shadow object-cover"
          />
        </div>
      </div>

      {/* Sección derecha - Resumen */}
      <div className="w-full md:w-1/3 mt-10 md:mt-0">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Resumen</h2>
          <div className="flex justify-between mb-2 text-sm">
            <span>Precio original:</span>
            <span>s/ 300.00</span>
          </div>
          <div className="flex justify-between mb-4 text-sm">
            <span>Descuentos:</span>
            <span>s/ 0.00</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>s/ 300.00</span>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Al completar la compra aceptas nuestras <span className="text-green-600 underline cursor-pointer">Condiciones de uso</span>.
          </p>

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow">
            Completar Pago
          </button>
        </div>
      </div>
    </div>
  );
}
