import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

 const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  const { user, API } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        alert("Message send successfully");
      }
    } catch (error) {
      alert("Message not send");
      console.log(error);
    }
  };


  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image">
            <img
              src="\images\info.png"
              alt="Contact Us"
              className="responsive-img"
            />
          </div>

          <div className="auth-form">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input type="text" name="username" required  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  />
              </label>
              <label>
                Email:
                <input type="email" name="email" autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required  />
              </label>
              <label>
                Message:
                <textarea name="message" value={contact.message}
                  onChange={handleInput} required />
              </label>
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
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
      </footer>
    </>
  );
}
export default Contact;