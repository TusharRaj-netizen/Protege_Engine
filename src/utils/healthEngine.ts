/**
 * Lightweight offline health-knowledge engine for MediBot's voice assistant.
 * Returns a helpful, plain-language answer for common senior health questions.
 * No external API key required — keeps the app fully functional offline.
 */

export interface KBMatch {
  keywords: string[];
  answer: string;
}

const KNOWLEDGE_BASE: KBMatch[] = [
  {
    keywords: ['fever', 'temperature', 'high temp'],
    answer:
      'For a mild fever in adults: rest, drink plenty of fluids, and stay cool. A fever above 103F (39.4C), one lasting more than 3 days, or with chest pain, breathing trouble, or confusion needs urgent medical care. Do NOT give aspirin to seniors on blood thinners without asking a doctor.',
  },
  {
    keywords: ['blood pressure', 'bp', 'hypertension', 'high bp'],
    answer:
      'Normal blood pressure is around 120/80 mmHg. For seniors, a reading above 140/90 may need attention. Reduce salt, stay active, manage stress, and take BP medicines at the same time daily. Seek urgent care for a reading above 180/120 with chest pain, vision changes, or severe headache.',
  },
  {
    keywords: ['sugar', 'diabetes', 'glucose', 'blood sugar'],
    answer:
      'A fasting blood sugar of 70-100 mg/dL is normal. Above 126 mg/dL fasting suggests diabetes. Eat balanced meals, limit sweets, walk daily, and never skip diabetes medicine. Signs of low sugar (shakiness, sweating, confusion) need fast-acting sugar like juice or candy right away.',
  },
  {
    keywords: ['chest pain', 'heart attack', 'heart pain'],
    answer:
      'Chest pain can be serious. Call emergency services (SOS) immediately if you feel crushing chest pain, pain spreading to the arm/jaw, shortness of breath, cold sweat, or nausea. While waiting: sit down, stay calm, loosen tight clothing, and chew an aspirin only if your doctor has told you to keep one for emergencies.',
  },
  {
    keywords: ['cough', 'cold', 'sore throat', 'flu'],
    answer:
      'For a common cold: rest, warm fluids, and steam help. Most colds clear in 7-10 days. See a doctor if you have a high fever, breathing trouble, cough lasting over 2 weeks, or coughing up blood. Seniors should get the yearly flu vaccine.',
  },
  {
    keywords: ['sleep', 'insomnia', 'cannot sleep'],
    answer:
      'To sleep better: keep a regular bedtime, avoid daytime naps over 30 minutes, limit caffeine after noon, and get morning sunlight. Avoid screens before bed. Long-term sleeping pills can cause falls in seniors - talk to a doctor before using them.',
  },
  {
    keywords: ['joint', 'arthritis', 'knee pain', 'back pain'],
    answer:
      'For joint and back pain: gentle stretching, warm compresses, and low-impact exercise like walking or swimming help. Maintain a healthy weight to reduce strain. See a doctor for sudden severe pain, swelling, redness, or pain after a fall.',
  },
  {
    keywords: ['fall', 'dizzy', 'dizziness', 'fell down'],
    answer:
      'Falls are a top risk for seniors. If you fell: stay calm, check for injuries before moving, and call for help if you cannot get up safely. Prevent falls by removing rugs, using grab bars, improving lighting, and reviewing medicines that cause dizziness with your doctor.',
  },
  {
    keywords: ['medication', 'medicine', 'pills', 'tablet', 'drug'],
    answer:
      'Take medicines exactly as prescribed. Keep a list of all your medicines and doses. Never stop a medicine suddenly without asking your doctor. Set reminders (MediBot can do this!), store medicines safely, and tell your doctor about any side effects.',
  },
  {
    keywords: ['water', 'dehydration', 'thirst'],
    answer:
      'Seniors often feel less thirsty but still need fluids. Aim for 6-8 glasses of water a day unless your doctor says otherwise. Signs of dehydration include dark urine, dizziness, dry mouth, and confusion. Sip water through the day rather than waiting until thirsty.',
  },
  {
    keywords: ['diet', 'food', 'nutrition', 'eat'],
    answer:
      'A senior-friendly diet: plenty of vegetables, fruits, whole grains, lean protein (fish, beans, eggs), and low-fat dairy. Limit salt, sugar, and fried foods. Eat enough fiber to prevent constipation, and get calcium and vitamin D for bone strength.',
  },
  {
    keywords: ['memory', 'forget', 'dementia', 'alzheimer'],
    answer:
      'Some forgetfulness is normal with age. Concerning signs include forgetting recent events, getting lost in familiar places, or trouble with familiar tasks. Keep a daily routine, write reminders, stay socially active, and see a doctor for memory problems that affect daily life.',
  },
];

const GREETINGS = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon'];

export function getHealthAnswer(question: string): string {
  const q = question.toLowerCase().trim();

  if (GREETINGS.some((g) => q === g || q.startsWith(g + ' ') || q.startsWith(g + ','))) {
    return "Hello! I'm MediBot, your health assistant. You can ask me about fever, blood pressure, diabetes, chest pain, sleep, falls, medicines, and more. How can I help you today?";
  }

  if (q.includes('thank')) {
    return "You're welcome! Stay healthy and take care. Remember, I'm here whenever you need quick guidance.";
  }

  if (q.includes('help') && q.length < 20) {
    return 'I can help with common health questions like fever, blood pressure, sugar, chest pain, cough, sleep, joint pain, falls, medicines, hydration, diet, and memory. Just tell me what is bothering you.';
  }

  let best: KBMatch | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) {
    return (
      best.answer +
      '\n\nThis is general guidance, not a diagnosis. Please consult your doctor for personal advice.'
    );
  }

  return "I'm not sure about that one yet. I can help with topics like fever, blood pressure, diabetes, chest pain, cold/cough, sleep, joint pain, falls, medicines, hydration, diet, and memory. Could you describe your symptom in a different way? For emergencies, press the SOS button.";
}