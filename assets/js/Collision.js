class Collision {

  static getCollisionStatsSchema() {
    return {
      isColliding: false,
      collisionDistance: 0,
      shape1: {
        collisionPoint: Point.getOrigin(),
        reactionVector: Vector.getZeroVector(),
      },
      shape2: {
        collisionPoint: Point.getOrigin(),
        reactionVector: Vector.getZeroVector(),
      },
    };
  }

  static addCollisionDetection(objs) {
    for (let i = 0; i < objs.length; i++) {
      for (let j = 0; j < objs.length; j++) {
        if (i != j) {
          const collisionStats = Collision.isColliding(objs[i], objs[j]);

          if (collisionStats.isColliding) {
            objs[i].velocity = collisionStats.shape1.reactionVector;
            objs[j].velocity = collisionStats.shape2.reactionVector;
          }
        }
      }
    }
  }

  static isColliding(shape1, shape2) {
    if (shape1.isRound != shape2.isRound) return Collision.areCirclePolyColliding(shape1, shape2);
    else if (!shape1.isRound && !shape2.isRound) return Collision.arePolyonsColliding(shape1, shape2);
    else return Collision.areCirclesColliding(shape1, shape2);
  }

  static areCirclesColliding(circle1, circle2) {
    const collisionStats = Utils.copyObject(Collision.getCollisionStatsSchema());

    const center1 = circle1.getCenter();
    const center2 = circle2.getCenter();

    const distance = Point.getDistanceBetween(center1, center2);
    const combinedRadius = circle1.radius + circle2.radius;

    if (distance <= combinedRadius) {
      collisionStats.isColliding = true;
      collisionStats.collisionDistance = combinedRadius - distance;

      collisionStats.shape1.collisionPoint = new Point(
        (center2.x - center1.x) / distance * circle1.radius,
        (center2.y - center1.y) / distance * circle1.radius,
      );

      collisionStats.shape2.collisionPoint = new Point(
        (center1.x - center2.x) / distance * circle2.radius,
        (center1.y - center2.y) / distance * circle2.radius,
      );

      collisionStats.shape1.reactionVector = new Vector(
        (center2.x - center1.x) - collisionStats.shape1.collisionPoint.x + collisionStats.shape2.collisionPoint.x,
        (center2.y - center1.y) - collisionStats.shape1.collisionPoint.y + collisionStats.shape2.collisionPoint.y,
      );

      collisionStats.shape2.reactionVector = new Vector(
        (center1.x - center2.x) - collisionStats.shape2.collisionPoint.x + collisionStats.shape1.collisionPoint.x,
        (center1.y - center2.y) - collisionStats.shape2.collisionPoint.y + collisionStats.shape1.collisionPoint.y,
      );
    }

    return collisionStats;
  }

  static areCirclePolyColliding(shape1, shape2) {
    const collisionStats = Utils.copyObject(Collision.getCollisionStatsSchema());

    const circle = shape1.isRound ? shape1 : shape2;
    const poly = shape1.isRound ? shape2 : shape1;

    const polyPoints = poly.getVertices();
    const positionDifference = circle.getCenter();

    const isColliding = Collision.areCollidingOnAxesWithCircle(
      polyPoints,
      circle.radius,
      positionDifference,
    );

    if (!isColliding) return false;

    return true;
  }

  static arePolyonsColliding(poly1, poly2) {
    const collisionStats = Utils.copyObject(Collision.getCollisionStatsSchema());


    // const positionDifference = Collision.getPositionDifference(poly1, poly2);
    const positionDifference = Point.getOrigin();

    // check circule collision first
    const poly1Points = poly1.getVertices();
    const poly2Points = poly2.getVertices();

    // axes of first object
    const isColliding1 = Collision.areCollidingOnAxes(poly1Points, poly2Points, positionDifference);
    if (!isColliding1) return false;
    // axes of second object
    const isColliding2 = Collision.areCollidingOnAxes(poly2Points, poly1Points, positionDifference);
    if (!isColliding2) return false;

    return true;
  }

  static getProjectedPointOnLine(point, vector) {
    const dotProduct = (point.x * vector.x + point.y * vector.y);
    const magnitude = (vector.x * vector.x + vector.y * vector.y);
    const fraction = dotProduct / magnitude;

    return new Vector(fraction * vector.x, fraction * vector.y);
  }

  static getPositionDifference(shape1, shape2) {
    return Point.subtract(shape2.getCenter(), shape1.getCenter());
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

  /**
    PROJECTION_VECTORS_SCHEMA = {
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
    const polyObject = Utils.copyObject(PROJECTION_VECTORS_SCHEMA);

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
    const obj1 = Collision.getProjectedCollisionObj(points1, lineVector);
    const obj2 = Collision.getProjectedCollisionObj(points2, lineVector);

    return !(obj1.max.value <= obj2.min.value || obj2.max.value <= obj1.min.value);
  }

  static getProjectedCollisionObjCircle(positionDifference, lineVector, radius) {
    const polyObject = Utils.copyObject(PROJECTION_VECTORS_SCHEMA);

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
}
