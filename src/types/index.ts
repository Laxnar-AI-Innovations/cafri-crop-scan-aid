
export interface Detection {
  label: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
}

export interface DiagnosisResult {
  count: number;
  detections: Detection[];
  inference_ms: number;
}

export interface Diagnosis {
  id: string;
  imageUri: string;
  result?: DiagnosisResult;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  isProcessed: boolean;
}

export interface DiseaseInfo {
  id: string;
  disease: string;
  symptoms: {
    en: string;
    hi: string;
  };
  treatments: {
    en: string[];
    hi: string[];
  };
  images: string[];
}

export interface LocationState {
  from: {
    imageUri: string;
    result?: DiagnosisResult;
  };
}
