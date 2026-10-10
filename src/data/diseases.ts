export interface Disease {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  causes: string;
  prevention: string[];
  treatment: string;
  severity: 'Low' | 'Moderate' | 'High';
}

export const DISEASES: Disease[] = [
  {
    id: 'hypertension',
    name: 'High Blood Pressure (Hypertension)',
    category: 'Heart & Circulation',
    severity: 'High',
    symptoms: [
      'Often no symptoms (silent)',
      'Headaches',
      'Dizziness',
      'Shortness of breath',
      'Nosebleeds',
    ],
    causes:
      'Narrowed arteries, high salt diet, stress, lack of exercise, family history, and aging.',
    prevention: [
      'Reduce salt intake',
      'Exercise regularly (walking 30 min/day)',
      'Maintain healthy weight',
      'Limit alcohol',
      'Manage stress',
      'Take medicines as prescribed',
    ],
    treatment:
      'Lifestyle changes plus medicines such as diuretics, ACE inhibitors, or calcium channel blockers. Monitor BP regularly at home.',
  },
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    category: 'Metabolic',
    severity: 'High',
    symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing'],
    causes: 'Body becomes resistant to insulin or produces too little, often linked to weight, diet, and aging.',
    prevention: [
      'Eat balanced low-sugar meals',
      'Stay active daily',
      'Maintain healthy weight',
      'Limit sugary drinks',
      'Get regular sugar check-ups',
    ],
    treatment:
      'Diet, exercise, and oral medicines (e.g., metformin) or insulin. Check blood sugar as advised by your doctor.',
  },
  {
    id: 'arthritis',
    name: 'Arthritis',
    category: 'Bones & Joints',
    severity: 'Moderate',
    symptoms: ['Joint pain', 'Stiffness (worse in morning)', 'Swelling', 'Reduced movement'],
    causes: 'Wear and tear of joints (osteoarthritis) or immune system attacks (rheumatoid).',
    prevention: [
      'Stay active with low-impact exercise',
      'Maintain healthy weight',
      'Protect joints from injury',
      'Eat anti-inflammatory foods',
    ],
    treatment:
      'Pain relievers, anti-inflammatory medicines, physiotherapy, warm compresses, and joint-friendly activity. Severe cases may need surgery.',
  },
  {
    id: 'cold',
    name: 'Common Cold & Flu',
    category: 'Respiratory',
    severity: 'Low',
    symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Mild fever', 'Body aches (flu)'],
    causes: 'Viral infection, spread through droplets from coughs and sneezes.',
    prevention: [
      'Wash hands often',
      'Get yearly flu vaccine',
      'Avoid touching face',
      'Stay away from sick people',
    ],
    treatment:
      'Rest, warm fluids, steam, and over-the-counter relief. See a doctor for high fever, breathing trouble, or symptoms lasting over 10 days.',
  },
  {
    id: 'cholesterol',
    name: 'High Cholesterol',
    category: 'Heart & Circulation',
    severity: 'Moderate',
    symptoms: ['Usually no symptoms until complications', 'Detected via blood test'],
    causes: 'Poor diet (saturated fats), lack of exercise, smoking, family history.',
    prevention: [
      'Eat more fiber and healthy fats',
      'Limit fried and fatty foods',
      'Exercise regularly',
      'Quit smoking',
    ],
    treatment:
      'Lifestyle changes plus statins or other medicines as prescribed. Have cholesterol checked yearly.',
  },
  {
    id: 'copd',
    name: 'COPD (Lung Disease)',
    category: 'Respiratory',
    severity: 'High',
    symptoms: ['Chronic cough', 'Shortness of breath', 'Wheezing', 'Chest tightness'],
    causes: 'Long-term exposure to smoke, pollution, or dust, common in long-term smokers.',
    prevention: ['Quit smoking', 'Avoid air pollution', 'Use protective masks', 'Stay active'],
    treatment:
      'Inhalers, medicines, pulmonary rehab, and oxygen therapy. Avoid smoke and infections. See a doctor for breathing problems.',
  },
  {
    id: 'osteoporosis',
    name: 'Osteoporosis (Weak Bones)',
    category: 'Bones & Joints',
    severity: 'Moderate',
    symptoms: ['Often silent until a fracture', 'Loss of height', 'Back pain', 'Stooped posture'],
    causes: 'Bone loss with age, low calcium/vitamin D, and menopause.',
    prevention: [
      'Calcium-rich foods (milk, leafy greens)',
      'Vitamin D (sunlight, supplements)',
      'Weight-bearing exercise',
      'Avoid smoking and excess alcohol',
    ],
    treatment:
      'Calcium and vitamin D supplements, bone-strengthening medicines, and fall prevention to avoid fractures.',
  },
  {
    id: 'depression',
    name: 'Depression in Seniors',
    category: 'Mental Health',
    severity: 'Moderate',
    symptoms: ['Persistent sadness', 'Loss of interest', 'Sleep changes', 'Fatigue', 'Withdrawal'],
    causes: 'Life changes, chronic illness, isolation, loss of loved ones, and brain changes.',
    prevention: [
      'Stay socially active',
      'Regular exercise',
      'Talk about feelings',
      'Keep routines and hobbies',
    ],
    treatment:
      'Counseling, support groups, and antidepressant medicines if prescribed. Family support and staying connected are very important.',
  },
];