export default function contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" required />
        </label>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
      <div className="map-container">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
