import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const mediaPath = (fileName: string) => `/media/${encodeURIComponent(fileName)}`

const galleryImages = [
  {
    file: '3ba4efa0-d54a-45a8-985d-7cf27e175d5c.jpg',
    title: 'Su sonrisa de bienvenida',
  },
  {
    file: '43DA6865-6EAB-44D1-BABF-B4547863CF05.jpg',
    title: 'La mirada que lo decia todo',
  },
  {
    file: '4A8A317E-0EA2-4F7C-88EE-C2C4C8E623FE.jpg',
    title: 'Siempre pendiente',
  },
  {
    file: '6a843797-5fba-4ea4-b59a-5219ce24ae48.jpg',
    title: 'Alegria de casa',
  },
  {
    file: '794cf195-bd4d-427a-af2e-d486aac638b5.jpg',
    title: 'Naricita curiosa',
  },
  {
    file: '1436e813-3d00-4191-ba2a-bffab2b5512e.jpg',
    title: 'Besitos de cerca',
  },
  {
    file: 'c6bacd62-194c-44ac-afe9-6fc276f0127b.jpg',
    title: 'Siestas tranquilas',
  },
  {
    file: 'd2f71613-6bff-4fbc-8cdd-1de84d4b0375.jpg',
    title: 'Su lugar favorito',
  },
  {
    file: '53CE6308-AFA0-4BEA-BC3B-96DA2E6221F1.jpg',
    title: 'Paseos con sol',
  },
  {
    file: '9B004BF5-D6AA-4B18-90A0-52036FDBB8A7.jpg',
    title: 'Rayitos en el balcon',
  },
  {
    file: 'IMG-20230609-WA0014.jpg',
    title: 'Esperando en la puerta',
  },
  {
    file: 'IMG-20230625-WA0010.jpg',
    title: 'Su escondite tierno',
  },
  {
    file: 'IMG_1830.jpg',
    title: 'Recuerdo favorito',
  },
  {
    file: 'IMG_2498.jpg',
    title: 'Dulce compania',
  },
  {
    file: 'IMG_2589.jpg',
    title: 'Mirada de amor',
  },
  {
    file: 'IMG_3573.jpg',
    title: 'Mila en familia',
  },
  {
    file: 'IMG_3894.jpg',
    title: 'Un momento eterno',
  },
]

const videos = [
  { file: '19d189c6-5a79-421a-bc5d-e64302f618e3.mp4', type: 'video/mp4' },
  { file: 'D39D7029-B00F-49E6-B7F4-CA8F022A1452.mp4', type: 'video/mp4' },
  { file: 'd2b68c38-e0ab-4571-9ecd-00010c6ecaa2.mp4', type: 'video/mp4' },
  { file: '822b83f4-03fc-4c3d-b397-bb2a4017b0e6.mp4', type: 'video/mp4' },
  { file: 'fa01af65-0fe4-42bd-981a-697485e9ca7d.mp4', type: 'video/mp4' },
  { file: '52014050-05a3-4bda-a3ff-2cd16b46d86b.mp4', type: 'video/mp4' },
  { file: '70eba279-bb6d-49e9-97e0-5f5d34fb5efb.mp4', type: 'video/mp4' },
  { file: 'c592f9a6-9862-411a-998f-9b1f87e2b616.mp4', type: 'video/mp4' },
]

type GalleryImage = (typeof galleryImages)[number]

function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    document.body.classList.add('is-lightbox-open')
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.classList.remove('is-lightbox-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedImage])

  return (
    <main>
      <section className="hero" aria-label="Memorial de Mila">
        <img
          className="hero__image"
          src={mediaPath('3ba4efa0-d54a-45a8-985d-7cf27e175d5c.jpg')}
          alt="Mila sonriendo de cerca"
        />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow">Para siempre en nuestros corazones</p>
          <h1>Mila</h1>
          <p className="hero__dates">25 de abril de 2015 - 16 de junio de 2026</p>
          <p className="hero__text">
            Una vida llena de amor, ternura, juegos, paseos y esa mirada noble
            que convirtio cada dia en hogar.
          </p>
        </div>
      </section>

      <section className="story section">
        <div className="section__copy">
          <p className="eyebrow">Nuestra companera</p>
          <h2>Nuestra Mila</h2>
          <p>
            Mila llego a nuestras vidas como un rayo de luz. Con su cola siempre
            en movimiento, su carita dulce y su corazon enorme, se volvio parte
            fundamental de la familia.
          </p>
          <p>
            A pesar de su lucha contra la ehrlichiosis, siempre fue fuerte,
            valiente y llena de ternura. Nos enseno paciencia, amor
            incondicional y la belleza de los momentos simples.
          </p>
          <blockquote>Siempre estaras... En Nuestros Corazones... pequena guerrera.</blockquote>
        </div>
        <div className="portrait-stack" aria-label="Retratos de Mila">
          <button
            className="portrait-button"
            type="button"
            onClick={() =>
              setSelectedImage({
                file: '43DA6865-6EAB-44D1-BABF-B4547863CF05.jpg',
                title: 'Mila con panoleta de colores',
              })
            }
          >
            <img
              className="portrait portrait--front"
              src={mediaPath('43DA6865-6EAB-44D1-BABF-B4547863CF05.jpg')}
              alt="Mila con panoleta de colores"
            />
          </button>
          <button
            className="portrait-button"
            type="button"
            onClick={() =>
              setSelectedImage({
                file: '4A8A317E-0EA2-4F7C-88EE-C2C4C8E623FE.jpg',
                title: 'Mila mirando hacia un lado',
              })
            }
          >
            <img
              className="portrait portrait--back"
              src={mediaPath('4A8A317E-0EA2-4F7C-88EE-C2C4C8E623FE.jpg')}
              alt="Mila mirando hacia un lado"
            />
          </button>
        </div>
      </section>

      <section className="gallery section">
        <div className="section__header">
          <p className="eyebrow">Momentos</p>
          <h2>Momentos con Mila</h2>
        </div>
        <div className="photo-grid">
          {galleryImages.map((image, index) => (
            <figure className={index % 5 === 0 ? 'photo photo--wide' : 'photo'} key={image.file}>
              <button
                className="photo__button"
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`Ver imagen completa: ${image.title}`}
              >
                <img src={mediaPath(image.file)} alt={image.title} loading="lazy" />
              </button>
              <figcaption>{image.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="videos section">
        <div className="section__header">
          <p className="eyebrow">Videos</p>
          <h2>Videos de Mila</h2>
        </div>
        <div className="video-grid">
          {videos.map((video, index) => (
            <article className="video-card" key={video.file}>
              <video
                controls
                playsInline
                preload="metadata"
                onLoadedMetadata={(event) => {
                  event.currentTarget.muted = false
                  event.currentTarget.volume = 1
                }}
              >
                <source src={mediaPath(video.file)} type={video.type} />
                Tu navegador no puede reproducir este video.
              </video>
              <p>Recuerdo {index + 1}</p>
            </article>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar imagen"
          >
            Cerrar
          </button>
          <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img src={mediaPath(selectedImage.file)} alt={selectedImage.title} />
            <figcaption>{selectedImage.title}</figcaption>
          </figure>
        </div>
      )}

      <section className="farewell">
        <p className="eyebrow">Gracias por tanto amor</p>
        <h2>Mila vive en cada recuerdo</h2>
        <p>
          Aunque ya no estas fisicamente con nosotros, tu huella se queda para
          siempre en nuestra casa, en nuestras rutinas y en todo el amor que nos
          diste.
        </p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
