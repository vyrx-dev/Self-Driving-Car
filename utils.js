// lerp stands for Linear Interpolation.
// It finds a value between two points (A and B) based on a percentage (t).
// For example, lerp(10, 20, 0.5) would return 15.
function lerp(A, B, t) {
  return A + (B - A) * t;
}

function getIntersection(A,B,C,D){
const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

if(bottom!=0){
    const t=tTop/bottom;
    const u=uTop/bottom;
    if(t>=0 && t<=1 && u>0 && u<=1){
        return {
            x:lerp(A.x,B.x,t),
            y:lerp(A.y,B.y,t),
            offset:t
        }
    }
}
    return null;
}
