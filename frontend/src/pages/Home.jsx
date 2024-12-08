export default function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We invest in the world’s potential
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here at Flowbite, we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Connect Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="\images\home.png"
            alt="Hero Section"
            className="responsive-img"
          />
        </div>
      </div>
    </div>
  );
}
