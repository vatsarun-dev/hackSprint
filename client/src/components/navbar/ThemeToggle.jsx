import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <Button variant="secondary" size="sm" onClick={toggle} className="rounded-full px-3">
      {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;



