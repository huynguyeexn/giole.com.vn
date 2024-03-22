export const searchFormFields = {
  churchName: {
    min: 3,
    max: 50,
    regex: /^[\p{L}\p{M}\w ]+$/u,
  },
};
