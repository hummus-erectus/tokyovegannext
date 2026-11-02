import {describe, it, expect} from "vitest";
import {skipImageOptimization} from "./remoteImages";

describe("skipImageOptimization", () => {
  it("optimizes local images and allowed https hosts", () => {
    expect(skipImageOptimization("/images/placeholder-movie.svg")).toBe(false);
    expect(skipImageOptimization("https://images.unsplash.com/photo-1?w=800")).toBe(false);
  });

  it("loads images from other hosts directly", () => {
    expect(skipImageOptimization("https://example.com/cover.jpg")).toBe(true);
    expect(skipImageOptimization("http://images.unsplash.com/photo-1")).toBe(true);
  });
});
