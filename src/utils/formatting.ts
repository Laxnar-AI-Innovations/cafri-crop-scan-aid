
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDiseaseName = (name: string): string => {
  return name.replace('___', ' ');
};

export const formatLocation = (latitude: number, longitude: number): string => {
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
};
