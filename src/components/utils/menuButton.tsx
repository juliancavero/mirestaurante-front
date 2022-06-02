import "./menuButton.css";

type ButtonContent = {
  content: string;
  url: string;
};

export function MenuButton({ content, url }: ButtonContent) {
  function gotourl() {
    window.location.assign(url);
  }

  return (
    <button className="menuButton" onClick={gotourl}>
      {content}
    </button>
  );
}
