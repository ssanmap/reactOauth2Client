import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [protectedData, setProtectedData] = useState(null);

  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google'; // Redirigir a la autenticación
  };

  const handleFetchProtectedData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProtectedData(response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  // Almacena el token si lo recibes por la URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwtToken = urlParams.get('token');
    if (jwtToken) {
      setToken(jwtToken);
      window.localStorage.setItem('token', jwtToken);
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">React OAuth2 Client</h1>

      {!token ? (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login with Google
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="lead">Token JWT recibido:</p>
          <pre className="bg-light p-3">{token}</pre>
          <button className="btn btn-success mt-3" onClick={handleFetchProtectedData}>
            Obtener datos protegidos
          </button>
        </div>
      )}

      {protectedData && (
        <div className="mt-4">
          <h3>Datos protegidos:</h3>
          <pre className="bg-light p-3">{JSON.stringify(protectedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
