import { PaletteIcon } from "lucide-react";
import { cn } from "../../utils/classMerge";
import { useThemeStore } from "../../lib/store/theme.store";
import { THEMES } from "../../utils/constants";

const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme } = useThemeStore();
  return (
    <section className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-circle" tabIndex={0}>
        <PaletteIcon className="size-5" />
      </button>
      <div className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto">
        <div className="space-y-1">
          {THEMES.map((theme) => (
            <button
              className={cn(
                "w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-colors",
                currentTheme === theme.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              )}
              key={theme.name}
              onClick={() => setCurrentTheme(theme.name)}
            >
              <PaletteIcon className="" />
              <span className="text-sm font-medium">{theme.label}</span>
              <div className="ml-auto flex gap-1">
                {theme.colors.map((color: string, i: number) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeSelector;
