let reminders = [];
let chatHistory = []; // Array to store chat messages


// 🩺 Symptom and advice list with multilingual keywords and Hindi translations
const symptomAdvice = [
    {
    keywords: ["headache", "सिरदर्द", "सर दर्द"],
    english: "You can take Paracetamol or Crocin. Stay hydrated and rest.",
    hindi: "आप पेरासिटामोल या क्रोसिन ले सकते हैं। पानी पिएं और आराम करें।"
  },
  {
    keywords: ["migraine", "माइग्रेन"],
    english: "Take Sumatriptan or Naproxen. Lie in a dark, quiet room and avoid triggers.",
    hindi: "सुमाट्रिप्टान या नेप्रोक्सेन लें। अंधेरे और शांत कमरे में आराम करें और ट्रिगर्स से बचें।"
  },
  {
    keywords: ["fever", "बुखार"],
    english: "Take Paracetamol (Dolo 650). Drink fluids. See a doctor if high fever persists.",
    hindi: "पेरासिटामोल (डोलो 650) लें। तरल पदार्थ पिएं। यदि तेज बुखार बना रहे तो डॉक्टर से मिलें।"
  },
  {
    keywords: ["cold", "जुकाम"],
    english: "Use steam inhalation. Medicines like Sinarest or Cetirizine can help.",
    hindi: "भाप लें। साइनारेस्ट या सिट्रीज़ीन जैसी दवाएं मदद कर सकती हैं।"
  },
  {
    keywords: ["cough", "खांसी"],
    english: "Benadryl, Ascoril, or Honitus syrup may help. Dry cough: Chericof-D. Wet cough: Ambroxol.",
    hindi: "बेनेड्रिल, एस्कोरिल या होनिटस सिरप लें। सूखी खांसी: चेरीकॉफ-डी, गीली खांसी: एम्ब्रोक्सोल।"
  },
  {
    keywords: ["sore throat", "गले में खराश"],
    english: "Gargle with warm salt water. Use Strepsils or Betadine gargle.",
    hindi: "गर्म नमक पानी से गरारे करें। स्टे्रप्सिल्स या बेटाडीन गरारे करें।"
  },
  {
    keywords: ["stomach pain", "पेट दर्द"],
    english: "Take Meftal Spas or Cyclopam. Eat light, avoid oily foods.",
    hindi: "मेफ्टाल स्पास या सायक्लोपैम लें। हल्का भोजन करें, तली चीज़ें न खाएं।"
  },
  {
    keywords: ["vomiting", "उल्टी"],
    english: "Try Ondem (Ondansetron) or Domstal. Stay hydrated.",
    hindi: "ऑन्डेम (ऑनडैनस्ट्रॉन) या डॉमस्टाल लें। हाइड्रेटेड रहें।"
  },
  {
    keywords: ["diarrhea", "दस्त"],
    english: "Use ORS solution. Medicines like Loperamide or Enterogermina help.",
    hindi: "ओआरएस घोल लें। लोपेरामाइड या एंटरोजर्मिना जैसी दवाएं मदद करेंगी।"
  },
  {
    keywords: ["acidity", "एसिडिटी"],
    english: "Take Pantoprazole, Digene, or Eno. Avoid spicy/oily food.",
    hindi: "पैंटोप्राज़ोल, डाइजीन या इनो लें। मसालेदार/तैलीय भोजन से बचें।"
  },
  {
    keywords: ["diarrhea", "दस्त"],
    english: "Use ORS solution. Medicines like Loperamide or Enterogermina help.",
    hindi: "ओआरएस घोल लें। लोपेरामाइड या एंटरोजर्मिना जैसी दवाएं मदद करेंगी।"
  },
  {
    keywords: ["constipation", "कब्ज"],
    english: "Isabgol, Lactulose syrup, or Dulcolax can help. Drink warm water in morning.",
    hindi: "इसबगोल, लैक्टुलोज सिरप या ड्यूलोक्स मदद कर सकते हैं। सुबह गर्म पानी पिएं।"
  },
  {
    keywords: ["acidity", "एसिडिटी"],
    english: "Take Pantoprazole, Digene, or Eno. Avoid spicy/oily food.",
    hindi: "पैंटोप्राज़ोल, डाइजीन या इनो लें। मसालेदार/तैलीय भोजन से बचें।"
  },
  {
    keywords: ["gas", "गैस"],
    english: "Use Gasex, Simethicone tablets, or ajwain with warm water.",
    hindi: "गैसेक्स, सिमेथिकोन टैबलेट या अजवाइन गर्म पानी के साथ लें।"
  },
  {
    keywords: ["back pain", "पीठ दर्द"],
    english: "Use Ibuprofen or Combiflam. Apply muscle relaxant gel like Volini.",
    hindi: "इबुप्रोफेन या कॉम्बीफ्लैम लें। वोलिनी जैसे मसल रिलैक्सेंट जेल लगाएं।"
  },
  {
    keywords: ["eye pain", "आंखों में दर्द"],
    english: "Use Refresh Tears or Systane drops. Rest your eyes and reduce screen time.",
    hindi: "रिफ्रेश टियर्स या सिस्टेन ड्रॉप्स का उपयोग करें। आंखों को आराम दें और स्क्रीन टाइम कम करें।"
  },
  {
    keywords: ["burning urination", "पेशाब में जलन"],
    english: "Drink more water, take Cital syrup. Consult doctor if painful or recurrent.",
    hindi: "अधिक पानी पिएं, सिटल सिरप लें। दर्द या बार-बार हो तो डॉक्टर से मिलें।"
  },
  {
    keywords: ["fatigue", "थकान"],
    english: "Multivitamins like Revital or Neurobion help. Sleep well and eat iron-rich foods.",
    hindi: "रिवाइटल या न्यूरोबियन जैसे मल्टीविटामिन मदद करते हैं। अच्छी नींद लें और आयरन युक्त आहार लें।"
  },
  {
    keywords: ["weakness", "कमज़ोरी"],
    english: "Take Livogen or Fefol (iron). Add vitamin B12 supplements like Becosules.",
    hindi: "लिवोजन या फेफोल (आयरन) लें। बी12 सप्लिमेंट जैसे बीकोसुल्स लें।"
  },
  {
    keywords: ["dizziness", "चक्कर"],
    english: "Sit or lie down. Take ORS or glucose water. Check BP if frequent.",
    hindi: "बैठ जाएं या लेट जाएं। ओआरएस या ग्लूकोज पानी लें। बार-बार हो तो बीपी चेक करें।"
  },
  {
    keywords: ["iron deficiency", "आयरन की कमी"],
    english: "Use Ferrous Sulfate, Livogen, or Fefol after meals.",
    hindi: "भोजन के बाद फेरस सल्फेट, लिवोजन या फेफोल लें।"
  },
  {
    keywords: ["infection", "संक्रमण"],
    english: "Consult a doctor. Often treated with Amoxicillin or Azithromycin (prescription-only).",
    hindi: "डॉक्टर से मिलें। आमतौर पर एमोक्सिसिलिन या एजिथ्रोमाइसिन से इलाज किया जाता है।"
  },
  {
    keywords: ["allergy", "एलर्जी"],
    english: "Use Cetirizine or Allegra. Avoid known allergens. Apply anti-allergy cream if needed.",
    hindi: "सेटिरीज़ीन या एलेग्रा लें। एलर्जी करने वाली चीज़ों से बचें। ज़रूरत हो तो एंटी-एलर्जी क्रीम लगाएं।"
  },
  {
    keywords: ["menstrual pain", "माहवारी का दर्द"],
    english: "Meftal Spas and a hot water bag can relieve cramps. Rest well.",
    hindi: "मेफ्टाल स्पास और गर्म पानी की थैली से राहत मिल सकती है। आराम करें।"
  },
  {
    keywords: ["acne", "मुंहासे"],
    english: "Apply Clindamycin gel or Benzoyl Peroxide. Keep your skin clean and drink water.",
    hindi: "क्लिंडामाइसिन जेल या बेंज़ॉयल पेरॉक्साइड लगाएं। त्वचा को साफ रखें और पानी पिएं।"
  },
  {
    keywords: ["skin rash", "चर्म रोग", "स्किन रैश"],
    english: "Apply Candid or Caladryl lotion. Avoid scratching. Use antihistamines like Cetirizine.",
    hindi: "कैंडिड या कैलाड्रिल लोशन लगाएं। खुजली न करें। सेटिरीज़ीन जैसे एंटीहिस्टामिन लें।"
  },
  {
    keywords: ["toothache", "दांत दर्द"],
    english: "Use Mefenamic Acid or Ibuprofen. Visit a dentist if pain continues.",
    hindi: "मेफेनामिक एसिड या इबुप्रोफेन लें। दर्द जारी रहे तो डेंटिस्ट से मिलें।"
  },
  {
    keywords: ["sleep problems", "नींद की समस्या"],
    english: "Try Melatonin supplements. Avoid caffeine at night and maintain sleep hygiene.",
    hindi: "मेलाटोनिन सप्लिमेंट लें। रात को कैफीन से बचें और नींद की अच्छी आदतें अपनाएं।"
  },
  {
    keywords: ["anxiety", "चिंता"],
    english: "Take deep breaths, try herbal teas. Consult doctor for Alprazolam if severe.",
    hindi: "गहरी सांस लें, हर्बल चाय लें। ज्यादा परेशानी हो तो डॉक्टर से मिलें।"
  },
  {
    keywords: ["depression", "डिप्रेशन", "अवसाद"],
    english: "Mild cases benefit from exercise and therapy. Severe cases may require Fluoxetine (doctor-prescribed).",
    hindi: "हल्के मामलों में व्यायाम और थेरेपी से लाभ होता है। गंभीर मामलों में फ्लूऑक्सेटीन जैसी दवा (डॉक्टर की सलाह से) ली जा सकती है।"
  },
  {
    keywords: ["chest pain", "सीने में दर्द"],
    english: "Could be serious. Use Nitroglycerin if prescribed. Go to ER immediately if severe.",
    hindi: "यह गंभीर हो सकता है। डॉक्टर द्वारा बताए गए नाइट्रोग्लिसरीन लें। ज्यादा दर्द हो तो तुरंत अस्पताल जाएं।"
  },
  {
    keywords: ["breathlessness", "सांस फूलना"],
    english: "Use Salbutamol inhaler if asthmatic. Sit upright and seek medical attention.",
    hindi: "यदि अस्थमा है तो सालबुटामोल इनहेलर लें। सीधे बैठें और डॉक्टर से मिलें।"
  },
  {
    keywords: ["nose blockage", "नाक बंद"],
    english: "Steam inhalation and Otrivin drops can help. Stay hydrated.",
    hindi: "भाप लें और ओट्रिविन ड्रॉप्स का उपयोग करें। हाइड्रेटेड रहें।"
  },
  {
    keywords: ["sinus pain", "साइनस दर्द"],
    english: "Use Ibuprofen and saline nasal spray. Steam helps relieve pressure.",
    hindi: "इबुप्रोफेन और सेलाइन नेजल स्प्रे लें। भाप लेने से दबाव में राहत मिलती है।"
  },

  {
    keywords: ["mouth ulcer", "मुंह में छाला"],
    english: "Apply Dologel or Zytee. Avoid spicy foods and use antiseptic mouthwash.",
    hindi: "डोलोजेल या ज़ायटी लगाएं। तीखा खाना न खाएं और एंटीसेप्टिक माउथवॉश का उपयोग करें।"
  },
  {
    keywords: ["joint pain", "जोड़ों का दर्द"],
    english: "Take Ibuprofen or Diclofenac. Apply warm compress or ointment like Volini.",
    hindi: "इबुप्रोफेन या डाइक्लोफेनाक लें। गर्म सिकाई करें या वोलिनी जैसी मलहम लगाएं।"
  },
  {
    keywords: ["heel pain", "एड़ी में दर्द"],
    english: "Rest foot. Use Diclofenac gel and wear soft-cushioned footwear.",
    hindi: "पैर को आराम दें। डाइक्लोफेनाक जेल लगाएं और मुलायम चप्पल पहनें।"
  },
  {
    keywords: ["knee pain", "घुटने में दर्द"],
    english: "Use hot/cold packs and take painkillers like Paracetamol or Flexon.",
    hindi: "गर्म या ठंडे पैक लगाएं और पेरासिटामोल या फ्लेक्सोन जैसी दर्द निवारक दवा लें।"
  },
  {
    keywords: ["leg cramps", "पैर में ऐंठन"],
    english: "Stretch gently. Take magnesium supplements and stay hydrated.",
    hindi: "धीरे से स्ट्रेच करें। मैग्नीशियम सप्लीमेंट लें और हाइड्रेटेड रहें।"
  },
  {
    keywords: ["dry eyes", "सूखी आँखें"],
    english: "Use artificial tears like Refresh or Systane. Blink often and reduce screen time.",
    hindi: "रिफ्रेश या सिस्टेन जैसी आई ड्रॉप्स लें। बार-बार पलक झपकाएं और स्क्रीन टाइम कम करें।"
  },
  {
    keywords: ["sunburn", "धूप से झुलसना"],
    english: "Apply Aloe Vera or Caladryl. Avoid sun and stay hydrated.",
    hindi: "एलोवेरा या कैलाड्रिल लगाएं। धूप से बचें और हाइड्रेटेड रहें।"
  },
  {
    keywords: ["motion sickness", "मोशन सिकनेस", "सफ़र में उल्टी"],
    english: "Take Avomine or Dramamine before travel. Look forward and stay still.",
    hindi: "सफ़र से पहले एवोमिन या ड्रामामिन लें। आगे देखें और स्थिर रहें।"
  },
  {
    keywords: ["heat stroke", "लू लगना"],
    english: "Move to a cool area, drink ORS, and rest. Seek emergency care if fainting.",
    hindi: "ठंडी जगह जाएं, ओआरएस पिएं और आराम करें। यदि बेहोशी हो तो तुरंत डॉक्टर को दिखाएं।"
  },
  {
    keywords: ["food poisoning", "खाद्य विषाक्तता"],
    english: "Take Norflox-TZ (if prescribed). Rest and stay hydrated with ORS.",
    hindi: "नॉरफ्लॉक्स-टीज़ेड लें (अगर डॉक्टर ने बताया हो)। आराम करें और ओआरएस पिएं।"
  },
  {
    keywords: ["hair fall", "बाल झड़ना"],
    english: "Use mild shampoo. Biotin supplements and a protein-rich diet may help.",
    hindi: "हल्का शैम्पू उपयोग करें। बायोटिन सप्लीमेंट और प्रोटीन युक्त आहार लें।"
  },
  {
    keywords: ["bloating", "पेट फूलना"],
    english: "Try Eno or Simethicone. Avoid carbonated drinks and overeating.",
    hindi: "इनो या साइमिथिकोन लें। कोल्ड ड्रिंक्स और अधिक खाना खाने से बचें।"
  },
  {
    keywords: ["heartburn", "सीने में जलन"],
    english: "Use Ranitidine or Pantoprazole. Avoid heavy meals late at night.",
    hindi: "रेनिटिडिन या पैंटोप्राज़ोल लें। रात में भारी भोजन न करें।"
  },
  {
    keywords: ["palpitations", "धड़कन तेज होना"],
    english: "Avoid caffeine and stress. Get your ECG and BP checked.",
    hindi: "कैफीन और तनाव से बचें। ईसीजी और बीपी की जांच करवाएं।"
  },
  {
    keywords: ["cold hands and feet", "ठंडे हाथ और पैर"],
    english: "Keep warm. Check for anemia or thyroid issues (consult a doctor).",
    hindi: "गर्म कपड़े पहनें। एनीमिया या थायरॉइड की जांच करवाएं (डॉक्टर से सलाह लें)।"
  },
  {
    keywords: ["blurred vision", "धुंधली दृष्टि"],
    english: "Rest your eyes and avoid screens. Visit an eye doctor if sudden or painful.",
    hindi: "आँखों को आराम दें और स्क्रीन से बचें। अगर अचानक या दर्द के साथ हो तो आंखों के डॉक्टर को दिखाएं।"
  },
  {
    keywords: ["dehydration", "निर्जलीकरण"],
    english: "Drink ORS, coconut water, or lemon water with salt and sugar.",
    hindi: "ओआरएस, नारियल पानी या नींबू पानी में नमक और चीनी मिलाकर पिएं।"
  },
  {
  keywords: ["bp", "blood pressure", "ब्लड प्रेशर", "बीपी", "हाई बीपी", "लो बीपी"],
  english: `Blood Pressure (BP) is the force of blood pushing against your artery walls. It helps your heart pump blood efficiently.

🔴 High BP (Hypertension) Symptoms:
- Headache
- Dizziness
- Blurry vision
- Chest pain

🔵 Low BP (Hypotension) Symptoms:
- Fatigue
- Fainting
- Cold hands/feet
- Confusion

💊 Advice:
- High BP: Take Amlodipine or Telmisartan (as prescribed).
- Low BP: Drink fluids, ORS, and lie down with feet elevated.

🫀 Tip: Regular BP monitoring is important to avoid stroke, heart attack, and kidney damage.`,
  hindi: `ब्लड प्रेशर (BP) आपके दिल से खून को शरीर में पंप करने का दबाव है।

🔴 हाई बीपी के लक्षण:
- सिरदर्द
- चक्कर
- धुंधली दृष्टि
- सीने में दर्द

🔵 लो बीपी के लक्षण:
- थकान
- बेहोशी
- ठंडे हाथ-पैर
- भ्रम

💊 सलाह:
- हाई BP: एम्लोडिपिन या टेल्मिसार्टन लें (डॉक्टर से पूछें)।
- लो BP: पानी, ओआरएस लें और पैर ऊपर करके लेटें।

🫀 टिप: नियमित BP जांच से स्ट्रोक, हार्ट अटैक और किडनी नुकसान से बचा जा सकता है।`
}

];



function processInput() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  addMessage(input, 'user');
  document.getElementById("userInput").value = "";

  const reminderMatch = input.match(/remind me to take (.+) at (\d{2}:\d{2})/i);
  if (reminderMatch) {
    const medicine = reminderMatch[1].trim();
    const time = reminderMatch[2];
    reminders.push({ medicine, time });
    addMessage(`✅ Reminder set for ${medicine} at ${time}.`, 'bot');
    return;
  }

  if (input.toLowerCase() === 'help') {
    addMessage("💬 You can:\n- Ask: I have \n- Set: Remind me to take Crocin at 15:00\n- Ask: I have fever", 'bot');
    return;
  }

  let found = false;
  for (const entry of symptomAdvice) {
    for (const keyword of entry.keywords) {
      if (input.toLowerCase().includes(keyword.toLowerCase())) {
        addMessage(`🩺 लक्षण / Symptom: ${keyword}\n💊 सलाह / Advice:\nEN: ${entry.english}\nHI: ${entry.hindi}`, 'bot');
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    addMessage("❓ Sorry, I didn’t understand. Try saying:\n👉 I have stomach pain\n👉 Remind me to take Paracetamol at 15:00", 'bot');
  }
}

function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");
  const message = document.createElement("div");
  message.className = sender === 'bot' ? 'bot-message' : 'user-message';
  message.innerText = text;
  chatbox.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight;
}

setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  reminders.forEach((reminder) => {
    if (reminder.time === currentTime) {
      addMessage(`⏰ Reminder: It's time to take your medicine: ${reminder.medicine}`, 'bot');
      alert(`⏰ Medicine time! Take: ${reminder.medicine}`);
    }
  });
}, 60000);

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('userInput');
  if (userInput) {
    userInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        processInput();
      }
    });
  }
});
 function handleCredentialResponse(response) {
  const user = jwt_decode(response.credential);
  console.log("User Info:", user);

  localStorage.setItem("medibotUser", JSON.stringify(user));
  window.location.href = "about.html"; // or home page
}


function addMessage(text, sender) {
  // Add to main chat window
  const chatbox = document.getElementById("chatbox");
  if (chatbox) {
    const message = document.createElement("div");
    message.className = sender === 'bot' ? 'bot-message' : 'user-message';
    message.innerText = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // Add to history section
  const chatHistory = document.getElementById("chat-history");
  const li = document.createElement("li");
  li.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "x";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(deleteBtn);
  chatHistory.appendChild(li);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
function clearHistory() {
  document.getElementById("chat-history").innerHTML = "";
}
