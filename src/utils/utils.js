import { predefinedHues } from "../constants/constants";

const generateDistinctColors = (index) => {
  const hue = predefinedHues[index % predefinedHues.length];
  return `hsl(${hue}, 80%, 50%)`;
};

export const assignCategoryColors = (categories) => {
  const storedCategoryColors =
    JSON.parse(localStorage.getItem("categoryColors")) || {};

  const categoryColors = categories.reduce((acc, category, index) => {
    acc[category.name] =
      storedCategoryColors[category.name] || generateDistinctColors(index);
    return acc;
  }, {});

  localStorage.setItem("categoryColors", JSON.stringify(categoryColors));

  return categoryColors;
};
