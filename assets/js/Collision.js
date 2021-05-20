class Collision {
  static displayPoints = [];

  static areCirclesColliding(circle1, circle2) {
    const distance = Point.getDistanceBetween(circle1.position, circle2.position);
    const combinedRadius = circle1.radius + circle2.radius;

    return distance <= combinedRadius;
  }

  static getProjectedPointOnLine(point, vector) {
    const dotProduct = (point.x * vector.x + point.y * vector.y);
    const magnitude = (vector.x * vector.x + vector.y * vector.y);
    const fraction = dotProduct / magnitude;

    return new Vector(fraction * vector.x, fraction * vector.y);
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

  static getPositionDifference(poly1, poly2) {
    const point1 = poly1.position;
    const point2 = poly2.position;

    return Point.subtract(point1, point2);
  }

  static checkCollision(poly1, poly2) {

    Collision.displayPoints = [];

    // const positionDifference = Collision.getPositionDifference(poly1, poly2);
    const positionDifference = Point.getOrigin();

    // check circule collision first

    //get rotated points later
    const poly1Points = poly1.getCornerPoints();
    const poly2Points = poly2.getCornerPoints();

    // axes of first object
    for (let i = 0; i < poly1Points.length; i++) {
      const j = (i + 1) % poly1Points.length;

      const lineVector = Vector.getNormal(poly1Points[i], poly1Points[j]);

      if (!Collision.collidesOnAxis(lineVector, poly1Points, poly2Points, positionDifference)) {
        return false;
      }
    }

    // axes of second object
    for (let i = 0; i < poly2Points.length; i++) {
      const j = (i + 1) % poly2Points.length;

      const lineVector = Vector.getNormal(poly2Points[i], poly2Points[j]);

      if (!Collision.collidesOnAxis(lineVector, poly1Points, poly2Points, positionDifference)) {
        return false;
      }
    }

    return true;
  }

  /**
    COLLISION_OBJECT_SCHEMA = {
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
  static projectAndCheckOverlap(points, lineVector) {
    const polyObject = Utils.copyObject(COLLISION_OBJECT_SCHEMA);

    points.forEach((point, i) => {
      const projected = Collision.getProjectedPointOnLine(point, lineVector);
      const direction = (projected.x + projected.y) < 0 ? -1 : 1;
      const distanceOnLine = direction * projected.getMagnitude();

      polyObject.distances.push(distanceOnLine);

      if (polyObject.min.value > distanceOnLine) {
        polyObject.min.value = distanceOnLine;
        polyObject.min.point = i;
      }

      if (polyObject.max.value < distanceOnLine) {
        polyObject.max.value = distanceOnLine;
        polyObject.max.point = i;
      }
    });

    return polyObject;
  }

  static adjustPositionDiff(points, positionDifference) {
    return points.map((point) => Point.add(point, positionDifference));
  }

  static collidesOnAxis(lineVector, points1, points2, positionDifference) {
    // const adjustedPoints2 = Collision.adjustPositionDiff(points2, positionDifference)
    const obj1 = Collision.projectAndCheckOverlap(points1, lineVector);
    const obj2 = Collision.projectAndCheckOverlap(points2, lineVector);

    return !(obj1.max.value <= obj2.min.value || obj2.max.value <= obj1.min.value);
  }
}
