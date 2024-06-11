// // import { render, screen, fireEvent } from "@testing-library/react";
// // import LogOutButton from "../../src/components/LogOutButton";

// // describe("LogOutButton", () => {
// //   test("Log out navigates user back to login screen, removes their token and userId", () => {
// //     const testLogOutButton = {_id: "logout-button"};
// //     render(<LogOutButton />);

// //     const logout = screen.getByText("Logout");
// //     fireEvent.click(logout);
// //     expect(logout.textContent).toBe("Login");
// //   })}); screen.getBy
// import { render, screen, fireEvent } from "@testing-library/react";
// import { HomePage } from "../../src/pages/Home/HomePage";
// import { vi } from "vitest";
// import { useNavigate } from "react-router-dom";

// // Mock the useNavigate hook from react-router-dom
// vi.mock("react-router-dom", () => {
//   const navigateMock = vi.fn();
//   return { useNavigate: () => navigateMock };
// });

// describe("LogOutButton", () => {
//   beforeEach(() => {
//     vi.spyOn(Storage.prototype, 'removeItem');
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   test("Log out button triggers logout function, removes token/userId, and navigates to login", async () => {
//     render(<HomePage />); // Render the HomePage component which includes the LogOutButton

//     const button = screen.getByRole("button", { name: "logout-button" }); // Look for button with name attribute
//     expect(button).toBeInTheDocument(); // Verify button is rendered

//     fireEvent.click(button); // Simulate click on the button

//     expect(localStorage.removeItem).toHaveBeenCalledTimes(2); // Check localStorage calls
//     expect(localStorage.removeItem).toHaveBeenCalledWith("token"); // Verify token removal
//     expect(localStorage.removeItem).toHaveBeenCalledWith("userId"); // Verify userId removal

//     const navigateMock = useNavigate();
//     expect(navigateMock).toHaveBeenCalledWith("/login");
//   });
// });
