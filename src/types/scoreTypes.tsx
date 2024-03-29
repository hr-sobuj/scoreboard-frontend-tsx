export interface ScoreType {
  _id: string;
  name: string;
  b4: number;
  b6: number;
  totalRun: number;
  totalBall: number;
  role: 'bat' | 'ball';
}