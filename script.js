// LANGUAGE SWITCHING FUNCTIONALITY
const translations = {
    en: {
        title: "Guest Check-In",
        guestLabel: "Guest Name:",
        dateLabel: "Check-In Date:",
        loginBtn: "Login",
        errorMessage: "Please enter your name and check-in date."
    },
    my: {
        title: "ဧည့်သည် Check-In",
        guestLabel: "ဧည့်သည် အမည်:",
        dateLabel: "Check-In ရက်စွဲ:",
        loginBtn: "ဝင်မည်",
        errorMessage: "ကျေးဇူးပြု၍ အမည်နှင့် Check-In ရက်စွဲ ထည့်ပါ။"
    },
    th: {
        title: "เช็คอินผู้เข้าพัก",
        guestLabel: "ชื่อผู้เข้าพัก:",
        dateLabel: "วันที่เช็คอิน:",
        loginBtn: "เข้าสู่ระบบ",
        errorMessage: "กรุณากรอกชื่อและวันที่เช็คอิน"
    }
};

document.getElementById("language-select")?.addEventListener("change", function() {
    const selectedLang = this.value;
    document.getElementById("title").textContent = translations[selectedLang].title;
    document.getElementById("guestLabel").textContent = translations[selectedLang].guestLabel;
    document.getElementById("dateLabel").textContent = translations[selectedLang].dateLabel;
    document.getElementById("loginBtn").textContent = translations[selectedLang].loginBtn;
});

// LOGIN FUNCTIONALITY (ALLOW ANY NAME + ANY DATE)
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const checkinDate = document.getElementById("checkin-date").value;
    const errorMessage = document.getElementById("error-message");
    const selectedLang = document.getElementById("language-select").value;

    // Allow login if both fields are filled
    if (username !== "" && checkinDate !== "") {
        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("checkinDate", checkinDate);

        window.location.href = "rooms.html";
    } else {
        errorMessage.textContent = translations[selectedLang].errorMessage;
        errorMessage.style.color = "red";
    }
});

// CHATBOT FUNCTIONALITY
const hotelFAQs = {
    "Hello": "How can I help you today?",
    "What time is check-in?": "Check-in time is from 2:00 PM onwards.",
    "What time is check-out?": "Check-out time is at 12:00 PM.",
    "Do you have free Wi-Fi?": "Yes, we provide free high-speed Wi-Fi in all rooms and public areas.",
    "Is breakfast included?": "Yes, complimentary breakfast is included with all bookings."
};

document.getElementById("open-chat")?.addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "flex";
});

document.getElementById("close-chat")?.addEventListener("click", () => {
    document.getElementById("chatbox").style.display = "none";
});

document.getElementById("chat-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const chatInput = document.getElementById("chat-input");
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    displayUserMessage(userMessage);
    chatInput.value = "";
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;

    const response = hotelFAQs[userMessage] || "I'm not sure about that. Let me check for you!";
    displayBotResponse(response);
});

function displayUserMessage(message) {
    const userDiv = document.createElement("div");
    userDiv.textContent = `You: ${message}`;
    userDiv.style.textAlign = "right";
    userDiv.style.background = "#007bff";
    userDiv.style.color = "white";
    userDiv.style.padding = "8px";
    userDiv.style.borderRadius = "10px";
    userDiv.style.margin = "5px";
    document.getElementById("chat-messages").appendChild(userDiv);
}

function displayBotResponse(response) {
    const botDiv = document.createElement("div");
    botDiv.textContent = `Bot: ${response}`;
    botDiv.style.textAlign = "left";
    botDiv.style.background = "#f1f1f1";
    botDiv.style.padding = "8px";
    botDiv.style.borderRadius = "10px";
    botDiv.style.margin = "5px";
    document.getElementById("chat-messages").appendChild(botDiv);
}