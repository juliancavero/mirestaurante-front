type HandleResponseComponentProps = {
  show: boolean;
  message: string;
};

export function HandleResponseComponent({
  show,
  message,
}: HandleResponseComponentProps) {
  if (!show) return null;
  return <h1>{message}</h1>;
}
