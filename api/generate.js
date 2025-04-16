export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests allowed' });
    }
  
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-2.0-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;
  
    const userInput = req.body.prompt || "Help me write a tutoring request";
  
    const body = {
      contents: [{
        role: "user",
        parts: [{ text: userInput }]
      }],
      generationConfig: {
        responseMimeType: "text/plain"
      }
    };
  
    try {
      const geminiRes = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
  
      const reader = geminiRes.body.getReader();
      let final = '';
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n").filter(Boolean);
  
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const parsed = JSON.parse(line.replace("data: ", ""));
            const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (content) final += content;
          }
        }
      }
  
      return res.status(200).json({ response: final });
  
    } catch (error) {
      return res.status(500).json({ error: 'Error generating content', details: error.message });
    }
  }
  