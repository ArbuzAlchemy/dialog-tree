declare module '*.jpg';
declare module '*.png';

type DialogNode = {
  id: number;
  text: string;
  top: number;
  left: number;
  next: {
    to: number;
    value: string;
  }[];
};
