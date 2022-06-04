type HandleResponseComponentProps = {
  show: boolean;
  message: string;
  color: string;
};

export function HandleResponseComponent({
  show,
  message,
  color,
}: HandleResponseComponentProps) {
  if (!show) return null;
  return <span className={color}>{message}</span>;
}
