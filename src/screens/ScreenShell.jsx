import GlobalStyles from "../components/GlobalStyles.jsx";
import StarField from "../components/StarField.jsx";

/** Common full-screen wrapper: global styles + starfield + centered content. */
export default function ScreenShell({ children, style }) {
  return (
    <>
      <GlobalStyles />
      <StarField />
      <div style={style}>{children}</div>
    </>
  );
}
