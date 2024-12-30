import { renderHook, act } from "@testing-library/react";
import { useDebouncedValue } from "../useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers to control setTimeout
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear all timers after each test
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("test", 500));
    expect(result.current).toBe("test");
  });

  it("should update the debounced value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: "test", delay: 500 } },
    );

    rerender({ value: "new value", delay: 500 });

    // Before delay
    expect(result.current).toBe("test");

    act(() => {
      jest.advanceTimersByTime(500); // Fast-forward timer
    });

    // After delay
    expect(result.current).toBe("new value");
  });

  it("should reset the timer if value changes before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: "test", delay: 500 } },
    );

    act(() => {
      jest.advanceTimersByTime(300); // Move timer forward but not complete
    });

    rerender({ value: "new value", delay: 500 }); // Change value before delay completes

    expect(result.current).toBe("test");

    act(() => {
      jest.advanceTimersByTime(500); // Complete the new timer
    });

    expect(result.current).toBe("new value");
  });

  it("should clean up the timeout on unmount", () => {
    const { unmount } = renderHook(() => useDebouncedValue("test", 500));

    unmount();

    // Ensure no timers are left
    expect(jest.getTimerCount()).toBe(0);
  });
});
