export default function PageHero({ tag, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-overlay"></div>
      <div className="container">
        <div className="page-hero-content" data-animate="fade-up">
          <span className="section-tag">{tag}</span>
          <h1 className="page-hero-title" dangerouslySetInnerHTML={{ __html: title }}></h1>
          <p className="page-hero-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
