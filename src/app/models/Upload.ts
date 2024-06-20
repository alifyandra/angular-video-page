export default interface Upload {
  id: number;
  title: string;
  url: string;
  owner: string;
  size: number;
  createdAt: Date | string;
}
