export default (data: string) => {
  navigator.clipboard.writeText(data);
};