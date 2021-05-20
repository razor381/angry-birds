class Collision {
  static displayPoints = [];

  static isCircleCircleColliding(circle1, circle2) {
    const distance = Point.getDistanceBetween(circle1.position, circle2.position);
    const combinedRadius = circle1.radius + circle2.radius;

    return distance <= combinedRadius;
  }

  static getProjectedPointOnLine(point, vector) {
    const fraction = (point.x * vector.x + point.y * vector.y) / (vector.x * vector.x + vector.y * vector.y);

    const toReturn = new Vector(fraction * vector.x, fraction * vector.y);
    return toReturn;
  }

  static getRotatedPolyPoints(polygon) {
    if (polygon.oldAngle !== polygon.angle) {
      const rotatedPoints = [];

      polygon.getCorners().forEach((point) => {
        rotatedPoints.push(new Point(
          point.x * Math.cos(polygon.angle) - point.y * Math.sin(polygon.angle),
          point.x * Math.sin(polygon.angle) + point.y * Math.cos(polygon.angle),
        ));
      });
    }
  }

  static checkCollision(poly1, poly2) {
    const point1 = poly1.position;
    const point2 = poly2.position;

    Collision.displayPoints = [];

    // const positionDifference = new Vector(point2.x - point1.x, point2.y - point1.y);
    const positionDifference = Vector.getZeroVector();

    // check circule collision first
    // return false if no collision

    //get rotated points later
    const poly1Points = poly1.getCornerPoints();
    const poly2Points = poly2.getCornerPoints();


    // axes of first object
    for (let i = 0; i < poly1Points.length; i++) {
      const j = (i + 1) % poly1Points.length;

      const lineVector = new Vector(
        poly1Points[j].y - poly1Points[i].y,
        - poly1Points[j].x + poly1Points[i].x,
      );

      if (!Collision.collidesOnAxis(lineVector, poly1Points, poly2Points, positionDifference)) {
        return false;
      }
    }

    // axes of second object
    for (let i = 0; i < poly2Points.length; i++) {
      const j = (i + 1) % poly2Points.length;

      const lineVector = new Vector(
        poly2Points[j].y - poly2Points[i].y,
        - poly2Points[j].x + poly2Points[i].x,
      );

      if (!Collision.collidesOnAxis(lineVector, poly1Points, poly2Points, positionDifference)) {
        return false;
      }
    }

    return true;
  }

  static collidesOnAxis(lineVector, points1, points2, positionDifference) {
    /**
    SCHEMA = {
      min: {
        value: Number.MAX_VALUE,
        point: 0,
      },
      max: {
        value: Number.MIN_VALUE,
        point: 0,
      },
      distances: [],
    }
    */

    const obj1 = Utils.copyObject(COLLISION_OBJECT_SCHEMA);
    const obj2 = Utils.copyObject(COLLISION_OBJECT_SCHEMA);

    points1.forEach((point, i) => {
      const projected = Collision.getProjectedPointOnLine(point, lineVector);
      const direction = (projected.x + projected.y < 0) ? -1 : 1;
      const distanceOnLine = direction * projected.getMagnitude();

      Collision.displayPoints.push(projected);

      obj1.distances.push(distanceOnLine);

      if (obj1.min.value > distanceOnLine) {
        obj1.min.value = distanceOnLine;
        obj1.min.point = i;
      }

      if (obj1.max.value < distanceOnLine) {
        obj1.max.value = distanceOnLine;
        obj1.max.point = i;
      }
    });

    points2.forEach((point, i) => {
      const adjustedPoint = new Point(
        point.x + positionDifference.x,
        point.y + positionDifference.y,
      );

      Collision.displayPoints.push(adjustedPoint);

      const projected = Collision.getProjectedPointOnLine(adjustedPoint, lineVector);
      const direction = (projected.x + projected.y) < 0 ? -1 : 1;
      const distanceOnLine = direction * projected.getMagnitude();

      obj2.distances.push(distanceOnLine);

      if (obj2.min.value > distanceOnLine) {
        obj2.min.value = distanceOnLine;
        obj2.min.point = i;
      }

      if (obj2.max.value < distanceOnLine) {
        obj2.max.value = distanceOnLine;
        obj2.max.point = i;
      }
    });

    return !(obj1.max.value <= obj2.min.value || obj2.max.value <= obj1.min.value);
  }
}
