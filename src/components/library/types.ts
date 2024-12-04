export interface Upload {
  id: number;
  title: string;
  date: string;
  duration: string;
  status: 'Transcribed' | 'Processing';
}