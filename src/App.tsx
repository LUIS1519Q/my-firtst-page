import { useState } from 'react';
//import './App.css';

export default function App() {
  // Estado central: controla qué pantalla se está mostrando ('menu', 'suma' o 'calculadora')
  const [vistaActual, setVistaActual] = useState('menu');

  // ==========================================
  // VISTA 1: TU CÓDIGO DE SUMA BÁSICA
  // ==========================================
  const VistaSuma = () => {
    // Aquí están tus estados exactos
    const [numberOne, setNumberOne] = useState('');
    const [numberTwo, setNumberTwo] = useState('');

    // Tu función para calcular
    const handleClick = () => {
      const resultado = Number(numberOne) + Number(numberTwo);
      alert(`The result is ${resultado}`);
    };

    return (
      // Cambiamos tu div principal por un Fragment <> para mantener el HTML limpio
      <>
        <h2>Ejercicio: Suma Básica</h2>
        
        <div>
          <label>Number 1: </label>
          <input 
            type="number" 
            value={numberOne} 
            onChange={(e) => setNumberOne(e.target.value)} 
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Number 2: </label>
          <input 
            type="number" 
            value={numberTwo} 
            onChange={(e) => setNumberTwo(e.target.value)} 
          />
        </div>

        <button 
          type="button" 
          onClick={handleClick} 
          style={{ marginTop: '20px', marginRight: '10px' }}
        >
          Submit
        </button>
        
        <br /><br />
        <hr />
        {/* Este es el botón nuevo para regresar al menú */}
        <button onClick={() => setVistaActual('menu')}>⬅ Volver al Menú</button>
      </>
    );
  };

  // ==========================================
  // VISTA 2: CALCULADORA FÍSICA (ESTILOS EN LÍNEA)
  // ==========================================
  const VistaCalculadora = () => {
    const [pantalla, setPantalla] = useState('');

    const agregarValor = (valor) => setPantalla(pantalla + valor);
    const borrarTodo = () => setPantalla('');
    const borrarUno = () => setPantalla(pantalla.slice(0, -1)); 
    
    const calcularIgual = () => {
      try {
        setPantalla(eval(pantalla).toString());
      } catch (error) {
        setPantalla('Error');
      }
    };

    return (
      <>
        <h2>Calculadora Física</h2>
        
        {/* CAJA PRINCIPAL DE LA CALCULADORA */}
        <div style={{ maxWidth: '240px', backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '10px', border: '1px solid #ccc' }}>
          
          {/* LA PANTALLA */}
          <input 
            type="text" 
            value={pantalla} 
            readOnly 
            style={{ 
              width: '100%', 
              boxSizing: 'border-box', /* Asegura que no se salga de la caja */
              textAlign: 'right', 
              marginBottom: '10px', 
              fontSize: '20px',
              padding: '10px'
            }} 
          />
          
          {/* EL TECLADO (AQUÍ ESTÁ LA MAGIA DE LAS 4 COLUMNAS) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', /* Crea 4 columnas iguales */
            gap: '5px' /* Espacio de 5px entre cada botón */
          }}>
            
            {/* FILA 1 */}
            {/* Le decimos a la 'C' que ocupe 2 espacios para que se vea mejor */}
            <button onClick={borrarTodo} style={{ gridColumn: 'span 2', padding: '15px' }}>C</button>
            <button onClick={borrarUno} style={{ padding: '15px' }}>DEL</button>
            <button onClick={() => agregarValor('/')} style={{ padding: '15px' }}>/</button>
            
            {/* FILA 2 */}
            <button onClick={() => agregarValor('7')} style={{ padding: '15px' }}>7</button>
            <button onClick={() => agregarValor('8')} style={{ padding: '15px' }}>8</button>
            <button onClick={() => agregarValor('9')} style={{ padding: '15px' }}>9</button>
            <button onClick={() => agregarValor('*')} style={{ padding: '15px' }}>*</button>
            
            {/* FILA 3 */}
            <button onClick={() => agregarValor('4')} style={{ padding: '15px' }}>4</button>
            <button onClick={() => agregarValor('5')} style={{ padding: '15px' }}>5</button>
            <button onClick={() => agregarValor('6')} style={{ padding: '15px' }}>6</button>
            <button onClick={() => agregarValor('-')} style={{ padding: '15px' }}>-</button>
            
            {/* FILA 4 */}
            <button onClick={() => agregarValor('1')} style={{ padding: '15px' }}>1</button>
            <button onClick={() => agregarValor('2')} style={{ padding: '15px' }}>2</button>
            <button onClick={() => agregarValor('3')} style={{ padding: '15px' }}>3</button>
            <button onClick={() => agregarValor('+')} style={{ padding: '15px' }}>+</button>
            
            {/* FILA 5 */}
            {/* Le decimos al '0' que ocupe 2 espacios */}
            <button onClick={() => agregarValor('0')} style={{ gridColumn: 'span 2', padding: '15px' }}>0</button>
            <button onClick={() => agregarValor('.')} style={{ padding: '15px' }}>.</button>
            <button onClick={calcularIgual} style={{ padding: '15px', backgroundColor: '#d4d4d2' }}>=</button>
            
          </div>
        </div>
        
        <br /><hr />
        <button onClick={() => setVistaActual('menu')} style={{ marginTop: '10px' }}>⬅ Volver al Menú</button>
      </>
    );
  };
  // ==========================================
  // VISTA 3: BUSCADOR API (NUEVA PANTALLA)
  // ==========================================
  const VistaAPI = () => {
    // 1. Estados exclusivos de esta vista
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);

    // 2. Función para consumir la API de Rick & Morty
    const buscarDatos = async () => {
      if (!busqueda) return;
      setCargando(true);
      try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`);
        const datos = await respuesta.json();
        
        // Agarramos estrictamente los primeros 4 resultados
        if (datos.results) {
          setResultados(datos.results.slice(0, 8));
        } else {
          setResultados([]); // Si no encuentra nada
        }
      } catch (error) {
        console.error("Error en la API:", error);
      } finally {
        setCargando(false);
      }
    };

    // PANTALLA A: DETALLE DE LA TARJETA (Maestro-Detalle)
    if (itemSeleccionado) {
      return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
          <h2>{itemSeleccionado.name}</h2>
          <img 
            src={itemSeleccionado.image} 
            alt={itemSeleccionado.name} 
            style={{ width: '100%', borderRadius: '10px', border: '3px solid #ccc' }} 
          />
          <div style={{ textAlign: 'left', marginTop: '15px' }}>
            <p><strong>Estado:</strong> {itemSeleccionado.status === 'Alive' ? '🟢 Vivo' : '🔴 Muerto/Desconocido'}</p>
            <p><strong>Especie:</strong> {itemSeleccionado.species}</p>
            <p><strong>Origen:</strong> {itemSeleccionado.origin.name}</p>
            <p><strong>Ubicación:</strong> {itemSeleccionado.location.name}</p>
          </div>
          <br /><hr />
          <button onClick={() => setItemSeleccionado(null)} style={{ padding: '10px', width: '100%' }}>
            ⬅ Volver a las Tarjetas
          </button>
        </div>
      );
    }

    // PANTALLA B: BUSCADOR Y LISTA DE 4 TARJETAS (CORREGIDO PARA 4 EN FILA)
    return (
      // Aumentamos el maxWidth a 1100px para que las 4 tarjetas tengan espacio de lado a lado
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Buscador de Personajes (API)</h2>
        
        {/* Barra de búsqueda */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
          <input 
            type="text" 
            placeholder="Escribe un nombre (Ej: Rick)..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ width: '300px', padding: '10px', fontSize: '16px', borderRadius: '5px' }}
          />
          <button onClick={buscarDatos} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Buscar
          </button>
        </div>

        {cargando && <p style={{ textAlign: 'center' }}>Buscando datos...</p>}

        {/* CUADRÍCULA FORZADA A 4 COLUMNAS */}
        <div style={{ 
          display: 'grid', 
          // Forzamos 4 columnas de igual tamaño (1fr)
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '15px' 
        }}>
          {resultados.map((personaje) => (
            <div key={personaje.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px', 
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column', // Imagen arriba, texto abajo para ganar espacio lateral
              alignItems: 'center',
              textAlign: 'center'
            }}>
              {/* Imagen arriba y más grande */}
              <img 
                src={personaje.image} 
                alt={personaje.name} 
                style={{ width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '10px' }} 
              />
              
              {/* Información abajo */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>{personaje.name}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#555' }}>{personaje.species}</p>
                
                <button 
                  onClick={() => setItemSeleccionado(personaje)}
                  style={{ 
                    marginTop: 'auto', // Empuja el botón al fondo de la tarjeta
                    padding: '8px', 
                    fontSize: '12px', 
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Ver Información
                </button>
              </div>
            </div>
          ))}
        </div>

        <br /><br /><hr />
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setVistaActual('menu')} style={{ marginTop: '10px', padding: '10px 20px' }}>
            ⬅ Volver al Menú Principal
          </button>
        </div>
      </div>
    );
  };
  // ==========================================
  // RENDERIZADO PRINCIPAL (EL MENÚ)
  // ==========================================
  return (
    <>
      {/* Si la variable es 'menu', mostramos esta pantalla */}
      {vistaActual === 'menu' && (
        <>
          <h1>Menú de Prácticas</h1>
          <button onClick={() => setVistaActual('suma')} style={{ marginRight: '10px' }}>
            Ir a Suma Básica
          </button>
          <button onClick={() => setVistaActual('calculadora')}>
            Ir a Calculadora
          </button>
          <button onClick={() => setVistaActual('api')}>
            Ir a la api
          </button>
        </>
      )}

      {/* Si la variable cambia, React oculta el menú y dibuja la vista correspondiente */}
      {vistaActual === 'suma' && <VistaSuma />}
      {vistaActual === 'calculadora' && <VistaCalculadora />}
      {vistaActual === 'api' && <VistaAPI />}
    </>
  );
}