import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";


// Мокаем next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Мокаем next/link (иначе ошибка)
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

const mockStore = configureStore([thunk]);

describe("Header Component", () => {
  test("renders Home and About links", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, currentEmail: null },
      language: { current: "en" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test("shows Login button when user is NOT authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, currentEmail: null },
      language: { current: "en" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("shows email and Logout button when user IS authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, currentEmail: "test@mail.com" },
      language: { current: "en" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("test@mail.com")).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("calls logout function when Logout button is clicked", async () => {
    const mockPush = jest.fn();

    jest.mock("next/navigation", () => ({
      useRouter: () => ({
        push: mockPush,
      }),
    }));

    const store = mockStore({
      auth: { isAuthenticated: true, currentEmail: "test@mail.com" },
      language: { current: "en" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logoutBtn = screen.getByText(/Logout/i);

    fireEvent.click(logoutBtn);

    const actions = store.getActions();
    expect(actions[0].type).toBe("auth/logoutUser");
  });
});
