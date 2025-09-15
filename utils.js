// lerp stands for Linear Interpolation.
// It finds a value between two points (A and B) based on a percentage (t).
// For example, lerp(10, 20, 0.5) would return 15.
function lerp(A, B, t) {
  return A + (B - A) * t;
}
