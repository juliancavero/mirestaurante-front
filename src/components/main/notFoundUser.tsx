type NotFoundUserProps = {
  show: boolean;
  message: string;
  success: boolean;
};

export function NotFoundUser({ show, message, success }: NotFoundUserProps) {
  if (!show) return null;
  if (success) return <span className={"notfounderror green"}>{message}</span>;
  return <span className={"notfounderror red"}>{message}</span>;
}
