// MARCADOR DE PARTIDOS
const partidos = [
    { local: "Bosnia y Herzegovina", visitante: "Catar", hora: "21:00", estado: "finalizado", golesLocal: 3, golesVisitante: 1, minuto: 90 },
    { local: "Suiza", visitante: "Canadá", hora: "21:00", estado: "finalizado", golesLocal: 2, golesVisitante: 1, minuto: 90 },
    { local: "Marruecos", visitante: "Haití", hora: "00:00", estado: "finalizado", golesLocal: 4, golesVisitante: 2, minuto: 90 },
    { local: "Escocia", visitante: "Brasil", hora: "00:00", estado: "finalizado", golesLocal: 0, golesVisitante: 3, minuto: 90 },
    { local: "Chequia", visitante: "México", hora: "3:00", estado: "finalizado", golesLocal: 0, golesVisitante: 3, minuto: 90 },
    { local: "Sudáfrica", visitante: "Corea del Sur", hora: "3:00", estado: "finalizado", golesLocal: 1, golesVisitante: 0, minuto: 90 },
    { local: "Curazao", visitante: "Costa de Marfil", hora: "22:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Ecuador", visitante: "Alemania", hora: "22:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Japón", visitante: "Suecia", hora: "1:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Túnez", visitante: "Países Bajos", hora: "1:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Paraguay", visitante: "Australia", hora: "4:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Turquía", visitante: "Estados Unidos", hora: "4:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Noruega", visitante: "Francia", hora: "21:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
    { local: "Senegal", visitante: "Irak", hora: "21:00", estado: "programado", golesLocal: 0, golesVisitante: 0, minuto: 0 },
]

function actualizarBarra() {
    const barra = document.querySelector(".barra-resultados")
    barra.innerHTML = ""

    partidos.forEach(partido => {
        const div = document.createElement("div")
        div.classList.add("partido")

        if (partido.estado === "finalizado") {
            div.innerHTML = `
                <span class="equipo">${partido.local}</span>
                <span class="marcador">${partido.golesLocal}-${partido.golesVisitante}</span>
                <span class="equipo">${partido.visitante}</span>
                <span class="fin">FIN</span>
            `
        } else if (partido.estado === "en curso") {
            div.innerHTML = `
                <span class="equipo">${partido.local}</span>
                <span class="marcador">${partido.golesLocal}-${partido.golesVisitante}</span>
                <span class="equipo">${partido.visitante}</span>
                <span class="en-vivo">${partido.minuto}'</span>
            `
        } else {
            div.innerHTML = `
                <span class="equipo">${partido.local}</span>
                <span class="marcador">${partido.hora}</span>
                <span class="equipo">${partido.visitante}</span>
            `
        }

        barra.appendChild(div)
    })
}
actualizarBarra()

const barraResultados = document.querySelector(".barra-resultados")
const flechaIzq = document.querySelector(".flecha-izq")
const flechaDer = document.querySelector(".flecha-der")

flechaIzq.addEventListener("click", () => {
    barraResultados.scrollLeft -= 300
})

flechaDer.addEventListener("click", () => {
    barraResultados.scrollLeft += 300
})

// NOTICIAS TRANSFERS
fetch('https://newsapi.org/v2/everything?q=futbol+fichajes&language=es&sortBy=publishedAt&pageSize=6&apiKey=e17d89cf63c94b4d91a5b8ff48749c34')
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("noticias-transfers")
        data.articles.forEach(articulo => {
            contenedor.innerHTML += `
                <div class="noticia-lista">
                    <img src="${articulo.urlToImage || 'placeholder.jpg'}" alt="${articulo.title}">
                    <div>
                        <h4>${articulo.title}</h4>
                        <time>${new Date(articulo.publishedAt).toLocaleDateString('es-ES')}</time>
                    </div>
                </div>
            `
        })
    })
    .catch(err => console.error("Error", err))