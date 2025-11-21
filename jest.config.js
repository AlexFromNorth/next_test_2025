const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // путь к твоему Next.js проекту
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // браузерное окружение для RTL
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // файл для глобальных расширений, например @testing-library/jest-dom
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // алиасы для импорта
    "^.+\\.(css|scss)$": "identity-obj-proxy", // игнор стилей
  },
};

module.exports = createJestConfig(customJestConfig);
