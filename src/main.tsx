import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const mediaPath = (fileName: string) => `/media/${encodeURIComponent(fileName)}`

const optimizedPath = (fileName: string, size: 'gallery' | 'large' = 'gallery') => {
  const baseName = fileName.replace(/\.[^.]+$/, '')
  return `/optimized/${encodeURIComponent(`${baseName}-${size}.webp`)}`
}

const optimizedVideoPath = (fileName: string) => `/optimized/${encodeURIComponent(fileName)}`

const optimizedPosterPath = (fileName: string) => `/optimized/${encodeURIComponent(fileName)}`

const galleryImages = [
  {
    file: '3ba4efa0-d54a-45a8-985d-7cf27e175d5c.jpg',
    title: 'La sonrisa que abría la casa',
    period: 'Bienvenida diaria',
    story: 'Esa carita feliz que hacía sentir que uno acababa de llegar al mejor lugar del mundo.',
    featured: true,
  },
  {
    file: '43DA6865-6EAB-44D1-BABF-B4547863CF05.jpg',
    title: 'Pañuelo de fiesta',
    period: 'Días de celebración',
    story: 'Mila posando con esa mezcla perfecta de ternura, confianza y personalidad.',
  },
  {
    file: '4A8A317E-0EA2-4F7C-88EE-C2C4C8E623FE.jpg',
    title: 'Desde su rincón secreto',
    period: 'Momentos de curiosidad',
    story: 'Siempre pendiente de todo, incluso cuando parecía estar escondida.',
  },
  {
    file: '6a843797-5fba-4ea4-b59a-5219ce24ae48.jpg',
    title: 'Pegadita a los suyos',
    period: 'Rutinas de casa',
    story: 'La compañía silenciosa que convertía cualquier momento simple en familia.',
  },
  {
    file: '794cf195-bd4d-427a-af2e-d486aac638b5.jpg',
    title: 'Naricita curiosa',
    period: 'Cerca, muy cerca',
    story: 'Su forma de acercarse al mundo: con confianza, ternura y una nariz protagonista.',
    featured: true,
  },
  {
    file: '1436e813-3d00-4191-ba2a-bffab2b5512e.jpg',
    title: 'Besitos de cerca',
    period: 'Amor sin medida',
    story: 'Un recuerdo de esos que parecen chiquitos, pero guardan todo el amor.',
  },
  {
    file: 'c6bacd62-194c-44ac-afe9-6fc276f0127b.jpg',
    title: 'Siestas tranquilas',
    period: 'Descanso',
    story: 'Dormir cerquita, confiada, sabiendo que estaba en su hogar.',
  },
  {
    file: 'd2f71613-6bff-4fbc-8cdd-1de84d4b0375.jpg',
    title: 'Su cama, su reino',
    period: 'Lugar favorito',
    story: 'Uno de esos espacios que todavía conserva su presencia.',
  },
  {
    file: '53CE6308-AFA0-4BEA-BC3B-96DA2E6221F1.jpg',
    title: 'Paseos con sol',
    period: 'Afuera',
    story: 'Caminar con ella era avanzar al ritmo de su alegría.',
  },
  {
    file: '9B004BF5-D6AA-4B18-90A0-52036FDBB8A7.jpg',
    title: 'Rayitos en el balcón',
    period: 'Tardes quietas',
    story: 'Mirar hacia afuera, tomar el sol y dejar que el día pasara despacito.',
    featured: true,
  },
  {
    file: 'IMG-20230609-WA0014.jpg',
    title: 'Esperando en la puerta',
    period: 'Rituales',
    story: 'La escena conocida: Mila cerca de la entrada, pendiente de quién llegaba.',
  },
  {
    file: 'IMG-20230625-WA0010.jpg',
    title: 'Juego escondido',
    period: 'Travesuras',
    story: 'Su pelota, su mirada y esa manera suya de invitar a jugar.',
  },
  {
    file: 'IMG_1830.jpg',
    title: 'Sentadita como señorita',
    period: 'Casa',
    story: 'Una postura seria para una perrita que siempre terminaba derritiendo a todos.',
  },
  {
    file: 'IMG_2498.jpg',
    title: 'Mirada de amor',
    period: 'Compañía',
    story: 'Ojos nobles, orejitas atentas y una presencia que llenaba cualquier cuarto.',
  },
  {
    file: 'IMG_2589.jpg',
    title: 'Descanso de princesa',
    period: 'Calma',
    story: 'Los descansos también eran parte de su forma de confiar.',
  },
  {
    file: 'IMG_3573.jpg',
    title: 'Sonrisa en familia',
    period: 'Alegría',
    story: 'Mila sentada, orgullosa, como sabiendo que ese también era su lugar.',
  },
  {
    file: 'IMG_3894.jpg',
    title: 'Mirando el mundo',
    period: 'Balcón',
    story: 'Una imagen tranquila para recordar cuánto disfrutaba observar la vida pasar.',
  },
]

const timeline = [
  {
    date: '25 de abril de 2015',
    title: 'Nació una luz',
    text: 'Comenzó la vida de Mila, una perrita que después llenaría la casa de ternura, juegos y compañía.',
  },
  {
    date: 'Su llegada a casa',
    title: 'La familia creció',
    text: 'Mila no llegó como una mascota más: llegó como una presencia capaz de cambiar rutinas y volverlas hogar.',
  },
  {
    date: 'Años de paseos y siestas',
    title: 'Los días simples se volvieron recuerdos',
    text: 'El balcón, la puerta, su cama, los paseos y sus miradas fueron construyendo una historia cotidiana e inmensa.',
  },
  {
    date: 'Su lucha',
    title: 'Pequeña guerrera',
    text: 'Aun enfrentando la ehrlichiosis, Mila siguió enseñando fortaleza, paciencia y amor sin pedir nada a cambio.',
  },
  {
    date: '16 de junio de 2026',
    title: 'Una despedida con amor',
    text: 'Su cuerpo descansó, pero su huella quedó en cada rincón, en cada costumbre y en cada recuerdo compartido.',
  },
]

const videoMemories = [
  {
    file: '19d189c6-5a79-421a-bc5d-e64302f618e3.mp4',
    source: 'optimized',
    title: 'Alegría en movimiento',
    caption: 'Un recuerdo de Mila viva, presente y llena de energía.',
    poster: '3ba4efa0-d54a-45a8-985d-7cf27e175d5c.jpg',
    posterSource: 'image',
  },
  {
    file: 'D39D7029-B00F-49E6-B7F4-CA8F022A1452.mp4',
    source: 'optimized',
    title: 'Su forma de saludar',
    caption: 'La emoción de tenerla cerca, como si cada encuentro fuera una fiesta.',
    poster: '43DA6865-6EAB-44D1-BABF-B4547863CF05.jpg',
    posterSource: 'image',
  },
  {
    file: 'd2b68c38-e0ab-4571-9ecd-00010c6ecaa2.mp4',
    source: 'optimized',
    title: 'Pequeñas rutinas',
    caption: 'Momentos cotidianos que hoy valen como tesoros.',
    poster: 'IMG_1830.jpg',
    posterSource: 'image',
  },
  {
    file: '822b83f4-03fc-4c3d-b397-bb2a4017b0e6.mp4',
    source: 'optimized',
    title: 'La casa con Mila',
    caption: 'Su presencia hacía que todo se sintiera más vivo.',
    poster: 'IMG_2498.jpg',
    posterSource: 'image',
  },
  {
    file: 'fa01af65-0fe4-42bd-981a-697485e9ca7d.mp4',
    source: 'optimized',
    title: 'Instantes de ternura',
    caption: 'Esa dulzura que no necesitaba explicación.',
    poster: '794cf195-bd4d-427a-af2e-d486aac638b5.jpg',
    posterSource: 'image',
  },
  {
    file: '52014050-05a3-4bda-a3ff-2cd16b46d86b.mp4',
    source: 'optimized',
    title: 'Compañera fiel',
    caption: 'Mila acompañando, mirando, entendiendo.',
    poster: 'IMG_3573.jpg',
    posterSource: 'image',
  },
  {
    file: '70eba279-bb6d-49e9-97e0-5f5d34fb5efb.mp4',
    source: 'optimized',
    title: 'Momentos para volver',
    caption: 'Videos que permiten verla otra vez, aunque sea por unos segundos.',
    poster: 'd2f71613-6bff-4fbc-8cdd-1de84d4b0375.jpg',
    posterSource: 'image',
  },
  {
    file: 'c592f9a6-9862-411a-998f-9b1f87e2b616.mp4',
    source: 'optimized',
    title: 'Siempre Mila',
    caption: 'Un cierre para recordarla como fue: única, noble y amada.',
    poster: '9B004BF5-D6AA-4B18-90A0-52036FDBB8A7.jpg',
    posterSource: 'image',
  },
  {
    file: 'IMG_2329.mp4',
    source: 'optimized',
    title: 'Un instante rescatado',
    caption: 'Uno de esos videos que guardan gestos pequeños y vuelven a traerla cerca.',
    poster: 'IMG_2329-poster.webp',
    posterSource: 'optimized',
  },
  {
    file: 'IMG_2330.mp4',
    source: 'optimized',
    title: 'Mila en sus días de casa',
    caption: 'La memoria cotidiana: moverse, mirar, acompañar y estar presente.',
    poster: 'IMG_2330-poster.webp',
    posterSource: 'optimized',
  },
  {
    file: 'IMG_2363.mp4',
    source: 'optimized',
    title: 'Otro pedacito de vida',
    caption: 'Un recuerdo recuperado de los archivos grandes para hacerlo parte del memorial.',
    poster: 'IMG_2363-poster.webp',
    posterSource: 'optimized',
  },
  {
    file: 'IMG_6992.mp4',
    source: 'optimized',
    title: 'El video largo para volver a verla',
    caption: 'Un recuerdo más extenso, ahora comprimido para poder verlo sin cargar el sitio de peso innecesario.',
    poster: 'IMG_6992-poster.webp',
    posterSource: 'optimized',
  },
]

const rituals = [
  {
    title: 'Sus saludos',
    text: 'Mila tenía la capacidad de hacer sentir especial cualquier regreso a casa.',
  },
  {
    title: 'Sus lugares',
    text: 'La cama, el balcón y la puerta siguen contando pequeñas historias de ella.',
  },
  {
    title: 'Su mirada',
    text: 'Una mirada noble, atenta y dulce que parecía entenderlo todo.',
  },
]

type GalleryImage = (typeof galleryImages)[number]

function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedImage = selectedIndex === null ? null : galleryImages[selectedIndex]

  const featuredImages = useMemo(() => galleryImages.filter((image) => image.featured), [])

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => (current === null ? current : (current + 1) % galleryImages.length))
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) =>
          current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length,
        )
      }
    }

    document.body.classList.add('is-lightbox-open')
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.classList.remove('is-lightbox-open')
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [selectedImage])

  const openImage = (image: GalleryImage) => {
    setSelectedIndex(galleryImages.findIndex((galleryImage) => galleryImage.file === image.file))
  }

  return (
    <main>
      <section className="hero" aria-label="Memorial de Mila">
        <picture>
          <source srcSet={optimizedPath('3ba4efa0-d54a-45a8-985d-7cf27e175d5c.jpg', 'large')} type="image/webp" />
          <img
            className="hero__image"
            src={mediaPath('3ba4efa0-d54a-45a8-985d-7cf27e175d5c.jpg')}
            alt="Mila sonriendo de cerca"
          />
        </picture>
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow">Memorial de vida</p>
          <h1>Mila</h1>
          <p className="hero__dates">25 de abril de 2015 - 16 de junio de 2026</p>
          <p className="hero__text">
            Nuestra pequeña guerrera: compañía, ternura, alegría de casa y amor incondicional para siempre.
          </p>
        </div>
      </section>

      <section className="intro section" aria-label="Historia de Mila">
        <div className="intro__copy">
          <p className="eyebrow">Nuestra compañera</p>
          <h2>Una vida que volvió hogar cada día</h2>
          <p>
            Mila llegó a nuestras vidas como un rayo de luz. Con su cola siempre en movimiento, su carita dulce y su
            corazón enorme, se volvió parte fundamental de la familia.
          </p>
          <p>
            Fue alegría en los saludos, calma en las siestas, compañía en las rutinas y valentía en los días difíciles.
            Aun en su lucha contra la ehrlichiosis, nos enseñó paciencia, fuerza y amor sin condiciones.
          </p>
          <blockquote>Siempre estarás en nuestros corazones, pequeña guerrera.</blockquote>
        </div>

        <div className="memory-strip" aria-label="Recuerdos destacados de Mila">
          {featuredImages.map((image) => (
            <button className="memory-strip__item" type="button" key={image.file} onClick={() => openImage(image)}>
              <img src={optimizedPath(image.file)} alt={image.title} loading="lazy" />
              <span>{image.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="timeline-section section" aria-label="Línea de tiempo de Mila">
        <div className="section__header section__header--split">
          <div>
            <p className="eyebrow">Línea de tiempo</p>
            <h2>Su historia con nosotros</h2>
          </div>
          <p>
            No son solo fechas. Son capítulos de una vida que dejó señales de amor en la casa, en la familia y en la
            memoria.
          </p>
        </div>

        <ol className="timeline">
          {timeline.map((item) => (
            <li className="timeline__item" key={`${item.date}-${item.title}`}>
              <time>{item.date}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rituals section" aria-label="Lo que recordamos de Mila">
        <div className="section__header">
          <p className="eyebrow">Lo que queda</p>
          <h2>Las pequeñas cosas que eran tan suyas</h2>
        </div>
        <div className="ritual-grid">
          {rituals.map((ritual) => (
            <article className="ritual-card" key={ritual.title}>
              <h3>{ritual.title}</h3>
              <p>{ritual.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section">
        <div className="section__header section__header--split">
          <div>
            <p className="eyebrow">Álbum de recuerdos</p>
            <h2>Momentos con Mila</h2>
          </div>
          <p>Cada imagen conserva una parte de su carácter: curiosa, noble, juguetona, tranquila y profundamente amada.</p>
        </div>

        <div className="photo-grid">
          {galleryImages.map((image, index) => (
            <figure className={image.featured ? 'photo photo--wide' : 'photo'} key={image.file}>
              <button
                className="photo__button"
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ver imagen completa: ${image.title}`}
              >
                <img src={optimizedPath(image.file)} alt={image.title} loading="lazy" />
              </button>
              <figcaption>
                <span>{image.period}</span>
                {image.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="videos section">
        <div className="section__header section__header--split">
          <div>
            <p className="eyebrow">Videos</p>
            <h2>Volver a verla moverse</h2>
          </div>
          <p>Los videos quedan como pequeñas ventanas: segundos donde su energía y su ternura siguen presentes.</p>
        </div>

        <div className="video-grid">
          {videoMemories.map((video) => (
            <article className="video-card" key={video.file}>
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.posterSource === 'optimized' ? optimizedPosterPath(video.poster) : optimizedPath(video.poster)}
              >
                <source src={video.source === 'optimized' ? optimizedVideoPath(video.file) : mediaPath(video.file)} type="video/mp4" />
                Tu navegador no puede reproducir este video.
              </video>
              <div className="video-card__copy">
                <h3>{video.title}</h3>
                <p>{video.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="farewell">
        <div className="farewell__inner">
          <p className="eyebrow">Gracias por tanto amor</p>
          <h2>Mila vive en cada recuerdo</h2>
          <p>
            Aunque ya no estás físicamente con nosotros, tu huella se queda para siempre en nuestra casa, en nuestras
            rutinas y en todo el amor que nos diste.
          </p>
        </div>
      </section>

      {selectedImage && selectedIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Cerrar imagen"
          >
            Cerrar
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length)
            }}
            aria-label="Imagen anterior"
          >
            Anterior
          </button>
          <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img src={optimizedPath(selectedImage.file, 'large')} alt={selectedImage.title} />
            <figcaption>
              <span>{selectedImage.period}</span>
              <strong>{selectedImage.title}</strong>
              {selectedImage.story}
            </figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex((selectedIndex + 1) % galleryImages.length)
            }}
            aria-label="Imagen siguiente"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
