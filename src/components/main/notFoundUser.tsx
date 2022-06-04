import { useEffect, useState } from "react";

type NotFoundUserProps = {
  show: boolean;
  message: string;
};

export function NotFoundUser({ show, message }: NotFoundUserProps) {
  if (!show) return null;
  return <span className={"notfounderror"}>{message}</span>;
}
