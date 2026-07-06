export interface Image {
  id: string;
  name: string;
  size: number;
  type: string;
  height: number;
  width: number;
  uri: string;
  resizedHeight?: number;
  resizedWidth?: number;
}