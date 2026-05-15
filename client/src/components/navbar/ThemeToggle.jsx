import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";

const ThemeToggle = ({ className }) => {
  const { theme, toggle } = useTheme();

  return (
    <Button variant="secondary" size="sm" onClick={toggle} className={cn("rounded-full px-3", className)}>
      {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;



