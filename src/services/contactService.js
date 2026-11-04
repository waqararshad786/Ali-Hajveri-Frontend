// src/services/contactService.js
import { API_URL } from "../api/api"; // ✅ API_URL ab ek hi jagah se aayega

export const sendContactMessage = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        subject: formData.subject || "",
        message: formData.message,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
          (data.errors && data.errors[0]?.msg) ||
          data.error ||
          "Failed to send message"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Network error. Please try again.");
  }
};