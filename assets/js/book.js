// book.js - Handles AI SmartFill and booking feedback

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("booking-form");
    const msg = document.getElementById("response-msg");
    const aiToggle = document.getElementById("aiToggle");
    const generateBtn = document.getElementById("generateBtn");
    const aiPrompt = document.getElementById("aiPrompt");
    const msgBox = document.querySelector("textarea[name='message']");
  
    // Toggle AI generate button visibility
    aiToggle.addEventListener("change", () => {
      generateBtn.style.display = aiToggle.checked ? "block" : "none";
    });
  
    // Generate message with Gemini AI
    generateBtn.addEventListener("click", async () => {
      const prompt = aiPrompt.value.trim();
      if (!prompt) return alert("Please enter a short description for AI.");
  
      generateBtn.innerText = "⏳ Generating...";
      generateBtn.disabled = true;
      msg.style.display = "none";
  
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });
  
        const data = await res.json();
  
        if (data.response) {
          msgBox.value = data.response;
          msg.textContent = "✅ Message generated! Ready to send.";
          msg.style.color = "green";
        } else {
          msg.textContent = "❌ AI couldn't generate. Try again.";
          msg.style.color = "red";
        }
        msg.style.display = "block";
  
      } catch (err) {
        msg.textContent = "❌ Error contacting AI service.";
        msg.style.color = "red";
        msg.style.display = "block";
      }
  
      generateBtn.innerText = "🪄 Generate Request";
      generateBtn.disabled = false;
    });
  
    // On submit
    form.addEventListener("submit", function () {
      msg.textContent = "📨 Sending your request...";
      msg.style.color = "#2563EB";
      msg.style.display = "block";
    });
  });
  