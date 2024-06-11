import { render, screen, fireEvent } from "@testing-library/react";
import LogOutButton from "../../src/components/LogOutButton";
import { HomePage } from "../../src/pages/Home/HomePage";
import { vi } from "vitest";
import jest from 'jest';

// Mocking the getPosts service
vi.mock("../../src/pages/Home/HomePage", () => {
  const LogOutMock = vi.fn();
  return { LogOutButton: LogOutMock };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});
beforeEach(() => {
  vi.spyOn(Storage.prototype, 'removeItem');
});

afterEach(() => {
  vi.clearAllMocks();
});
describe("LogOutButton", () => {
  test("Log out button triggers logout function, removes token/userId, and navigates to login", () => {
    //const mockNavigate = jest.fn(); // Mock useNavigate function

    render(<HomePage />); // Render the LogOutButton component

    const button = screen.getByRole("button", { name: "logout-button"}); // Look for button with text (case-insensitive)
    expect(button).toBeInTheDocument(); // Verify button is rendered

    fireEvent.click(button); // Simulate click on the button

    expect(localStorage.removeItem).toHaveBeenCalledTimes(2); // Check localStorage calls
    expect(localStorage.removeItem).toHaveBeenCalledWith('token'); // Verify token removal
    expect(localStorage.removeItem).toHaveBeenCalledWith('userId'); // Verify userId removal

    const navigateMock = vi.mocked(useNavigate)();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
