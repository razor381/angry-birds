class Collision {
  static getCollisionStatsSchema() {
    return {
      isColliding: false,
      collisionDistance: 0,
      vectorLength: 0,
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

  static isColliding(shape1, shape2) {
    // if (shape1.isRound != shape2.isRound) return Collision.areCirclePolyColliding(shape1, shape2);
    // else if (!shape1.isRound && !shape2.isRound) return Collision.arePolyonsColliding(shape1, shape2);
    // else return Collision.areCirclesColliding(shape1, shape2);

    return Collision.areCirclesColliding(shape1, shape2);
  }

  static areCirclesColliding(shape1, shape2) {
    const collisionStats = Utils.copyObject(Collision.getCollisionStatsSchema());

    const center1 = shape1.getCenter();
    const center2 = shape2.getCenter();

    const radius1 = shape1.radius || shape1.width / 2;
    const radius2 = shape2.radius || shape2.width / 2;

    const distance = Point.getDistanceBetween(center1, center2);
    const combinedRadius = radius1 + radius2;

    if (distance <= combinedRadius) {
      collisionStats.isColliding = true;
      collisionStats.collisionDistance = combinedRadius - distance;

      collisionStats.shape1.collisionPoint = new Point(
        (center2.x - center1.x) / distance * radius1,
        (center2.y - center1.y) / distance * radius1,
      );

      collisionStats.shape2.collisionPoint = new Point(
        (center1.x - center2.x) / distance * radius2,
        (center1.y - center2.y) / distance * radius2,
      );

      const reactionVector1 = new Vector(
        (center2.x - center1.x) - collisionStats.shape1.collisionPoint.x + collisionStats.shape2.collisionPoint.x,
        (center2.y - center1.y) - collisionStats.shape1.collisionPoint.y + collisionStats.shape2.collisionPoint.y,
      );

      const reactionVector2 = new Vector(
        (center1.x - center2.x) - collisionStats.shape2.collisionPoint.x + collisionStats.shape1.collisionPoint.x,
        (center1.y - center2.y) - collisionStats.shape2.collisionPoint.y + collisionStats.shape1.collisionPoint.y,
      );

      const combinedMass = shape1.mass + shape2.mass;
      // const combinedMass = Math.max(shape1.mass, shape2.mass);

      const effectiveMass1 = shape1.mass / combinedMass;
      const effectiveMass2 = shape2.mass / combinedMass;

      // collisionStats.shape1.reactionVector = Vector.divideVector(reactionVector1, effectiveMass1);
      // collisionStats.shape2.reactionVector = Vector.divideVector(reactionVector2, effectiveMass2);

      collisionStats.shape1.reactionVector = reactionVector1;
      collisionStats.shape2.reactionVector = reactionVector2;
    }

    return collisionStats;
  }

  static swapCollisionStats(stats) {
    const temp = Utils.copyObject(stats.shape1);
    stats.shape1 = Utils.copyObject(stats.shape2);
    stats.shape2 = Utils.copyObject(temp);
    return Utils.copyObject(stats);
  }

  static areCirclePolyColliding(shape1, shape2) {
    const shouldSwapShapes = shape1.isRound;

    const poly = shouldSwapShapes ? shape2 : shape1;
    const circle = shouldSwapShapes ? shape1 : shape2;

    const polyPoints = poly.getVertices();
    const positionDifference = circle.getCenter();

    const collisionStats = Collision.areCollidingOnAxesWithCircle(
      polyPoints,
      circle.radius,
      positionDifference,
    );

    return shouldSwapShapes ? Collision.swapCollisionStats(collisionStats) : collisionStats;
  }

  static arePolyonsColliding(poly1, poly2) {
    // const positionDifference = Collision.getPositionDifference(poly1, poly2);
    const positionDifference = Point.getOrigin();
    let collisionStats;

    // check circule collision first
    const poly1Points = poly1.getVertices();
    const poly2Points = poly2.getVertices();

    // axes of first object
    collisionStats = Collision.areCollidingOnAxes(poly1Points, poly2Points, positionDifference);
    if (!collisionStats.isColliding) return collisionStats;
    // axes of second object
    collisionStats = Collision.areCollidingOnAxes(poly2Points, poly1Points, positionDifference);
    if (!collisionStats.isColliding) return collisionStats;

    return collisionStats;
  }

  static areCollidingOnAxes(points1, points2, positionDiff) {
    let collisionStats;

    for (let i = 0; i < points1.length; i++) {
      const j = (i + 1) % points1.length;
      const lineVector = Vector.getNormal(points1[i], points1[j]);

      collisionStats = Collision.isCollidesOnAxis(
        lineVector,
        points1,
        points2,
        positionDiff,
      );

      if (!collisionStats.isColliding) return collisionStats;
    }

    return collisionStats;
  }

  static getProjectedCollisionObj(points, lineVector) {
    /*
      PROJECTION_VECTORS_SCHEMA = {
        min: {
          value: Number.MAX_VALUE,
          point: 0,
        },
        max: {
          value: -Number.MAX_VALUE,
          point: 0,
        },
        distances: [],
      }
    */
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

  static getProjectedPointOnLine(point, vector) {
    const dotProduct = (point.x * vector.x + point.y * vector.y);
    const magnitude = (vector.x * vector.x + vector.y * vector.y);
    const fraction = dotProduct / magnitude;

    return new Vector(fraction * vector.x, fraction * vector.y);
  }

  static getPositionDifference(shape1, shape2) {
    return Point.subtract(shape2.getCenter(), shape1.getCenter());
  }

  static adjustPositionDiff(points, positionDifference) {
    return points.map((point) => Point.add(point, positionDifference));
  }

  static isCollidesOnAxis(lineVector, points1, points2, positionDifference) {
    const collisionStats = Utils.copyObject(Collision.getCollisionStatsSchema());

    const obj1 = Collision.getProjectedCollisionObj(points1, lineVector);
    const obj2 = Collision.getProjectedCollisionObj(points2, lineVector);

    if (obj1.max.value <= obj2.min.value || obj2.max.value <= obj1.min.value) {
      return collisionStats;
    } else {
      collisionStats.isColliding = true;
      collisionStats.collisionDistance = Math.min(
        Math.abs(obj1.max.value - obj2.min.value),
        Math.abs(obj1.min.value - obj2.max.value)
      );

      collisionStats.vectorLength = lineVector.getMagnitude();

      if (Math.abs(obj1.max.value - obj2.min.value) < Math.abs(obj1.min.value - obj2.max.value)) {



        // for polygon 1
        let minDistanceToOtherObj = Number.MAX_VALUE;
        let noObj1LinePoints = 0;
        let noObj2LinePoints = 0;
        let closestObj1Point;
        let closestObj2Point;

        points1.forEach((point, i) => {
          if (Math.abs(obj1.distances[i] - obj1.distances[obj1.max.point]) < 0.01) {
            const distanceToOtherObj = Vector
              .subtract(positionDifference, point)
              .getMagnitude();

            if (minDistanceToOtherObj > distanceToOtherObj) {
              minDistanceToOtherObj = distanceToOtherObj;
              closestObj1Point = point;
            }

            noObj1LinePoints++;
          }
        });

        // for polygon 2
        minDistanceToOtherObj = Number.MAX_VALUE;

        points2.forEach((point, i) => {
          if (Math.abs(obj2.distances[i] - obj2.distances[obj2.min.point]) < 0.01) {
            const distanceToOtherObj = Vector
              .add(positionDifference, point)
              .getMagnitude();

            if (minDistanceToOtherObj > distanceToOtherObj) {
              minDistanceToOtherObj = distanceToOtherObj;
              closestObj2Point = point;
            }

            noObj2LinePoints++;
          }
        });

        if (noObj1LinePoints == 1 && noObj2LinePoints > 1) {
          collisionStats.shape1.collisionPoint = points1[obj1.max.point];
          collisionStats.shape1.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape1.reactionVector,
            collisionStats.shape1.collisionPoint
          ) > 0) {
            collisionStats.shape1.reactionVector = Vector.multiplyVector(
              collisionStats.shape1.reactionVector,
              -1,
            );
          }

          collisionStats.shape2.collisionPoint = Point.add(
            Point.subtract(
              positionDifference,
              collisionStats.shape1.collisionPoint,
            ),
            collisionStats.shape1.reactionVector,
          );

          collisionStats.shape2.reactionVector = Vector.multiplyVector(
            collisionStats.shape1.reactionVector,
            -1,
          )
        }

        if (noObj1LinePoints > 1 && noObj2LinePoints == 1) {
          collisionStats.shape2.collisionPoint = points1[obj2.min.point];
          collisionStats.shape2.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape2.reactionVector,
            collisionStats.shape2.collisionPoint
          ) > 0) {
            collisionStats.shape2.reactionVector = Vector.multiplyVector(
              collisionStats.shape2.reactionVector,
              -1,
            );
          }

          collisionStats.shape1.collisionPoint = Point.add(
            Point.add(
              collisionStats.shape2.collisionPoint,
              positionDifference,
            ),
            collisionStats.shape2.reactionVector,
          );

          collisionStats.shape1.reactionVector = Vector.multiplyVector(
            collisionStats.shape2.reactionVector,
            -1,
          )
        }

        if (noObj1LinePoints > 1 && noObj2LinePoints > 1) {
          collisionStats.shape1.collisionPoint = closestObj1Point;
          collisionStats.shape1.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape1.reactionVector,
            collisionStats.shape1.collisionPoint
          ) > 0) {
            collisionStats.shape1.reactionVector = Vector.multiplyVector(
              collisionStats.shape1.reactionVector,
              -1,
            );
          }

          collisionStats.shape2.collisionPoint = closestObj2Point;
          collisionStats.shape2.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape2.reactionVector,
            collisionStats.shape2.collisionPoint
          ) > 0) {
            collisionStats.shape2.reactionVector = Vector.multiplyVector(
              collisionStats.shape2.reactionVector,
              -1,
            );
          }
        }



      } else {



        // for polygon 1
        let minDistanceToOtherObj = Number.MAX_VALUE;
        let noObj1LinePoints = 0;
        let closestObj1Point;

        points1.forEach((point, i) => {
          if (Math.abs(obj1.distances[i] - obj1.distances[obj1.min.point]) < 0.01) {
            const distanceToOtherObj = Vector
              .subtract(positionDifference, point)
              .getMagnitude();

            if (minDistanceToOtherObj > distanceToOtherObj) {
              minDistanceToOtherObj = distanceToOtherObj;
              closestObj1Point = point;
            }

            noObj1LinePoints++;
          }
        });

        // for polygon 2
        minDistanceToOtherObj = Number.MAX_VALUE;
        let noObj2LinePoints = 0;
        let closestObj2Point;

        points2.forEach((point, i) => {
          if (Math.abs(obj2.distances[i] - obj2.distances[obj2.max.point]) < 0.01) {
            const distanceToOtherObj = Vector
              .add(positionDifference, point)
              .getMagnitude();

            if (minDistanceToOtherObj > distanceToOtherObj) {
              minDistanceToOtherObj = distanceToOtherObj;
              closestObj2Point = point;
            }

            noObj2LinePoints++;
          }
        });

        if (noObj1LinePoints == 1 && noObj2LinePoints > 1) {
          collisionStats.shape1.collisionPoint = points1[obj1.min.point];
          collisionStats.shape1.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape1.reactionVector,
            collisionStats.shape1.collisionPoint
          ) > 0) {
            collisionStats.shape1.reactionVector = Vector.multiplyVector(
              collisionStats.shape1.reactionVector,
              -1,
            );
          }

          collisionStats.shape2.collisionPoint = Point.add(
            Point.subtract(
              positionDifference,
              collisionStats.shape1.collisionPoint,
            ),
            collisionStats.shape1.reactionVector,
          );

          collisionStats.shape2.reactionVector = Vector.multiplyVector(
            collisionStats.shape1.reactionVector,
            -1,
          )
        }

        if (noObj1LinePoints > 1 && noObj2LinePoints == 1) {
          collisionStats.shape2.collisionPoint = points1[obj2.max.point];
          collisionStats.shape2.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape2.reactionVector,
            collisionStats.shape2.collisionPoint
          ) > 0) {
            collisionStats.shape2.reactionVector = Vector.multiplyVector(
              collisionStats.shape2.reactionVector,
              -1,
            );
          }

          collisionStats.shape1.collisionPoint = Point.add(
            Point.add(
              collisionStats.shape2.collisionPoint,
              positionDifference,
            ),
            collisionStats.shape2.reactionVector,
          );

          collisionStats.shape1.reactionVector = Vector.multiplyVector(
            collisionStats.shape2.reactionVector,
            -1,
          )
        }

        if (noObj1LinePoints > 1 && noObj2LinePoints > 1) {
          collisionStats.shape1.collisionPoint = closestObj1Point;
          collisionStats.shape1.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape1.reactionVector,
            collisionStats.shape1.collisionPoint
          ) < 0) {
            collisionStats.shape1.reactionVector = Vector.multiplyVector(
              collisionStats.shape1.reactionVector,
              -1,
            );
          }

          collisionStats.shape2.collisionPoint = closestObj2Point;
          collisionStats.shape2.reactionVector = new Vector(
            lineVector.x / collisionStats.vectorLength * collisionStats.collisionDistance,
            lineVector.y / collisionStats.vectorLength * collisionStats.collisionDistance,
          );

          if (Vector.getDotProduct(
            collisionStats.shape2.reactionVector,
            collisionStats.shape2.collisionPoint
          ) < 0) {
            collisionStats.shape2.reactionVector = Vector.multiplyVector(
              collisionStats.shape2.reactionVector,
              -1,
            );
          }
        }



      }

      return collisionStats;
    }
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
    const collisionStats = Collision.getCollisionStatsSchema();

    const obj1 = Collision.getProjectedCollisionObj(points, lineVector);
    const obj2 = Collision.getProjectedCollisionObjCircle(positionDifference, lineVector, radius);

    const noCollision = obj1.max.value < obj2.min.value || obj2.max.value < obj1.min.value;

    if (noCollision) {
      return collisionStats;
    }

    const vectorLength = lineVector.getMagnitude();
    const coll = new Point(
      lineVector.x / vectorLength * radius,
      lineVector.y / vectorLength * radius,
    );

    if (Vector.getDotProduct(positionDifference, coll) > 0) {
      coll.x = -coll.y;
      coll.y = -coll.x;
    }

    collisionStats.isColliding = true;
    collisionStats.collisionDistance = Math.min(
      Math.abs(obj1.max.value - obj2.min.value),
      Math.abs(obj1.min.value - obj2.max.value),
    );

    collisionStats.shape2.collisionPoint = coll;
    collisionStats.shape2.reactionVector = new Vector(
      lineVector.x / vectorLength * collisionStats.collisionDistance,
      lineVector.y / vectorLength * collisionStats.collisionDistance,
    );

    if (Vector.getDotProduct(
      collisionStats.shape2.reactionVector,
      Point.subtract(positionDifference, coll)
    ) > 0) {
      collisionStats.shape2.reactionVector = Vector.multiplyVector(
        collisionStats.shape2.reactionVector,
        -1,
      );
    }

    collisionStats.shape1.collisionPoint = Point.add(
      Point.add(coll, positionDifference),
      collisionStats.shape2.reactionVector,
    );

    collisionStats.shape1.reactionVector = Vector.multiplyVector(
      collisionStats.shape2.reactionVector,
      -1,
    );

    return collisionStats;
  }

  static areCollidingOnAxesWithCircle(points, radius, positionDifference) {
    let closest;
    let minCollisionStats = Collision.getCollisionStatsSchema;
    let minDistance = Number.MAX_VALUE;

    // for poly
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      const lineVector = Vector.getNormal(points[i], points[j]);

      const collisionStats = Collision.isCollidesOnAxisWithCircle(
        lineVector,
        points,
        radius,
        positionDifference,
      );

      if (!collisionStats.isColliding) {
        return collisionStats;
      }

      if (
        !minCollisionStats.isColliding
        || minCollisionStats.collisionDistance > collisionStats.collisionDistance
      ) {
        minCollisionStats = collisionStats;
      }

      const distance = Point.getDistanceBetween(points[i], positionDifference);
      if (distance < minDistance) {
        minDistance = distance;
        closest = points[i];
      }
    }

      // for circle
    const circleLineVector = Vector.subtract(positionDifference, closest);

    const circleCollisionStats = Collision.isCollidesOnAxisWithCircle(
      circleLineVector,
      points,
      radius,
      positionDifference,
    );

    if (!circleCollisionStats.isColliding) {
      return circleCollisionStats;
    }

    if (
      !minCollisionStats.isColliding
      || minCollisionStats.collisionDistance > circleCollisionStats.collisionDistance
    ) {
      minCollisionStats = circleCollisionStats;
    }

    return minCollisionStats;
  }
}
