import * as colors from "../../../constants/colors";

type Props = {
  text: string;
  onClick?: () => void;
};

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "max-content",
        border: `1px solid ${colors.LIGHTER}`,
        borderRadius: "4px",
        padding: "0.25em 0.5em",
        color: colors.DARKER,
        background: "none",
        fontFamily: "sans-serif",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
