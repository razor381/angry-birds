class Collision {
  static displayPoints = [];

  static isColliding(shape1, shape2) {
    if (shape1.isRound != shape2.isRound) return Collision.areCirclePolyColliding(shape1, shape2);
    else if (!shape1.isRound && !shape2.isRound) return Collision.arePolyonsColliding(shape1, shape2);
  }

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

  static getPositionDifference(shape1, shape2) {
    return Point.subtract(shape2.position, shape1.position);
  }

  static areCollidingOnAxes(points1, points2, positionDiff) {
    for (let i = 0; i < points1.length; i++) {
      const j = (i + 1) % points1.length;

      const lineVector = Vector.getNormal(points1[i], points1[j]);

      const isCollide = Collision.isCollidesOnAxis(
        lineVector,
        points1,
        points2,
        positionDiff,
      );

      if (!isCollide) return false;
    }

    return true;
  }

  static arePolyonsColliding(poly1, poly2) {

    // const positionDifference = Collision.getPositionDifference(poly1, poly2);
    const positionDifference = Point.getOrigin();

    // check circule collision first
    //get rotated points later
    const poly1Points = poly1.getCornerPoints();
    const poly2Points = poly2.getCornerPoints();

    // axes of first object
    const isColliding1 = Collision.areCollidingOnAxes(poly1Points, poly2Points, positionDifference);
    if (!isColliding1) return false;
    // axes of second object
    const isColliding2 = Collision.areCollidingOnAxes(poly2Points, poly1Points, positionDifference);
    if (!isColliding2) return false;

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
  static getProjectedCollisionObj(points, lineVector) {
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

  static isCollidesOnAxis(lineVector, points1, points2, positionDifference) {
    // const adjustedPoints2 = Collision.adjustPositionDiff(points2, positionDifference)
    const obj1 = Collision.getProjectedCollisionObj(points1, lineVector);
    const obj2 = Collision.getProjectedCollisionObj(points2, lineVector);

    return !(obj1.max.value <= obj2.min.value || obj2.max.value <= obj1.min.value);
  }

  static getProjectedCollisionObjCircle(positionDifference, lineVector, radius) {
    const polyObject = Utils.copyObject(COLLISION_OBJECT_SCHEMA);

    const projected = Collision.getProjectedPointOnLine(positionDifference, lineVector);
    const direction = (projected.x + projected.y) < 0 ? -1 : 1;
    const distanceOnLine = direction * projected.getMagnitude();


    polyObject.min.value = distanceOnLine - radius;
    polyObject.max.value = distanceOnLine + radius;

    return polyObject;
  }

  static isCollidesOnAxisWithCircle(lineVector, points, radius, positionDifference) {

    const obj1 = Collision.getProjectedCollisionObj(points, lineVector);
    const obj2 = Collision.getProjectedCollisionObjCircle(positionDifference, lineVector, radius);

    return !(obj1.max.value <= obj2.min.value || obj2.max.value <= obj1.min.value);
  }

  static areCollidingOnAxesWithCircle(points, radius, positionDifference) {
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      const lineVector = Vector.getNormal(points[i], points[j]);


      const isCollide = Collision.isCollidesOnAxisWithCircle(
        lineVector,
        points,
        radius,
        positionDifference,
      );

      if (!isCollide) return false;
    }

    return true;
  }

  static areCirclePolyColliding(shape1, shape2) {
    const circle = shape1.isRound ? shape1 : shape2;
    const poly = shape1.isRound ? shape2 : shape1;

    const polyPoints = poly.getCornerPoints();
    // const positionDifference = Collision.getPositionDifference(circle, poly);
    const positionDifference = circle.position;


    const isColliding = Collision.areCollidingOnAxesWithCircle(
      polyPoints,
      circle.radius,
      positionDifference,
    );

    if (!isColliding) return false;

    return true;
  }
}
