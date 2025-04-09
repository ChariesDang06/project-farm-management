import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

interface BreadcrumbManagerProps {
  setBreadcrumbItems: React.Dispatch<React.SetStateAction<{ name: string; url: string }[]>>;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  SIDEBAR_ITEMS: {
    text: string;
    url: string;
    subItems?: { text: string; url: string }[];
  }[];
}

const BreadcrumbManager: React.FC<BreadcrumbManagerProps> = ({
  setBreadcrumbItems,
  setActiveItem,
  SIDEBAR_ITEMS,
}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    const path = location.pathname;
    setActiveItem(path);

    const foundItem = SIDEBAR_ITEMS.find(
      (item) => item.url === path || item.subItems?.some((sub) => sub.url === path)
    );

    if (foundItem) {
      const selectedSub = foundItem.subItems?.find((sub) => sub.url === path);
      setBreadcrumbItems([
        { name: foundItem.text, url: foundItem.url },
        ...(selectedSub ? [{ name: selectedSub.text, url: selectedSub.url }] : []),
      ]);
    }
  }, [location.pathname]);

  return null;
};

export default BreadcrumbManager;
