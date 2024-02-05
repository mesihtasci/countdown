type CountdownThemeProps = {
  children: JSX.Element | JSX.Element[];
};

const CountdownTheme = ({ children }: CountdownThemeProps) => {
  return <div>{children}</div>;
};

export default CountdownTheme;
