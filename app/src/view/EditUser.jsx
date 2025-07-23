import { logic } from "../logic";
import { useState } from "react";
import { useRole } from "../hooks/useRole";

export const EditUser = ({ user, onEditedUser }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role);

  const { isAdmin } = useRole();
  const handleEditUser = () => onEditedUser();

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const address = form.address.value;
    const role = form.role.value;

    try {
      logic
        .updateUser(user.id, fullName, email, password, address, role)
        .then(() => {
          form.reset();
          handleEditUser();
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center  bg-opacity-25
 px-4 fixed inset-0  z-50"
    >
      {" "}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6 text-4xl text-blue-500">
          <i className="fas fa-user-plus"></i>
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update user</h1>
        <form className="space-y-4" onSubmit={handleEditSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Tu email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              contentEditable="true"
              placeholder="Your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/*En react cuando es necesario que un campo se muestre o no en base a una condicion la sintaxis que se emplea es la que se ve a continuacion
          que lo que esta haciendo aqui es que si el usuario tiene el rol de administrador pues se le muestra el primer select y en caso contrario se pone un input oculto
          con el valor por defecto cliente
          */}
          <div>
            {isAdmin ? (
              <>
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue="client"
                  required
                >
                  <option value="client">Cliente</option>
                  <option value="administrator">Administrador</option>
                </select>
              </>
            ) : (
              <input type="text" name="role" id="role" value="client" readOnly hidden className="w-full" />
            )}
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
            >
              Update user
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
              onClick={() => handleEditUser()}
            >
              Cancel update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
