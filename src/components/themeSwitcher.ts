import { ThemeEnum } from "../constants/themeEnum";

export const themeSwitcher = () => {
  const firstTheme = document.querySelector("#first_toggle");
  const secondTheme = document.querySelector("#second_toggle");
  const thirdTheme = document.querySelector("#third_toggle");
  const container = document.querySelector(".container");

  firstTheme.addEventListener("click", () => {
    container.setAttribute("data-theme", ThemeEnum.Dark);
  });

  secondTheme.addEventListener("click", () => {
    container.setAttribute("data-theme", ThemeEnum.Semi);
  });

  thirdTheme.addEventListener("click", () => {
    container.setAttribute("data-theme", ThemeEnum.Light);
  });
};
