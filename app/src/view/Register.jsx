import { logic } from "../logic";
import { useRole } from "../hooks/useRole";

export const Register = ({ onUserRegistered, onUserRegisteredAdmin, onRegisterCancel }) => {
  const { isAdmin } = useRole();
  const handleUserRegistered = () => onUserRegistered();
  const handleCancelRegister = () => onRegisterCancel();
  const handleRegisterAdmin = () => onUserRegisteredAdmin();
  const handleLoginClick = (event) => {
    event.preventDefault();
    handleCancelRegister();
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const address = form.address.value;
    const role = form.role.value;

    try {
      logic
        .registerUser(fullName, email, password, address, role)
        .then(() => {
          form.reset();
          if (!isAdmin) {
            handleUserRegistered();
          } else {
            handleRegisterAdmin();
          }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-6 text-4xl text-blue-500"></div>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>
        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your fullName"
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
              placeholder="Your email"
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
              placeholder="Your password"
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
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  name="role"
                  id="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue="client"
                  required
                >
                  <option value="client">Client</option>
                  <option value="administrator">Administrator</option>
                  <option value="provider">Provider</option>
                  <option value="employee">Employee</option>
                </select>
              </>
            ) : (
              <input type="text" name="role" id="role" value="client" readOnly hidden className="w-full" />
            )}
          </div>
          <div className="flex justify-between gap-2 pt-2">
            {!isAdmin && (
              <button
                onClick={handleLoginClick}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition"
              >
                Login
              </button>
            )}
            <button
              type="submit"
              className={`${
                !isAdmin ? "w-1/2" : "w-full"
              } bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition`}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
