
import { Diagnosis, DiseaseInfo } from '@/types';

// Mock diagnoses for history
export const mockDiagnoses: Diagnosis[] = [
  {
    id: '1',
    imageUri: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    result: {
      count: 1,
      detections: [
        {
          label: 'Wheat___Rust',
          confidence: 0.87,
          bbox: [14.2, 23.5, 611.6, 478.9]
        }
      ],
      inference_ms: 95
    },
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    location: {
      latitude: 25.4532,
      longitude: 78.5675
    },
    isProcessed: true
  },
  {
    id: '2',
    imageUri: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    result: {
      count: 1,
      detections: [
        {
          label: 'Mango___Powdery_Mildew',
          confidence: 0.92,
          bbox: [50.7, 100.2, 550.3, 420.8]
        }
      ],
      inference_ms: 87
    },
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    location: {
      latitude: 25.4498,
      longitude: 78.5701
    },
    isProcessed: true
  },
  {
    id: '3',
    imageUri: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    result: {
      count: 0,
      detections: [],
      inference_ms: 76
    },
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    location: {
      latitude: 25.4521,
      longitude: 78.5690
    },
    isProcessed: true
  }
];

// Mock disease information for knowledge base
export const mockDiseaseInfo: DiseaseInfo[] = [
  {
    id: '1',
    disease: 'Wheat___Rust',
    symptoms: {
      en: 'Orange-brown powdery pustules on leaves and stems that release spores when touched. Leaves may turn yellow and wither.',
      hi: 'पत्तियों और तनों पर नारंगी-भूरे रंग के पाउडर जैसे धब्बे जो छूने पर बीजाणु छोड़ते हैं। पत्तियां पीली पड़ सकती हैं और सूख सकती हैं।'
    },
    treatments: {
      en: [
        'Plant rust-resistant wheat varieties',
        'Apply fungicides at first signs of infection',
        'Rotate crops to break disease cycle',
        'Remove volunteer wheat plants',
        'Monitor fields regularly during humid conditions'
      ],
      hi: [
        'रस्ट प्रतिरोधी गेहूं की किस्में लगाएं',
        'संक्रमण के पहले लक्षणों पर फफूंदनाशक का छिड़काव करें',
        'फसल चक्र अपनाएं',
        'स्वयं उगे गेहूं के पौधों को हटा दें',
        'आद्र परिस्थितियों में नियमित रूप से खेतों की निगरानी करें'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86'
    ]
  },
  {
    id: '2',
    disease: 'Mango___Powdery_Mildew',
    symptoms: {
      en: 'White powdery coating on leaves, flowers and young fruits. Affected parts may distort and drop prematurely.',
      hi: 'पत्तियों, फूलों और छोटे फलों पर सफेद पाउडर जैसी परत। प्रभावित भाग विकृत हो सकते हैं और समय से पहले गिर सकते हैं।'
    },
    treatments: {
      en: [
        'Prune and destroy infected plant parts',
        'Apply sulfur-based fungicides preventatively',
        'Ensure proper spacing between trees for air circulation',
        'Avoid overhead irrigation',
        'Apply potassium bicarbonate sprays for organic management'
      ],
      hi: [
        'संक्रमित पौधे के हिस्सों को काटें और नष्ट करें',
        'निवारक के रूप में सल्फर-आधारित फफूंदनाशक लगाएं',
        'हवा के संचरण के लिए पेड़ों के बीच उचित दूरी सुनिश्चित करें',
        'ऊपर से सिंचाई से बचें',
        'जैविक प्रबंधन के लिए पोटेशियम बाइकार्बोनेट स्प्रे का प्रयोग करें'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027'
    ]
  },
  {
    id: '3',
    disease: 'Rice___Blast',
    symptoms: {
      en: 'Diamond-shaped lesions with gray centers and brown borders on leaves. White to gray-green lesions on panicles and nodes.',
      hi: 'पत्तियों पर भूरे किनारों के साथ धूसर केंद्र वाले हीरे के आकार के घाव। पैनिकल और नोड्स पर सफेद से धूसर-हरे रंग के घाव।'
    },
    treatments: {
      en: [
        'Plant resistant varieties',
        'Apply fungicides at early disease stages',
        'Balance nitrogen fertilization',
        'Maintain proper water management',
        'Treat seeds with fungicides before planting'
      ],
      hi: [
        'प्रतिरोधी किस्में लगाएं',
        'रोग के प्रारंभिक चरणों में फफूंदनाशक का छिड़काव करें',
        'नाइट्रोजन उर्वरक का संतुलित उपयोग करें',
        'उचित जल प्रबंधन बनाए रखें',
        'बुवाई से पहले बीजों को फफूंदनाशक से उपचारित करें'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027'
    ]
  }
];
