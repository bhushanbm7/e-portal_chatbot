import { GoogleGenAI } from "https://esm.run/@google/genai";

const ai = new GoogleGenAI({
    apiKey: ""   // 🔑 add your key here
});

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.sendMessage = async function () {
    const query = userInput.value.trim();
    if (!query) return;

    addMessage(query, "user");
    userInput.value = "";

    addMessage("Thinking...", "bot");

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            You are a Government Scheme Assistant.
            your task is to answer politely and accurately about various government schemes in India.
            if they ask for any scheme details and provide the age limit,genders,
            eligiblity criteria,documents required for apply to scheme and benifits.
            only provide information related to government schemes in India.
            If the question is not related to government schemes in India, politely refuse to answer.
            and only simple short relevent answers.not more than 50 words.
            give details about schemes launched by the government of India. if asked and provide basic info about schemes like age limit,eligiblity criteria,documents required for apply to scheme and benifits.
            



User Query: ${query}
`
        });

        chatBox.lastChild.remove(); // remove "Thinking..."
        addMessage(response.text, "bot");

    } catch (error) {
        chatBox.lastChild.remove();
        addMessage("Error fetching response. Please try again.", "bot");
    }
};

