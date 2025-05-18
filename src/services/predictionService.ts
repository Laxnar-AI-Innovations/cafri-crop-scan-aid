
import { DiagnosisResult } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cafri-crop-doctor.com';

export async function uploadImageForPrediction(imageData: string): Promise<DiagnosisResult> {
  try {
    // Remove base64 prefix if present
    const base64Data = imageData.split(',')[1] || imageData;
    
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Data
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image for prediction:', error);
    throw error;
  }
}
