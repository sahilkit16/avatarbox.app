export default function Oops({ title, message }) {
  return (
    <div className="hero-body">
      <div className="container">
        <section>
          <h1 className="title has-text-centered is-size-1">
            {title || "Oops!"}
          </h1>
          <div className="level">
            <h1 className="level-item subtitle has-text-centered">
              {message || "An error has occurred"}
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
}
