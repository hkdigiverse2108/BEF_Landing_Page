import type { BackendQuestionItem } from "./mockQuestionsData";

export interface MockTestSet {
  id: string;
  setNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  seriesTitle: string;
  subjectTitle: string;
  totalQuestions: number;
  totalMarks: number;
  durationSeconds: number; // in seconds (e.g. 900s = 15 mins)
  questions: BackendQuestionItem[];
}

/**
 * SET 1: Curated UPSC CSE Prelims PYQs & High-Yield Clones
 * Extracted and parsed 100% faithfully from Clone PYQs Free Mock Test.md
 */
export const MOCK_TEST_SET_1: MockTestSet = {
  id: "set-1",
  setNumber: 1,
  title: "UPSC CSE Prelims Mock Test – Set 1 (PYQs & Clones)",
  shortTitle: "Set 1 (12 PYQs & Clones)",
  description:
    "Official UPSC CSE PYQs and their high-yield Clones covering Ancient History, Polity, Geography, Environment, Art & Culture, and Agriculture.",
  seriesTitle: "Achiwon UPSC CSE Mock Series",
  subjectTitle: "UPSC Multi-Subject Prelims",
  totalQuestions: 12,
  totalMarks: 24,
  durationSeconds: 900, // 15 minutes
  questions: [
    // -------------------------------------------------------------------------
    // Question 1
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q1",
      questionType: "normal",
      subject: { name: "Ancient History" },
      subtopic: { name: "Vedic Period" },
      title: "Original PYQ (Pre- 2026)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question:
          "In which one among the following texts does the term kshetra-patni ('mistress of the field') originate ?",
        options: {
          A: "Rigveda",
          B: "Atharvaveda",
          C: "Ashtadhyayi",
          D: "Arthashastra",
        },
        answer: "B",
        solution: `#### 1. Detailed Solution

* *Kshetra-patni* (mistress of the field) is an Atharvaveda term, as per the answer key. It belongs to the world of agriculture, fertility of land and household rites.
* The Rigveda has the related masculine deity *Kshetrapati* (lord of the field), invoked for good crops. This is the confusing neighbour.
* The Atharvaveda is the fourth Veda, with about 20 kandas. It is full of charms, healing hymns and prayers for prosperity and domestic life. It is also called Brahmaveda and Bhaishajyaveda. Its two recensions are Shaunaka and Paippalada.

#### 2. MCQ Aptitude Technique: Intersection Method

* Two word-groups exist among the options. The first is **“Veda”**, which appears in Rigveda and Atharvaveda. The second is the **“Ath/Arth/Ashta”** sound group, which appears in Atharvaveda, Arthashastra and Ashtadhyayi.
* Atharvaveda is the only option that sits in **both** groups at once. It is the intersection.
* Rigveda belongs to only one group, and Ashtadhyayi and Arthashastra belong to only the other.
* **Rule: the correct option shares a part with more than one set of similar options.**

#### 3. Content of All Other Options

* **Rigveda:** Oldest Veda, 10 mandalas, 1,028 hymns. Early Vedic pastoral society. Gayatri Mantra (3.62), Purusha Sukta (10.90), Nadistuti Sukta. It has *kshetrapati*, which is masculine.
* **Ashtadhyayi:** Panini’s Sanskrit grammar, 8 chapters, about 4,000 sutras. It is a grammar text, not a religious one. It is also a source for the society and geography of c. 5th–4th century BCE.
* **Arthashastra:** Kautilya’s manual of statecraft, economy, law and diplomacy. It mentions *sita* (crown land) and land revenue. Its manuscript was found by R. Shamasastry in the early 1900s.

#### 4. Current Affairs Linkage (verify the latest status before using)

* Women farmers and women’s land rights (Mahila Kisan) link to the theme of women’s role in agriculture.
* Sanskrit and Vedic heritage promotion, such as UNESCO listings and heritage schemes, is a recurring news theme.`,
      },
      hindiQuestion: {
        question:
          "निम्नलिखित में से किस ग्रंथ में 'क्षेत्र-पत्नी' (खेत की स्वामिनी / mistress of the field) शब्द की उत्पत्ति हुई है?",
        options: {
          A: "ऋग्वेद",
          B: "अथर्ववेद",
          C: "अष्टाध्यायी",
          D: "अर्थशास्त्र",
        },
        answer: "B",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* 'क्षेत्र-पत्नी' शब्द अथर्ववेद से संबंधित है। यह कृषि, भूमि की उर्वरता और घरेलू अनुष्ठानों से जुड़ा हुआ है।
* ऋग्वेद में इससे संबंधित पुरुष देवता 'क्षेत्रपति' (खेत का स्वामी) का उल्लेख है, जिनकी अच्छी फसलों के लिए स्तुति की जाती थी।
* अथर्ववेद चौथा वेद है जिसमें लगभग 20 काण्ड हैं। इसमें रोग निवारण, समृद्धि और घरेलू जीवन से जुड़े मंत्र हैं। इसे ब्रह्मवेद और भैषज्यवेद भी कहा जाता है।

#### 2. बहुविकल्पीय योग्यता तकनीक: प्रतिच्छेदन विधि (Intersection Method)

* विकल्पों में दो शब्द-समूह हैं: पहला 'वेद' समूह (ऋग्वेद और अथर्ववेद) और दूसरा 'अथ/अर्थ/अष्टा' ध्वनि समूह (अथर्ववेद, अर्थशास्त्र और अष्टाध्यायी)।
* अथर्ववेद एकमात्र ऐसा विकल्प है जो दोनों समूहों में एक साथ आता है (Intersection)।
* नियम: सही विकल्प आमतौर पर समान विकल्पों के एक से अधिक समूहों के साथ समानता साझा करता है।

#### 3. अन्य सभी विकल्पों का विश्लेषण

* ऋग्वेद: सबसे प्राचीन वेद, 10 मंडल, 1,028 सूक्त। इसमें पुरुष देवता 'क्षेत्रपति' का उल्लेख है।
* अष्टाध्यायी: पाणिनी द्वारा रचित संस्कृत व्याकरण ग्रंथ (8 अध्याय, लगभग 4,000 सूत्र)।
* अर्थशास्त्र: कौटिल्य (चाणक्य) द्वारा रचित शासनकला, अर्थव्यवस्था और कूटनीति का ग्रंथ। इसमें 'सीता' (राजकीय भूमि) का उल्लेख है।

#### 4. समसामयिक संदर्भ (Current Affairs Linkage)

* महिला किसान और महिलाओं के भूमि अधिकार (महिला किसान सशक्तिकरण) कृषि में महिलाओं की भूमिका से जुड़े प्रमुख विषय हैं।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 2
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q2",
      questionType: "normal",
      subject: { name: "International Relation" },
      subtopic: { name: "India and its Neighbors" },
      title: "CLONE PYQ (Pre-2026)",
      cloneOf: "UPSC Prelims 2026 (kshetra-patni)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question:
          "The Wakhan Corridor, often mentioned in Central Asian geopolitics, is a narrow strip of land belonging to:",
        options: {
          A: "Tajikistan, touching the borders of Kyrgyzstan and Kazakhstan",
          B: "Pakistan, touching the borders of China and Tajikistan",
          C: "Afghanistan, touching the borders of China and Tajikistan",
          D: "Afghanistan, touching the borders of Iran and Turkmenistan",
        },
        answer: "C",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Why (c) is correct**

* The Wakhan Corridor is a narrow strip of land in northeastern Afghanistan, between China, Pakistan and Tajikistan. So it belongs to **Afghanistan**, and it touches **China and Tajikistan** (and also Pakistan). This makes (c) correct.
* It does not touch Iran or Turkmenistan. Those two border the western and north-western parts of Afghanistan, far from the corridor.

**Facts to remember**

* **Location:** Badakhshan province, north-east Afghanistan, in the Pamir, Hindu Kush and Karakoram region.
* **Size:** about 350 km long and only a few kilometres to a few tens of kilometres wide (sources give different widths, so avoid quoting an exact width).
* **Borders:** Tajikistan in the north, Pakistan (Gilgit-Baltistan and Khyber Pakhtunkhwa) in the south, and China (Xinjiang) at the eastern end. It connects to China through the Wakhjir Pass.
* **Special point:** It separates Tajikistan from Pakistan's Gilgit-Baltistan region (so Pakistan and Tajikistan share no border), and it is Afghanistan's only direct land link to China.
* **Origin:** a buffer between the Russian and British empires. The 1873 Anglo-Russian agreement recognised Badakhshan and the Wakhan Corridor as Afghan territory. It is often linked in notes with the Durand Line (1893), but they are different boundaries.
* **India link:** ThePrint reports that India and Afghanistan's foreign ministers acknowledged Wakhan as a contiguous neighbourhood in a joint statement. The idea is that India's claimed territory in PoK (Gilgit-Baltistan) touches Wakhan.
* **Afghanistan's neighbours (6):** Pakistan, Iran, Turkmenistan, Uzbekistan, Tajikistan, China.

**Study next:** a map of Afghanistan and its neighbours, the Pamir Knot, the Durand Line, CPEC, Gilgit-Baltistan, and India's connectivity to Central Asia (Chabahar, INSTC).

#### 2. MCQ Aptitude Technique: Intersection Method

**Clone of the Original PYQ: UPSC Prelims 2026 (kshetra-patni)**

Mark the parts that repeat across options:

* **Afghanistan** : options (c) and (d).
* **China and Tajikistan**: options (b) and (c).

Option (c) sits in the **intersection** of the repeating geographic elements, so it is the answer.

#### 3. Content of All Other Options

* **(a) Tajikistan, touching Kyrgyzstan and Kazakhstan:** Uzbekistan is a Central Asian country that borders Kazakhstan, Kyrgyzstan, Tajikistan, Afghanistan and Turkmenistan. The statement about its neighbours is correct, but the Wakhan Corridor is not Uzbek or Tajik territory, so the option is wrong.
* **(b) Pakistan, touching China and Tajikistan:** Pakistan does border China, but it does **not** border Tajikistan, because the Wakhan strip separates them. The Wakhan Corridor is also not Pakistani land.
* **(d) Afghanistan, touching Iran and Turkmenistan:** the first part is right. Afghanistan does border Iran (west) and Turkmenistan (north-west), but those are other parts of its border, **not** the Wakhan Corridor. This is the "half-right" option UPSC likes to use.

#### 4. Current Affairs Linkage

* **October 2026, Wakhan road to China:** Afghanistan opened a 121 km unpaved road through the Wakhan Corridor to the Chinese border in Xinjiang. Afghan engineers built it at a cost of about 365 million afghanis (around $5.5 million), and construction took two years.
* **May 2026, Afghanistan-China talks:** Afghanistan and China discussed Wakhan Corridor and infrastructure projects.
* **Why it matters (analysis):** Analysts discuss the corridor, through the Wakhjir Pass, as a possible trade route that competes with the China-Pakistan Economic Corridor (CPEC), with risks from instability and poor infrastructure. It could also reduce Afghanistan's dependence on Pakistan's transit routes.`,
      },
      hindiQuestion: {
        question:
          "मध्य एशियाई भू-राजनीति में अक्सर चर्चित रहने वाला 'वाखान गलियारा' (Wakhan Corridor), भूमि की एक संकरी पट्टी है जो किस देश से संबंधित है?",
        options: {
          A: "ताजिकिस्तान, जो किर्गिस्तान और कजाकिस्तान की सीमाओं को छूता है",
          B: "पाकिस्तान, जो चीन और ताजिकिस्तान की सीमाओं को छूता है",
          C: "अफगानिस्तान, जो चीन और ताजिकिस्तान की सीमाओं को छूता है",
          D: "अफगानिस्तान, जो ईरान और तुर्कमेनिस्तान की सीमाओं को छूता है",
        },
        answer: "C",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* वाखान गलियारा पूर्वोत्तर अफगानिस्तान (बदख्शां प्रांत) में स्थित एक संकरी भू-पट्टी है। यह अफगानिस्तान का हिस्सा है और उत्तर में ताजिकिस्तान, दक्षिण में पाकिस्तान (गिलगित-बाल्टिस्तान) और पूर्व में चीन (शिनजियांग) की सीमाओं को छूता है। अतः (c) सही उत्तर है।
* यह ईरान या तुर्कमेनिस्तान को नहीं छूता, जो अफगानिस्तान के पश्चिमी भाग में स्थित हैं।

#### 2. बहुविकल्पीय योग्यता तकनीक: प्रतिच्छेदन विधि (Intersection Method)

* 'अफगानिस्तान' विकल्प (c) और (d) दोनों में है।
* 'चीन और ताजिकिस्तान' विकल्प (b) और (c) दोनों में है।
* विकल्प (c) दोनों विशेषताओं के प्रतिच्छेदन (Intersection) पर आता है, अतः यह सही उत्तर है।

#### 3. अन्य विकल्पों का विश्लेषण

* (a) गलत है क्योंकि वाखान गलियारा ताजिकिस्तान का भूभाग नहीं है।
* (b) गलत है क्योंकि पाकिस्तान की सीमा ताजिकिस्तान से सीधे नहीं मिलती (वाखान उन्हें अलग करता है)।
* (d) अफगानिस्तान की सीमा ईरान व तुर्कमेनिस्तान से लगती तो है, लेकिन वाखान गलियारे के माध्यम से नहीं।

#### 4. समसामयिक संदर्भ

* वाखान गलियारे के माध्यम से चीन की सीमा (वाखजीर दर्रा) तक अफगानिस्तान द्वारा 121 किमी सड़क का निर्माण चर्चा में रहा है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 3
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q3",
      questionType: "normal",
      subject: { name: "Environment" },
      subtopic: { name: "International Organization" },
      title: "CLONE PYQ (Pre-2026)",
      cloneOf: "UPSC Prelims 2026 (kshetra-patni)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question:
          "The Coalition for Disaster Resilient Infrastructure (CDRI), a global partnership to make infrastructure resilient to disasters, was launched at:",
        options: {
          A: "The World Sustainable Development Summit 2019, New Delhi",
          B: "The UN Framework Convention on Climate Change 1992, Rio de Janeiro",
          C: "The UN Climate Change Conference (COP25) 2019, Madrid",
          D: "The UN Climate Action Summit 2019, New York",
        },
        answer: "D",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Why (d) is correct**

* At the UN Climate Action Summit in New York, PM Narendra Modi announced the launch of the Coalition for Disaster Resilient Infrastructure (CDRI). The coalition was formed on 23 September 2019.

**Facts to remember**

* **What it is:** a global multi-stakeholder partnership that works to make infrastructure systems (power, transport, telecom, water, health and education) resilient to disaster and climate risks.
* **Origin:** It was conceptualised through the International Workshops on Disaster Resilient Infrastructure (IWDRI) of 2018-19, organised by India's NDMA with UNDRR. India leads it, with support from UNDRR.
* **Headquarters:** New Delhi.
* **Members:** it is a mix of countries, UN agencies, multilateral development banks, the private sector and academia. The CDRI site shows over 57-60+ member countries and multilateral organizations.
* **Nodal body in India:** NDMA.
* **Governance:** Governing Council, Executive Committee and Secretariat.
* **Mission:** to drive US$10 trillion of infrastructure investment to be resilient to natural hazards and climate change by 2050.
* **Other India-led initiative:** the International Solar Alliance (ISA).

**Study next:** the Sendai Framework for Disaster Risk Reduction, UNDRR, NDMA, the International Solar Alliance, and other India-led global initiatives.

#### 2. MCQ Aptitude Technique: Intersection Method

**Clone of the Original PYQ: UPSC Prelims 2026 (kshetra-patni)**

**Mark the parts that repeat across options:**

* "UN": (b), (c), (d)
* "2019": (a), (c), (d)
* "New" (New Delhi, New York): (a), (d)
* "Summit": (a), (d)

Count the groups each option sits in: (d) = 4, (a) = 3, (c) = 2, (b) = 1. Option (d) sits in the most groups, so it is the intersection and the answer.

#### 3. Content of All Other Options

* **(a) World Sustainable Development Summit 2019, New Delhi:** an annual summit in New Delhi organised by TERI (The Energy and Resources Institute), earlier called the Delhi Sustainable Development Summit. It is about sustainability and climate, and CDRI was not launched there.
* **(b) UNFCCC 1992, Rio de Janeiro:** the UN Framework Convention on Climate Change was adopted at the 1992 Earth Summit (UN Conference on Environment and Development) in Rio. It came into force in 1994. CDRI came 27 years later.
* **(c) UN Climate Change Conference (COP25) 2019, Madrid:** the 25th Conference of the Parties to the UNFCCC, held in Madrid in December 2019 under Chile's presidency. It is the same year, but a different event from the September summit in New York.

#### 4. Current Affairs Linkage (within May 2025 to May 2027 window)

* **February 2026, ECOWAS joins:** The Economic Community of West African States (ECOWAS) officially joined CDRI on 17 February 2026.
* **September 2026, Philippines joins:** The Philippines officially joined CDRI on 12 September 2026.
* **Conference in New Delhi:** The 6th International Conference on Disaster Resilient Infrastructure (ICDRI) was held in New Delhi.
* **Why it matters:** these are signs of CDRI's growing membership and expanding global mandate.`,
      },
      hindiQuestion: {
        question:
          "आपदा प्रतिरोधी अवसंरचना गठबंधन (CDRI), जो बुनियादी ढांचे को आपदाओं के प्रति लचीला बनाने की एक वैश्विक साझेदारी है, का शुभारंभ कहाँ किया गया था?",
        options: {
          A: "विश्व सतत विकास शिखर सम्मेलन 2019, नई दिल्ली",
          B: "जलवायु परिवर्तन पर संयुक्त राष्ट्र फ्रेमवर्क कन्वेंशन 1992, रियो डी जनेरियो",
          C: "संयुक्त राष्ट्र जलवायु परिवर्तन सम्मेलन (COP25) 2019, मैड्रिड",
          D: "संयुक्त राष्ट्र जलवायु कार्रवाई शिखर सम्मेलन 2019, न्यूयॉर्क",
        },
        answer: "D",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* 23 सितंबर 2019 को न्यूयॉर्क में आयोजित संयुक्त राष्ट्र जलवायु कार्रवाई शिखर सम्मेलन (UN Climate Action Summit 2019) में प्रधानमंत्री नरेंद्र मोदी ने CDRI के शुभारंभ की घोषणा की थी।
* मुख्यालय: नई दिल्ली, भारत।
* नोडल निकाय: राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)।

#### 2. बहुविकल्पीय योग्यता तकनीक: प्रतिच्छेदन विधि (Intersection Method)

* 'UN': (b), (c), (d)
* '2019': (a), (c), (d)
* 'New' (New Delhi, New York): (a), (d)
* 'Summit': (a), (d)
* विकल्प (d) सबसे अधिक 4 समूहों में उपस्थित होकर प्रतिच्छेदन बनाता है, अतः यह सही उत्तर है।

#### 3. अन्य विकल्पों का विश्लेषण

* (a) TERI द्वारा आयोजित शिखर सम्मेलन है।
* (b) 1992 का पृथ्वी शिखर सम्मेलन है (27 वर्ष पूर्व)।
* (c) COP25 मैड्रिड में दिसंबर 2019 में आयोजित हुआ था।

#### 4. समसामयिक संदर्भ

* CDRI में ECOWAS और फिलीपींस जैसे नए सदस्यों का शामिल होना इसके बढ़ते वैश्विक प्रभाव को दर्शाता है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 4
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q4",
      questionType: "statement",
      subject: { name: "Polity & Gov." },
      subtopic: { name: "Legislature" },
      title: "Original PYQ (Pre-2018)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following statements:",
        statementQuestion: [
          {
            combined:
              "1. In the first Lok Sabha, the single largest party in the opposition was the Swatantra Party.",
          },
          {
            combined:
              "2. In the Lok Sabha, a “Leader of the Opposition” was recognised for the first time in 1969.",
          },
          {
            combined:
              "3. In the Lok Sabha, if a party does not have a minimum of 75 members, its leader cannot be recognised as the Leader of the Opposition.",
          },
        ],
        lastQuestion: "Which of the statements given above is/are correct?",
        options: {
          A: "1 and 3 only",
          B: "2 only",
          C: "2 and 3 only",
          D: "1, 2 and 3",
        },
        answer: "B",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Statement 1 is wrong.** The Swatantra Party was founded in 1959, so it could not exist in the first Lok Sabha (1952). The largest opposition party then was the Communist Party of India (CPI), with about 16 seats.

**Statement 2 is correct.** The Lok Sabha did not officially recognise a Leader of the Opposition until 1969. Before that there was only an unofficial opposition leader. Ram Subhag Singh of the Congress (O) is generally named as the first recognised LoP.

**Statement 3 is wrong.** The number is not 75. The usual rule is that a party needs at least 10% of the House's strength, which is about 55 seats in a 543-member Lok Sabha. In the 16th and 17th Lok Sabha, no opposition party had the required 10 per cent, so the post stayed vacant for 10 years. This 10% norm comes from Speaker's directions (the "Mavalankar rule"), not from the Constitution.

**Facts to remember**

* **Statutory recognition:** The post got statutory recognition through the Salary and Allowances of Leaders of Opposition in Parliament Act, 1977. The Act defines the LoP as the leader of the party in opposition with the greatest numerical strength, recognised by the Speaker or Rajya Sabha Chairman.
* **Rank and role:** equal to a Cabinet minister in status, and a member of key selection committees (for example, those for appointing Election Commissioners and the CBI Director).
* **Rule on numbers:** it is a convention, not a constitutional requirement. In 1984, with 415 members, the Congress denied the TDP (30 MPs) the post of LoP.
* **Recent change:** the 16th Lok Sabha (Congress 44) and 17th (Congress about 52) had no LoP. In the 18th Lok Sabha, Congress has 99 MPs and Rahul Gandhi became LoP.

**Study next:** the Salary and Allowances of Leaders of Opposition Act 1977, the role of the Speaker, committees where the LoP sits, the LoP in the Rajya Sabha, the shadow cabinet concept, and the first Lok Sabha's party positions.

#### 2. MCQ Aptitude Technique: Alike + Data

* **Alike method:** statements 2 and 3 both repeat "Leader of the Opposition". By rule, when two statements carry the same core phrase, one of them is compulsorily true and the other false.
* **Data method:** statement 3 contains a specific number ("minimum of 75 members"). A statement with altered data is usually incorrect, so mark statement 3 as incorrect.
* **Combine:** statement 3 is false, so by the Alike method statement 2 is true. Every option with statement 3 is eliminated (A, C and D). Only B (2 only) is left.
* **Bonus:** statement 1 never needs checking.

#### 3. Content of All Other Options

* **[A] 1 and 3 only:** wrong, because both statement 1 (Swatantra Party) and statement 3 (75 members) are false.
* **[C] 2 and 3 only:** wrong, because statement 3 gives the wrong number. The correct figure is 10% of the House (~55 seats).
* **[D] 1, 2 and 3:** wrong, because two of the three statements are false.

#### 4. Current Affairs Linkage (within May 2025 to May 2027 window)

* **Leader of Opposition in news:** Rahul Gandhi marked two years as Leader of the Opposition in the Lok Sabha in June 2026. His appointment in June 2024 ended a decade-long vacancy of the post during the 16th and 17th Lok Sabha.`,
      },
      hindiQuestion: {
        question: "निम्नलिखित कथनों पर विचार कीजिए:",
        statementQuestion: [
          {
            combined:
              "1. पहली लोकसभा में विपक्ष में सबसे बड़ा दल स्वतंत्र पार्टी था।",
          },
          {
            combined:
              "2. लोकसभा में पहली बार 1969 में 'विपक्ष के नेता' को आधिकारिक मान्यता दी गई थी।",
          },
          {
            combined:
              "3. लोकसभा में यदि किसी दल के पास कम से कम 75 सदस्य नहीं हैं, तो उसके नेता को विपक्ष के नेता के रूप में मान्यता नहीं दी जा सकती।",
          },
        ],
        lastQuestion: "उपर्युक्त कथनों में से कौन-सा/से सही है/हैं?",
        options: {
          A: "केवल 1 और 3",
          B: "केवल 2",
          C: "केवल 2 और 3",
          D: "1, 2 और 3",
        },
        answer: "B",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* कथन 1 गलत है: स्वतंत्र पार्टी की स्थापना 1959 में हुई थी। पहली लोकसभा (1952) में सबसे बड़ा विपक्षी दल भारतीय कम्युनिस्ट पार्टी (भाकपा / CPI) था, जिसके पास 16 सीटें थीं।
* कथन 2 सही है: लोकसभा में 1969 में पहली बार कांग्रेस (ओ) के डॉ. राम सुभग सिंह को विपक्ष के नेता के रूप में मान्यता मिली थी।
* कथन 3 गलत है: 75 सदस्यों की कोई शर्त नहीं है। मावलंकर नियम के अनुसार सदन की कुल सदस्य संख्या का कम से कम 10% (लगभग 55 सीटें) होना आवश्यक है।

#### 2. बहुविकल्पीय योग्यता तकनीक: सजातीय + सांख्यिकीय विधि (Alike + Data)

* सजातीय विधि: कथन 2 और 3 दोनों 'विपक्ष के नेता' पद पर केंद्रित हैं। जब दो कथन एक ही वाक्यांश पर केंद्रित हों, तो उनमें से एक सत्य और दूसरा असत्य होता है।
* सांख्यिकीय विधि: कथन 3 में एक विशिष्ट संख्या ("कम से कम 75 सदस्य") दी गई है। यूपीएससी अक्सर डेटा को बदलकर कथन गलत बनाता है।
* कथन 3 असत्य सिद्ध होने से A, C और D स्वतः बाहर हो जाते हैं, केवल विकल्प B बचता है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 5
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q5",
      questionType: "statement",
      subject: { name: "Indian Geography" },
      subtopic: { name: "Natural Vegetation" },
      title: "CLONE PYQ (Pre-2018)",
      cloneOf: "UPSC Prelims 2018 (Leader of the Opposition)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following statements:",
        statementQuestion: [
          {
            combined:
              "1. The Sundarbans mangrove forest is spread over both India and Bangladesh.",
          },
          {
            combined:
              "2. The Ganga-Brahmaputra Delta is the largest delta in the world.",
          },
          {
            combined:
              "3. India accounts for 75% of the Sundarbans mangrove area.",
          },
        ],
        lastQuestion: "Which of the statements given above is/are correct?",
        options: {
          A: "1 and 3 only",
          B: "2 only",
          C: "1 and 2 only",
          D: "1, 2 and 3",
        },
        answer: "C",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Statement 1 is correct.** The Sundarbans lies on the delta of the Ganga, Brahmaputra and Meghna rivers in the Bay of Bengal. The forest is shared by India (West Bengal) and Bangladesh.

**Statement 2 is correct.** The Ganga-Brahmaputra delta (also called the Bengal delta or Ganga-Brahmaputra-Meghna delta) is the largest delta in the world.

**Statement 3 is wrong.** India does not hold 75%. Roughly 60% of the Sundarbans is in Bangladesh and about 40% in India. This is the commonly quoted split.

**Study next:** the Sundarbans (India and Bangladesh), mangroves in India, delta types, Ramsar sites, UNESCO sites, cyclones in the Bay of Bengal, and Project Tiger.

#### 2. MCQ Aptitude Technique: Alike + Data

**Clone of the Original PYQ: UPSC Prelims 2018 (Leader of the Opposition)**

* **Alike method:** statements 1 and 3 both repeat "Sundarbans mangrove". By rule, one of them is compulsorily true and the other false.
* **Data method:** statement 3 contains data ("75%"), so mark it incorrect.
* **Combine:** statement 3 is false, so statement 1 is true. Options with 3 (A and D) are out, and option B (2 only) is out because statement 1 is true. Only C (1 and 2 only) is left.
* **Bonus:** the technique alone gives the answer without knowing anything about statement 2.

#### 3. Content of All Other Options

**Must-know Facts**

* **Share:** about 60% of the Sundarbans is in Bangladesh and about 40% in India.
* **Largest in the world:** it is the largest contiguous mangrove forest, and the Ganga-Brahmaputra delta is the largest delta.
* **Indian Sundarbans tags:** Tiger Reserve, Biosphere Reserve, UNESCO World Heritage Site, and a Ramsar site (the largest in India).
* **Mangroves in India:** West Bengal has the most, followed by Gujarat. Bhitarkanika (Odisha) is another Ramsar mangrove site.
* **Mangrove roots:** breathing roots (pneumatophores), stilt roots, and seeds that germinate on the tree (viviparous).

#### 4. Current Affairs Linkage

* **April 2026, microplastics:** IISER Kolkata researchers confirmed microplastics over the Sundarbans, the first such evidence in a protected Indian ecosystem.
* **September 2026, West Bengal plan:** West Bengal planned a Rs 1,000-crore Sundarbans makeover, with around 500 projects in blocks such as Gosaba, Sagar and Sandeshkhali.
* **Bangladesh side, 2026:** Bangladesh imposed a 3-month ban on visitors entering the Sundarbans to facilitate ecological regeneration.`,
      },
      hindiQuestion: {
        question: "निम्नलिखित कथनों पर विचार कीजिए:",
        statementQuestion: [
          {
            combined:
              "1. सुंदरबन मैंग्रोव वन भारत और बांग्लादेश दोनों में फैला हुआ है।",
          },
          {
            combined:
              "2. गंगा-ब्रह्मपुत्र डेल्टा विश्व का सबसे बड़ा डेल्टा है।",
          },
          {
            combined:
              "3. सुंदरबन मैंग्रोव क्षेत्र का 75% हिस्सा भारत में आता है।",
          },
        ],
        lastQuestion: "उपर्युक्त कथनों में से कौन-सा/से सही है/हैं?",
        options: {
          A: "केवल 1 और 3",
          B: "केवल 2",
          C: "केवल 1 और 2",
          D: "1, 2 और 3",
        },
        answer: "C",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* कथन 1 सही है: सुंदरबन मैंग्रोव वन भारत (पश्चिम बंगाल) और बांग्लादेश दोनों में फैला हुआ है।
* कथन 2 सही है: गंगा-ब्रह्मपुत्र-मेघना डेल्टा विश्व का सबसे बड़ा डेल्टा है।
* कथन 3 गलत है: सुंदरबन का लगभग 60% भाग बांग्लादेश में और केवल 40% भाग भारत में है।

#### 2. बहुविकल्पीय योग्यता तकनीक: सजातीय + सांख्यिकीय विधि (Alike + Data)

* सजातीय विधि: कथन 1 और 3 दोनों 'सुंदरबन' के भौगोलिक विस्तार पर केंद्रित हैं।
* सांख्यिकीय विधि: कथन 3 में मनमाना आंकड़ा ("75%") दिया गया है, जो कि गलत है।
* कथन 3 गलत होते ही विकल्प A, D बाहर हो गए और कथन 1 सही होने से B भी बाहर हो गया। केवल C (केवल 1 और 2) सही उत्तर है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 6
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q6",
      questionType: "statement",
      subject: { name: "Art & Culture" },
      subtopic: { name: "Sculptures" },
      title: "CLONE PYQ (Pre-2018)",
      cloneOf: "UPSC Prelims 2018 (Leader of the Opposition)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following statements:",
        statementQuestion: [
          {
            combined:
              "1. The Nataraja statue represents the cosmic dance of Shiva.",
          },
          {
            combined:
              "2. The Chola dynasty was known for bronze sculptures, including Nataraja.",
          },
          {
            combined:
              "3. 15 Chola-era Nataraja sculptures are displayed in museums worldwide.",
          },
        ],
        lastQuestion: "Which of the statements given above is/are correct?",
        options: {
          A: "1 and 3 only",
          B: "1 and 2 only",
          C: "2 and 3 only",
          D: "1, 2 and 3",
        },
        answer: "B",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Statement 1 is correct.** The Nataraja form shows Shiva as the Lord of Dance in his cosmic dance, the Ananda Tandava. Chola bronze Nataraja figures show four hands, holding the damaru (drum), agni (fire), one in abhaya mudra, and one pointing to the raised foot that symbolises liberation.

**Statement 2 is correct.** The bronzes made in the south under the Chola dynasty (about 850 to 1250) are among the most iconic examples of Indian art. Nataraja is the best-known Chola bronze.

**Statement 3 is wrong.** There is no such fixed number as "15". Museums across the world hold many more Chola bronzes, so a precise figure like this is a made-up detail. The Norton Simon Museum alone has four Nataraja figures, and a large Chola Nataraja is in the Rijksmuseum in the Netherlands.

**Study next:** Chola art and architecture, lost-wax bronze casting, the Great Living Chola Temples (UNESCO), and the return of looted antiquities.

#### 2. MCQ Aptitude Technique: Alike + Data

**Clone of the Original PYQ: UPSC Prelims 2018 (Leader of the Opposition)**

* **Alike method:** statements 1 and 3 repeat the same words ("Nataraja statue" and "Nataraja sculptures"). By rule, one of them is true and the other false.
* **Data method:** statement 3 has made-up specific data ("15"), so mark it incorrect.
* **Combine:** statement 3 is false, so statement 1 is true. Options with 3 (A, C and D) are eliminated. Only **B (1 and 2 only)** is left.

#### 3. Content of All Other Options

**Nataraja: key features to know**

* Dance form: Ananda Tandava. The dance is symbolic of the cosmic cycle of creation, preservation and destruction.
* Four arms, a ring of fire (prabhamandala) around the figure, and Shiva's foot on the dwarf demon of ignorance, Apasmara.
* The most famous Nataraja temple is at Chidambaram, Tamil Nadu.

**Chola art: key features to know**

* Chola bronzes are made by the lost-wax (cire perdue) method. Swamimalai in Tamil Nadu is a well-known centre.
* Chola temples: Brihadisvara (Thanjavur), Gangaikondacholapuram, Airavatesvara (Darasuram). These form the Great Living Chola Temples, a UNESCO World Heritage Site.

#### 4. Current Affairs Linkage

* **Smithsonian returns Chola bronzes:** On 28 January 2026, the Smithsonian announced it would return a Nataraja to India, along with a Somaskanda and a figure of the saint Sundarar with his consort Paravai. The Ministry of Culture announced the formal return of the antiquities in May 2026. The Nataraja is a Chola work from about 990 CE, originally from Thanjavur district.`,
      },
      hindiQuestion: {
        question: "निम्नलिखित कथनों पर विचार कीजिए:",
        statementQuestion: [
          {
            combined:
              "1. नटराज की प्रतिमा शिव के ब्रह्मांडीय नृत्य (आनंद तांडव) का प्रतिनिधित्व करती है।",
          },
          {
            combined:
              "2. चोल राजवंश नटराज सहित कांस्य मूर्तियों के लिए प्रसिद्ध था।",
          },
          {
            combined:
              "3. दुनिया भर के संग्रहालयों में चोल काल की 15 नटराज मूर्तियां प्रदर्शित हैं।",
          },
        ],
        lastQuestion: "उपर्युक्त कथनों में से कौन-सा/से सही है/हैं?",
        options: {
          A: "केवल 1 और 3",
          B: "केवल 1 और 2",
          C: "केवल 2 और 3",
          D: "1, 2 और 3",
        },
        answer: "B",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* कथन 1 सही है: नटराज प्रतिमा भगवान शिव के आनंद तांडव नृत्य को दर्शाती है, जो सृष्टि, संरक्षण और विनाश के चक्र का प्रतीक है।
* कथन 2 सही है: चोल काल (850-1250 ई.) अपनी उत्कृष्ट कांस्य मूर्तियों के लिए विश्व प्रसिद्ध था, जो 'लुप्त मोम तकनीक' (Lost-wax process / Cire perdue) से बनाई जाती थीं।
* कथन 3 गलत है: '15' की कोई निश्चित संख्या नहीं है। दुनिया भर के विभिन्न संग्रहालयों में अनेक चोल कांस्य मूर्तियां सुरक्षित हैं।

#### 2. बहुविकल्पीय योग्यता तकनीक: सजातीय + सांख्यिकीय विधि

* कथन 3 में दिया गया आंकड़ा ("15 मूर्तियां") परीक्षक द्वारा गढ़ा गया असत्य तथ्य है।
* कथन 3 के गलत होते ही A, C और D स्वतः बाहर हो जाते हैं, अतः B (केवल 1 और 2) सही उत्तर है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 7
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q7",
      questionType: "statement",
      subject: { name: "Modern History" },
      subtopic: { name: "Impact of European Rule on Indian Economy" },
      title: "Original PYQ ( Pre-25)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following fruits:",
        statementQuestion: [
          { combined: "I. Papaya" },
          { combined: "II. Pineapple" },
          { combined: "III. Guava" },
        ],
        lastQuestion:
          "How many of the above were introduced in India by the Portuguese in the sixteenth and seventeenth centuries?",
        options: {
          A: "Only one",
          B: "Only two",
          C: "All the three",
          D: "None",
        },
        answer: "C",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

All three fruits came to India from the Americas through the Portuguese. All three, papaya, pineapple and guava, were introduced to India by the Portuguese during the 16th and 17th centuries.

* **Papaya:** native to tropical America. Sources confirm introduction to India in the 16th or early 17th century.
* **Pineapple:** Pineapple cultivation was introduced to India by the Portuguese in 1548, brought from Brazil.
* **Guava:** native to tropical America, introduced by the Portuguese in the early 17th century.

**Background:** this is part of the Columbian Exchange, the movement of crops between the Americas and the Old World. Vasco da Gama reached Calicut in 1498, and the Portuguese took Goa in 1510 under Afonso de Albuquerque.

**Study next:** other crops brought by Europeans, the Portuguese in India (Goa, Cochin, Diu), and the Columbian Exchange.

#### 2. MCQ Aptitude Technique: List Method

* **The question gives a short list of names (papaya, pineapple, guava).**
* By the List Method, an examiner who builds a question from a list usually picks names from a real historical list on that theme. Here the real list is the fruits and crops the Portuguese brought, so all the names are correct.
* So the answer is (c) All the three.

#### 3. Content of All Other Options

* What the Portuguese brought: Potatoes, sweet potatoes, tobacco, pineapple, papaya, guava, cashew nuts, and chilli. They also introduced European grafting techniques in fruit trees.
* Native Indian fruits (not brought by Europeans): Mango, jackfruit, jamun, amla.

#### 4. Current Affairs Linkage

* No direct current affairs linkage for this static historical event, but agricultural history and the Columbian Exchange remain perennial UPSC Prelims themes.`,
      },
      hindiQuestion: {
        question: "निम्नलिखित फलों पर विचार कीजिए:",
        statementQuestion: [
          { combined: "I. पपीता (Papaya)" },
          { combined: "II. अनानास (Pineapple)" },
          { combined: "III. अमरूद (Guava)" },
        ],
        lastQuestion:
          "सोलहवीं और सत्रहवीं शताब्दी में पुर्तगालियों द्वारा उपर्युक्त में से कितने फल भारत में लाए गए थे?",
        options: {
          A: "केवल एक",
          B: "केवल दो",
          C: "तीनों",
          D: "कोई नहीं",
        },
        answer: "C",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* पपीता, अनानास और अमरूद तीनों ही फल उष्णकटिबंधीय अमेरिका (नई दुनिया) के मूल निवासी हैं और इन्हें कोलंबियन एक्सचेंज के तहत पुर्तगालियों द्वारा 16वीं और 17वीं शताब्दी में भारत लाया गया था।
* अनानास 1548 में ब्राजील से भारत लाया गया।
* अतः (c) तीनों सही उत्तर है।

#### 2. बहुविकल्पीय योग्यता तकनीक: सूची विधि (List Method)

* जब परीक्षक किसी ऐतिहासिक विषय (जैसे पुर्तगालियों द्वारा लाई गई फसलें) की सूची से नाम चुनता है, तो वे आमतौर पर प्रामाणिक सूची के ही भाग होते हैं। जब तक कोई स्पष्ट भारतीय मूल का फल (जैसे आम या जामुन) न हो, तब तक सभी नाम सही होते हैं।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 8
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q8",
      questionType: "statement",
      subject: { name: "Agriculture" },
      subtopic: { name: "Food Grains and Pulses" },
      title: "CLONE PYQ ( Pre-25)",
      cloneOf: "UPSC Prelims 2025 (Portuguese Crop List)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following crops:",
        statementQuestion: [
          { combined: "1. Pearl millet" },
          { combined: "2. Sorghum" },
          { combined: "3. Finger millet" },
        ],
        lastQuestion:
          "How many of the above are classified as nutri-cereals (millets)?",
        options: {
          A: "Only one",
          B: "Only two",
          C: "All three",
          D: "None",
        },
        answer: "C",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

All three crops are millets, officially notified by the Government of India as **nutri-cereals**. The nutri-cereals include sorghum (jowar), pearl millet (bajra), finger millet (ragi/mandua), and the minor millets: foxtail (kangani), proso (cheena), kodo, barnyard (sawa) and little millet (kutki). So pearl millet, sorghum and finger millet are all classified as nutri-cereals.

**Facts to remember**

* **Major millets:** sorghum (jowar), pearl millet (bajra), finger millet (ragi). The others are called minor or small millets.
* **Scheme:** The Department of Agriculture and Farmers Welfare runs a Sub-Mission on Nutri-Cereals (Millets) under the National Food Security Mission (NFSM) across 28 States and 2 UTs.
* **Production:** Bajra has the highest production in India, followed by jowar and ragi.
* **Nutrition:** Ragi is exceptionally rich in calcium, and bajra in iron and zinc.
* **Branding:** The Government of India brands millets as **"Shree Anna"**.

**Study next:** millets and their producing states, the NFSM sub-mission, kharif and rabi crops, and millets in PDS and POSHAN Abhiyaan.

#### 2. MCQ Aptitude Technique: List Method

**Clone of the Original PYQ: UPSC Prelims 2025 (Portuguese Crop List)**

* The question gives a list of three crop names (pearl millet, sorghum, finger millet).
* By the List Method, the examiner selects items from an authentic list on that theme. Here the real list is nutri-cereals, so all three are correct.
* Common-sense check: all three names contain "millet" or are the classic coarse grains (jowar, bajra, ragi).

#### 3. Content of All Other Options

* Non-nutri cereals: Wheat, rice, and maize are cereals, but NOT notified as nutri-cereals.

#### 4. Current Affairs Linkage

* **March 2026, Gujarat:** Gujarat Government organized "Shri Anna Mahotsav 2026" at Akota Stadium to promote millets.
* **Security forces diet:** Ministry of Home Affairs introduced 30 per cent millets in the daily meals of CAPF and NDRF personnel.`,
      },
      hindiQuestion: {
        question: "निम्नलिखित फसलों पर विचार कीजिए:",
        statementQuestion: [
          { combined: "1. बाजरा (Pearl millet)" },
          { combined: "2. ज्वार (Sorghum)" },
          { combined: "3. रागी / मडुआ (Finger millet)" },
        ],
        lastQuestion:
          "उपर्युक्त में से कितनी फसलों को पोषक-अनाज (nutri-cereals / मोटे अनाज) के रूप में वर्गीकृत किया गया है?",
        options: {
          A: "केवल एक",
          B: "केवल दो",
          C: "तीनों",
          D: "कोई नहीं",
        },
        answer: "C",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* भारत सरकार द्वारा बाजरा, ज्वार और रागी (फिंगर मिलेट) तीनों को आधिकारिक तौर पर 'पोषक-अनाज' (Nutri-cereals / श्री अन्न) के रूप में अधिसूचित किया गया है।
* बाजरा आयरन और जिंक से भरपूर है, जबकि रागी में प्रचुर मात्रा में कैल्शियम होता है।
* अतः (c) तीनों सही उत्तर है।

#### 2. बहुविकल्पीय योग्यता तकनीक: सूची विधि (List Method)

* यह तीनों फसलें भारत के तीन प्रमुख मोटे अनाज हैं और पोषण सुरक्षा मिशन के तहत 'पोषक-अनाज' की मूल सूची का हिस्सा हैं।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 9
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q9",
      questionType: "statement",
      subject: { name: "Agriculture" },
      subtopic: { name: "Major Crops & Cropping Patterns" },
      title: "CLONE PYQ ( Pre-25)",
      cloneOf: "UPSC Prelims 2025 (Portuguese Crop List)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following plants:",
        statementQuestion: [
          { combined: "1. Chickpea" },
          { combined: "2. Lentil" },
          { combined: "3. Pigeon pea" },
        ],
        lastQuestion:
          "How many of the above belong to the pulse crop category?",
        options: {
          A: "Only one",
          B: "Only two",
          C: "All three",
          D: "None",
        },
        answer: "C",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**All three are pulses.**

* **Chickpea (chana, gram):** a rabi pulse and the largest produced pulse in India (accounting for ~47% of total pulse production).
* **Lentil (masoor):** a rabi pulse.
* **Pigeon pea (tur, arhar, red gram):** a major kharif pulse (accounting for ~15% of pulse production).

**Facts to remember**

* **Common naming pairs:** chickpea = chana = Bengal gram; pigeon pea = tur = arhar = red gram; lentil = masoor; green gram = moong; black gram = urad.
* **Pulses vs oilseeds:** pulses are legume crops harvested exclusively for dry grain. Soybean and groundnut are botanical legumes but economically classified as **oilseeds**.
* **Soil benefit:** pulses fix atmospheric nitrogen through root nodules (*Rhizobium* bacteria), improving soil fertility and making them ideal for crop rotation.
* **India's position:** India is the world's largest producer, consumer, and importer of pulses.

#### 2. MCQ Aptitude Technique: List Method

**Clone of the Original PYQ: UPSC Prelims 2025 (Portuguese Crop List)**

* The question gives a list of three crop plants (chickpea, lentil, pigeon pea).
* Under the List Method, all three belong squarely to the pulse family (leguminosae/fabaceae family dry grains).
* Therefore, the answer is (c) All three.

#### 3. Content of All Other Options

* Crops that are NOT pulses: Soybean (oilseed), Groundnut (oilseed), Mustard (oilseed).

#### 4. Current Affairs Linkage

* **Mission for Aatmanirbharta in Pulses:** Launched by PM Narendra Modi with an outlay of Rs 11,440 crore for 2025-26 to 2030-31.
* **Focus crops of the Mission:** Tur (pigeon pea), urad (black gram), and masoor (lentil) with assured 4-year procurement at Minimum Support Price (MSP).`,
      },
      hindiQuestion: {
        question: "निम्नलिखित पौधों पर विचार कीजिए:",
        statementQuestion: [
          { combined: "1. चना (Chickpea)" },
          { combined: "2. मसूर (Lentil)" },
          { combined: "3. अरहर / तूर (Pigeon pea)" },
        ],
        lastQuestion:
          "उपर्युक्त में से कितने दलहनी फसल (pulse crop) श्रेणी के अंतर्गत आते हैं?",
        options: {
          A: "केवल एक",
          B: "केवल दो",
          C: "तीनों",
          D: "कोई नहीं",
        },
        answer: "C",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* चना (रबी), मसूर (रबी) और अरहर/तूर (खरीफ) तीनों ही प्रमुख दलहनी फसलें हैं।
* चना भारत में कुल दलहन उत्पादन का सबसे बड़ा हिस्सा (~47%) है।
* दलहनी फसलें राइजोबियम जीवाणु द्वारा वायुमंडलीय नाइट्रोजन का स्थिरीकरण कर मिट्टी की उर्वरता बढ़ाती हैं।
* अतः (c) तीनों सही उत्तर है।

#### 2. बहुविकल्पीय योग्यता तकनीक: सूची विधि (List Method)

* तीनों फसलें दलहन की मानक श्रेणी में आती हैं। सोयाबीन और मूंगफली को दलहन के बजाय तिलहन में वर्गीकृत किया जाता है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 10
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q10",
      questionType: "statement",
      subject: { name: "Indian Geography" },
      subtopic: { name: "Drainage System – Rivers and Lakes" },
      title: "Original PYQ (Pre-23)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following statements:",
        statementQuestion: [
          { combined: "1. Jhelum River passes through Wular Lake." },
          { combined: "2. Krishna River directly feeds Kolleru Lake." },
          { combined: "3. Meandering of Gandak River formed Kanwar Lake." },
        ],
        lastQuestion: "How many of the statements given above are correct?",
        options: {
          A: "Only one",
          B: "Only two",
          C: "All three",
          D: "None",
        },
        answer: "A",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Statement 1 is correct.** The Jhelum River flows through Wular Lake in Jammu and Kashmir (Bandipora district). Wular Lake is the largest freshwater lake in India and has a tectonic origin.

**Statement 2 is wrong.** The Krishna River does not directly feed Kolleru Lake. Kolleru Lake is a natural wetland situated between the Godavari and Krishna river basins, fed primarily by seasonal streams (Budameru and Tammileru) and irrigation drainage canals.

**Statement 3 is wrong.** Kanwar Lake (Kabartal) in Begusarai, Bihar, is an oxbow lake formed by the meandering of the **Burhi Gandak** River, not the Gandak River. It is Asia's largest freshwater oxbow lake and Bihar's first Ramsar site (2020).

**Study next:** Ramsar sites in India, lake types by origin (tectonic, oxbow, lagoon, crater), the Jhelum and Indus basin, and the Burhi Gandak.

#### 2. MCQ Aptitude Technique: Triplate pattern

* All three statements follow an identical structural pattern: a **river** paired with a **lake** (Jhelum - Wular, Krishna - Kolleru, Gandak - Kanwar).
* Under the Triplate pattern rule for statement-based questions, when all 3 statements follow the same associative template, examiners typically make 2 statements flawed and only **one** statement completely accurate.
* Therefore, the answer is **(a) Only one**.

#### 3. Content of All Other Options

* **Wular Lake (J&K):** Ramsar site since 1990, shallow tectonic lake in Jhelum floodplain.
* **Kolleru Lake (Andhra Pradesh):** Ramsar site (2002), wildlife sanctuary, habitat for spot-billed pelicans.
* **Kanwar / Kabartal (Bihar):** Oxbow lake formed by Burhi Gandak river.

#### 4. Current Affairs Linkage

* **Ramsar milestones in India:** India crossed 100+ Ramsar wetland sites, including Patna Bird Sanctuary, Chhari-Dhand (Gujarat), and Glaw Lake (Arunachal Pradesh). Bihar now houses multiple Ramsar sites including Kanwar Jheel.`,
      },
      hindiQuestion: {
        question: "निम्नलिखित कथनों पर विचार कीजिए:",
        statementQuestion: [
          { combined: "1. झेलम नदी वूलर झील से होकर गुजरती है।" },
          { combined: "2. कृष्णा नदी सीधे कोलेरू झील को जल प्रदान करती है।" },
          { combined: "3. गंडक नदी के विसर्पण (meandering) से कंवर झील का निर्माण हुआ है।" },
        ],
        lastQuestion: "उपर्युक्त कथनों में से कितने सही हैं?",
        options: {
          A: "केवल एक",
          B: "केवल दो",
          C: "सभी तीन",
          D: "कोई नहीं",
        },
        answer: "A",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* कथन 1 सही है: झेलम नदी जम्मू-कश्मीर में वूलर झील से होकर बहती है।
* कथन 2 गलत है: कोलेरू झील कृष्णा और गोदावरी डेल्टा के बीच स्थित है और इसे मुख्य रूप से बुडामेरू और तम्मीलेरू मौसमी नदियां पोषित करती हैं, न कि कृष्णा नदी सीधे।
* कथन 3 गलत है: बिहार के बेगूसराय में स्थित कंवर झील (काबरताल) 'बूढ़ी गंडक' नदी के विसर्पण से बनी गोखुर झील (Oxbow lake) है, न कि गंडक नदी से।
* अतः केवल कथन 1 सही होने से उत्तर (a) केवल एक है।

#### 2. बहुविकल्पीय योग्यता तकनीक: ट्रिप्लेट पैटर्न (Triplate pattern)

* तीनों कथन नदी और झील के जोड़े के समान पैटर्न पर आधारित हैं। ऐसे प्रश्नों में आमतौर पर केवल एक ही कथन सही होता है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 11
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q11",
      questionType: "statement",
      subject: { name: "Art & Culture" },
      subtopic: { name: "Temple Architecture" },
      title: "CLONE PYQ (Pre-23)",
      cloneOf: "UPSC Prelims 2023 (River-Lake Triplate)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question: "Consider the following statements about “Temples”:",
        statementQuestion: [
          { combined: "1. Brihadisvara Temple is located in Hampi." },
          { combined: "2. Lingaraj Temple is dedicated to Lord Vishnu." },
          { combined: "3. Meenakshi Temple is situated in Madurai." },
        ],
        lastQuestion: "How many of the above statements are correct?",
        options: {
          A: "Only one",
          B: "Only two",
          C: "All three",
          D: "None",
        },
        answer: "A",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Statement 1 is wrong.** The Brihadisvara Temple is located in Thanjavur, Tamil Nadu (built by Chola King Rajaraja I), not in Hampi. Famous temples in Hampi (Karnataka) are the Virupaksha Temple and Vijaya Vitthala Temple (famous for the stone chariot), built during the Vijayanagara Empire.

**Statement 2 is wrong.** The Lingaraj Temple in Bhubaneswar, Odisha, is dedicated to Lord Shiva, worshipped in the composite form of **Harihara** (half Shiva, half Vishnu), but canonically classified as a prominent Shiva temple of Kalinga architecture.

**Statement 3 is correct.** The Meenakshi Sundareswarar Temple is located in Madurai, Tamil Nadu, dedicated to Goddess Meenakshi (Parvati) and Sundareswarar (Shiva). It is celebrated for its towering gopurams and Hall of 1000 Pillars, substantially expanded under the Madurai Nayaka dynasty.

**Study next:** major temple architectural styles (Nagara, Dravida, Vesara), UNESCO World Heritage Chola temples, and Vijayanagara architecture.

#### 2. MCQ Aptitude Technique: Triplate pattern

**Clone of the Original PYQ: UPSC Prelims 2023 (River-Lake Triplate)**

* All three statements follow an identical associative pattern: a **Temple** linked to a **Location or Deity** (Brihadisvara - Hampi, Lingaraj - Vishnu, Meenakshi - Madurai).
* Under the Triplate pattern, only one statement is factually uncorrupted.
* Therefore, the answer is **(a) Only one**.

#### 3. Content of All Other Options

* **Brihadisvara (Thanjavur):** Dravida style masterpiece, UNESCO World Heritage Site (Great Living Chola Temples).
* **Lingaraj (Bhubaneswar):** 11th century Nagara (Kalinga) style temple with deula, jagamohana, natamandira, and bhogmandapa.
* **Hampi temples:** Vitthala and Virupaksha temples constructed under Deva Raya II and Krishnadevaraya of Vijayanagara.

#### 4. Current Affairs Linkage

* **Gangaikonda Cholapuram & Chola Heritage:** Commemorative events and coins honoring Rajendra Chola I's naval expedition to Southeast Asia and the Chola grand temple architectural legacy.`,
      },
      hindiQuestion: {
        question: "प्रमुख 'मंदिरों' के संबंध में निम्नलिखित कथनों पर विचार कीजिए:",
        statementQuestion: [
          { combined: "1. बृहदेश्वर मंदिर हम्पी में स्थित है।" },
          { combined: "2. लिंगराज मंदिर भगवान विष्णु को समर्पित है।" },
          { combined: "3. मीनाक्षी मंदिर मदुरै में स्थित है।" },
        ],
        lastQuestion: "उपर्युक्त कथनों में से कितने सही हैं?",
        options: {
          A: "केवल एक",
          B: "केवल दो",
          C: "सभी तीन",
          D: "कोई नहीं",
        },
        answer: "A",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* कथन 1 गलत है: बृहदेश्वर मंदिर तंजावुर (तमिलनाडु) में स्थित है, जिसे चोल सम्राट राजराज प्रथम ने बनवाया था। हम्पी में विरूपाक्ष और विट्ठल मंदिर स्थित हैं।
* कथन 2 गलत है: भुवनेश्वर (ओडिशा) का प्रसिद्ध लिंगराज मंदिर भगवान शिव (हरिहर रूप) को समर्पित है, केवल विष्णु को नहीं।
* कथन 3 सही है: मीनाक्षी सुंदरेश्वर मंदिर मदुरै (तमिलनाडु) में वैगई नदी के तट पर स्थित है।
* अतः केवल कथन 3 सही होने से उत्तर (a) केवल एक है।

#### 2. बहुविकल्पीय योग्यता तकनीक: ट्रिप्लेट पैटर्न (Triplate pattern)

* मंदिर और स्थान/देवता के समान प्रारूप वाले तीन कथनों में केवल एक कथन सही है।`,
      },
    },

    // -------------------------------------------------------------------------
    // Question 12
    // -------------------------------------------------------------------------
    {
      _id: "pyq-set1-q12",
      questionType: "statement",
      subject: { name: "Polity & Gov." },
      subtopic: { name: "Commission & Committees" },
      title: "CLONE PYQ (Pre-23)",
      cloneOf: "UPSC Prelims 2023 (River-Lake Triplate)",
      positiveMarks: 2,
      negativeMarks: 0.67,
      englishQuestion: {
        question:
          "Consider the following statements related to “Committees”:",
        statementQuestion: [
          {
            combined:
              "1. Rajamannar Committee was related to the education reforms.",
          },
          {
            combined:
              "2. Sarkaria Committee dealt with Centre-State relations.",
          },
          {
            combined:
              "3. Balwantrai Mehta Committee led to the creation of the Finance Commission.",
          },
        ],
        lastQuestion: "How many of the above statements are correct?",
        options: {
          A: "Only one",
          B: "Only two",
          C: "All three",
          D: "None",
        },
        answer: "A",
        solution: `#### 1. Detailed Solution to prepare for next UPSC cycle

**Statement 1 is wrong.** The Rajamannar Committee (1969) was set up by the Government of Tamil Nadu under Dr. P. V. Rajamannar to examine **Centre-State relations and suggest state autonomy**, not education reforms.

**Statement 2 is correct.** The Sarkaria Commission (appointed in 1983, report submitted in 1988) headed by retired Supreme Court Justice R. S. Sarkaria dealt comprehensively with Centre-State relations.

**Statement 3 is wrong.** The Balwantrai Mehta Committee (appointed in 1957) submitted recommendations on democratic decentralization, leading to the creation of the three-tier **Panchayati Raj** system (first inaugurated at Nagaur, Rajasthan in 1959). It had nothing to do with creating the Finance Commission, which is a constitutional body established directly under Article 280 (first formed in 1951 under K.C. Neogy).

**Study next:** Centre-State relations commissions (Rajamannar, Sarkaria, Punchhi), Panchayati Raj committees (Balwantrai Mehta, Ashok Mehta, GVK Rao, LM Singhvi), and Finance Commission constitutional mandate.

#### 2. MCQ Aptitude Technique: Triplate pattern

**Clone of the Original PYQ: UPSC Prelims 2023 (River-Lake Triplate)**

* All three statements follow the same associative template: a **Committee** linked to a **Subject** (Rajamannar - Education, Sarkaria - Centre-State, Balwantrai Mehta - Finance Commission).
* Under the Triplate pattern rule, only one statement is correctly paired while the other two carry swapped themes.
* Therefore, the answer is **(a) Only one**.

#### 3. Content of All Other Options

* **Rajamannar Committee (1969):** Recommended greater financial resources to states, Inter-State Council under Article 263, and curtailment of Article 356.
* **Sarkaria Commission (1983-88):** Recommended establishing the permanent Inter-State Council (set up 1990) and treating Article 356 strictly as a measure of last resort.
* **Finance Commission:** Constitutional body under Article 280, recommendations submitted to the President and tabled in Parliament under Article 281.

#### 4. Current Affairs Linkage

* **16th Finance Commission:** Headed by Dr. Arvind Panagariya, covering the devolution period 2026-27 to 2030-31.
* Constitutional basis: Article 280 (constitution of Finance Commission) and Article 281 (recommendations laid before each House of Parliament).`,
      },
      hindiQuestion: {
        question:
          "विभिन्न 'समितियों एवं आयोगों' से संबंधित निम्नलिखित कथनों पर विचार कीजिए:",
        statementQuestion: [
          {
            combined:
              "1. राजमन्नार समिति शिक्षा सुधारों से संबंधित थी।",
          },
          {
            combined:
              "2. सरकारिया आयोग केंद्र-राज्य संबंधों से संबंधित था।",
          },
          {
            combined:
              "3. बलवंतराय मेहता समिति के कारण वित्त आयोग का गठन हुआ।",
          },
        ],
        lastQuestion: "उपर्युक्त कथनों में से कितने सही हैं?",
        options: {
          A: "केवल एक",
          B: "केवल दो",
          C: "सभी तीन",
          D: "कोई नहीं",
        },
        answer: "A",
        solution: `#### 1. विस्तृत समाधान (Detailed Solution)

* कथन 1 गलत है: तमिलनाडु सरकार द्वारा 1969 में गठित डॉ. पी. वी. राजमन्नार समिति 'केंद्र-राज्य संबंधों और राज्यों की स्वायत्तता' से संबंधित थी, शिक्षा से नहीं।
* कथन 2 सही है: न्यायमूर्ति आर. एस. सरकारिया की अध्यक्षता में 1983 में गठित सरकारिया आयोग केंद्र-राज्य संबंधों से संबंधित था।
* कथन 3 गलत है: 1957 की बलवंतराय मेहता समिति ने त्रि-स्तरीय 'पंचायती राज व्यवस्था' की सिफारिश की थी। वित्त आयोग एक संवैधानिक निकाय है (अनुच्छेद 280), जिसका गठन 1951 में हुआ था।
* अतः केवल कथन 2 सही है, उत्तर (a) केवल एक है।

#### 2. बहुविकल्पीय योग्यता तकनीक: ट्रिप्लेट पैटर्न (Triplate pattern)

* समिति और विषय के जोड़े वाले तीन कथनों में केवल एक कथन सही है।`,
      },
    },
  ],
};

/**
 * All Available Mock Test Sets.
 * Currently contains Set 1 (12 PYQs & Clones).
 * When Set 2, Set 3, etc. are added, they simply get appended here.
 */
export const MOCK_TEST_SETS: MockTestSet[] = [MOCK_TEST_SET_1];

/**
 * Pick a random set from available mock test sets
 */
export const getRandomMockTestSet = (): MockTestSet => {
  if (MOCK_TEST_SETS.length === 0) return MOCK_TEST_SET_1;
  const randomIndex = Math.floor(Math.random() * MOCK_TEST_SETS.length);
  return MOCK_TEST_SETS[randomIndex];
};

/**
 * Find a mock test set by id, fallback to random
 */
export const getMockTestSetById = (id?: string | null): MockTestSet => {
  if (!id) return getRandomMockTestSet();
  const found = MOCK_TEST_SETS.find((s) => s.id === id);
  return found || MOCK_TEST_SETS[0];
};

/**
 * Get or initialize active mock test set for the current user session
 */
export const getActiveSessionMockTestSet = (): MockTestSet => {
  try {
    const savedId = sessionStorage.getItem("mock_test_active_set_id");
    if (savedId) {
      const match = MOCK_TEST_SETS.find((s) => s.id === savedId);
      if (match) return match;
    }
    const chosen = getRandomMockTestSet();
    sessionStorage.setItem("mock_test_active_set_id", chosen.id);
    return chosen;
  } catch {
    return MOCK_TEST_SET_1;
  }
};

/**
 * Reset active session set and pick a fresh random one (e.g. for retakes)
 */
export const resetSessionMockTestSet = (): MockTestSet => {
  try {
    const fresh = getRandomMockTestSet();
    sessionStorage.setItem("mock_test_active_set_id", fresh.id);
    return fresh;
  } catch {
    return MOCK_TEST_SET_1;
  }
};
