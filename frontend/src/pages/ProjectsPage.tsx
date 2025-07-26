import { Link } from "react-router-dom";

const mockProjects = [
  {
    id: 1,
    name: "Mi Primer App Flutter",
    description: "Aplicación móvil para gestión de tareas creada sin código.",
    status: "Publicado",
    updated: "2025-07-20",
    color: "from-green-400 via-blue-400 to-purple-400"
  },
  {
    id: 2,
    name: "Restaurante Digital",
    description: "Menú interactivo y pedidos, generado con IA.",
    status: "En progreso",
    updated: "2025-07-22",
    color: "from-yellow-400 via-pink-400 to-purple-400"
  },
  {
    id: 3,
    name: "Control de Inventarios",
    description: "Solución para inventarios, con dashboards visuales.",
    status: "Borrador",
    updated: "2025-07-24",
    color: "from-blue-400 via-cyan-400 to-teal-400"
  },
];

function statusPill(status: string) {
  switch (status) {
    case "Publicado":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-400 to-blue-400 text-white shadow">
          <svg width="16" height="16" fill="none" className="mr-1">
            <circle cx="8" cy="8" r="7" fill="#34d399" />
            <path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {status}
        </span>
      );
    case "En progreso":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-pink-400 text-white shadow">
          <svg width="16" height="16" fill="none" className="mr-1">
            <circle cx="8" cy="8" r="7" fill="#fbbf24" />
            <path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {status}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-400 to-blue-300 text-white shadow">
          <svg width="16" height="16" fill="none" className="mr-1">
            <circle cx="8" cy="8" r="7" fill="#a3a3a3" />
            <path d="M8 6v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {status}
        </span>
      );
  }
}

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex flex-col">
      <header className="w-full py-8 bg-white/80 backdrop-blur-lg flex flex-col items-center shadow-lg relative">
        <Link
          to="/"
          className="absolute left-8 top-8 px-4 py-2 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          ← Home
        </Link>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 drop-shadow mb-2">
          Tus Proyectos
        </h1>
        <p className="text-lg text-gray-500">Apps creadas con IA, sin programar</p>
      </header>
      <main className="flex-grow flex flex-col items-center py-12 px-3">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockProjects.map(project => (
            <div
              key={project.id}
              className={`group bg-white/90 rounded-2xl shadow-xl relative border-2 border-transparent hover:border-blue-300 transition-all`}
            >
              <div className={`absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r ${project.color}`} />
              <div className="p-7 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  {statusPill(project.status)}
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-gray-400">
                    Última actualización: <span className="font-semibold text-gray-600">{project.updated}</span>
                  </span>
                  <Link
                    to={`/projects/${project.id}`}
                    className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-400 text-white font-semibold shadow hover:scale-105 transition-transform"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
              <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="54" height="20" fill="none">
                  <ellipse cx="27" cy="10" rx="24" ry="6" fill="#e0e7ff" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/projects/new"
          className="mt-14 px-8 py-4 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          + Nuevo Proyecto
        </Link>
      </main>
      <footer className="w-full py-5 text-center text-xs text-gray-500 bg-white/30 backdrop-blur">
        &copy; {new Date().getFullYear()} AI Flutter No Code Platform
      </footer>
    </div>
  );
}

export default ProjectsPage;