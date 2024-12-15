import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import { apiRequest } from "../api";
import { useAuth } from "../AuthContext";

type MailPayload = {
  subject: string;
  message: string;
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("All fields are required!");
      return;
    }

    const payload: MailPayload = {
      message: message,
      subject: `Contact request - ${name} - ${email}`,
    };
    try {
      const response = await apiRequest<never>(
        "/mail/v1/broadcast",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        logout
      );

      if (response.status === "success") {
        setSuccess(true);
        setError("");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      } else {
        setError("Failed to send your message. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input"
            placeholder="Enter your message"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Error Message */}
        {error && <div className="form-error">{error}</div>}

        {/* Success Message */}
        {success && (
          <div className="form-success">Message sent successfully!</div>
        )}

        {/* Submit Button */}
        <button type="submit" className="explore-button primary">
          Send Message
        </button>
      </form>
    </div>
  );
}
