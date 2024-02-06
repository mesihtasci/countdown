import styles from "./Button.module.css";
import "../../index.css"

type ButtonProps = {
  ariaLabel?: string;
  onClick?: () => void;
  children?: React.ReactNode | string;
  tabIndex?: number;
};

const Button: React.FC<ButtonProps> = ({ ariaLabel, children, tabIndex, onClick }) => {
  return (
    <button
      tabIndex={tabIndex? tabIndex : 0}
      aria-label={ariaLabel}
      className={styles["button"]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
