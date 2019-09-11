import { css } from "styled-components";
const sizes = {
  pad: 990,
  mobile: 450
};
// generate media query function
export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
