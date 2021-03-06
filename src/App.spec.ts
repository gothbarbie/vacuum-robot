import App from "./App";

// Input
// First line - "n" number of expected inputs (int, length 0 <= 10 000)
// Second line - "x y" starting coordinates of robot (int, -100 000 <= 100 000)
// Third line - "h s" heading (string, "N", "E", "S", "W") and steps (int 0 < 100 000)

const mockNumberOfUnique = jest.fn();
const mockSetPosition = jest.fn();
const mockMoveRobot = jest.fn();

jest.mock("./Robot", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getNumberOfUniquePositionsCleaned: mockNumberOfUnique,
      setStartingPosition: mockSetPosition,
      moveRobot: mockMoveRobot
    };
  });
});

describe("App", () => {
  const app = new App();

  describe("parseForExpectedNumberOfCommands", () => {
    it("sets number of commands", () => {
      app.parseForExpectedNumberOfCommands("2");
      expect(app.numberOfCommands).toEqual(2);
    });
  });

  describe("parseForStartingPosition", () => {
    it("sets robot coordinates", () => {
      app.parseForStartingPosition("0, 0");
      expect(mockSetPosition).toHaveBeenCalledWith(0, 0);
    });
  });

  describe("parseForMovement", () => {
    it("tells robot to move", () => {
      app.parseForMovement("n 5");
      expect(mockMoveRobot).toHaveBeenCalledWith("n", 5);
    });
  });
});
