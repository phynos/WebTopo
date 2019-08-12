

//射线法-边界检测-只能检测凸边形（检测点在不在多边形里面）
function inRange(x, y, points) {
    // points表示多边形的顶点集合     
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        let xi = points[i][0],
            yi = points[i][1];
        let xj = points[j][0],
            yj = points[j][1];
        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect)
            inside = !inside;
    }
    return inside;
}

/**
 * 矩形边界检测-中心点判断法
 * @param {*} frameRect 
 * @param {*} itemRect 
 */
export function checkByPointInRect(frameRect,itemRect) {
    var x = itemRect.x + itemRect.width / 2,
        y = itemRect.y + itemRect.height / 2;
    if( x > frameRect.x && y > frameRect.y && x < (frameRect.x + frameRect.width) && y < (frameRect.y + frameRect.height))
        return true;
    else
        return false;    
}

/**
 * 矩形边界检测-碰撞检测法
 * 两个矩形中心点在x方向的距离的绝对值小于等于矩形宽度和的二分之一，同时y方向的距离的绝对值小于等于矩形高度和的二分之一
 * @param {*} frameRect 
 * @param {*} itemRect 
 */
export function checkByRectCollisionDetection(frameRect,itemRect) {
    var x1 = frameRect.x + frameRect.width / 2,
        y1 = frameRect.y + frameRect.height / 2,
        w1 = frameRect.width,
        h1 = frameRect.height;
    var x2 = itemRect.x + itemRect.width / 2,
        y2 = itemRect.y + itemRect.height / 2,
        w2 = itemRect.width,
        h2 = itemRect.height;
    if(Math.abs(x1 - x2) < ((w1 + w2) / 2) && Math.abs(y1 - y2) < ((h1 + h2) / 2)) 
        return true;
    else
        return false;
}