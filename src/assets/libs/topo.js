


function inRange(x, y, points) {//边界检测-只能检测凸边形（检测点在不在多边形里面）
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

export function checkInRange(frameRect,itemRect) {
    var x = itemRect.x + itemRect.width / 2,
        y = itemRect.y + itemRect.height / 2;
    var points = [];
    points.push([frameRect.x,frameRect.y]);
    points.push([frameRect.x,frameRect.y + frameRect.height]);
    points.push([frameRect.x + frameRect.width,frameRect.y]);
    points.push([frameRect.x + frameRect.width,frameRect.y + frameRect.height]);
    return inRange(x,y,points);
}

export function checkInRect(frameRect,itemRect) {
    var x = itemRect.x + itemRect.width / 2,
        y = itemRect.y + itemRect.height / 2;
    if( x > frameRect.x && y > frameRect.y && x < (frameRect.x + frameRect.width) && y < (frameRect.y + frameRect.height))
        return true;
    else
        return false;    
}