// Supermarket Store Grid & Indoor Navigation Engine using BFS / Dijkstra's Algorithm
// Scale: 1 Grid Unit = 1.5 meters

export const GRID_COLS = 10;
export const GRID_ROWS = 7;
export const CELL_SCALE_METERS = 1.5; // 1.5 meters per grid cell
export const AVG_WALK_SPEED_MPS = 1.1; // 1.1 meters/sec average indoor walk speed

// Define Store Landmark Waypoints
export const STORE_WAYPOINTS = [
  { id: 'entrance', name: 'Store Entrance (Main Gate)', x: 1, y: 6, type: 'start', zone: 'Entrance' },
  { id: 'billing_1', name: 'Billing Counter #1 (Express)', x: 6, y: 6, type: 'billing', zone: 'Checkout' },
  { id: 'billing_2', name: 'Billing Counter #2', x: 7, y: 6, type: 'billing', zone: 'Checkout' },
  { id: 'help_desk', name: 'Customer Help Desk & Lockers', x: 0, y: 6, type: 'service', zone: 'Entrance' },
  { id: 'aisle_1_front', name: 'Aisle 1 Front (Bakery & Breads)', x: 2, y: 5, type: 'aisle', zone: 'Aisle 1' },
  { id: 'aisle_2_front', name: 'Aisle 2 Front (Sauces & Cereals)', x: 4, y: 5, type: 'aisle', zone: 'Aisle 2' },
  { id: 'aisle_3_front', name: 'Aisle 3 Front (Staples & Grains)', x: 6, y: 5, type: 'aisle', zone: 'Aisle 3' },
  { id: 'aisle_4_front', name: 'Aisle 4 Front (Snacks & Namkeen)', x: 8, y: 5, type: 'aisle', zone: 'Aisle 4' },
  { id: 'chiller_zone', name: 'Chiller Zone (Dairy & Frozen)', x: 1, y: 1, type: 'chiller', zone: 'Chiller Zone' },
];

// Physical Shelf Obstacles (not walkable through)
// Format: x_y
export const SHELF_OBSTACLES = new Set([
  // Chiller wall along top
  '1_0', '2_0', '3_0', '4_0',
  // Aisle 1 Shelves (Bakery)
  '2_2', '2_4',
  // Aisle 2 Shelves (Sauces & Condiments)
  '4_2', '4_4',
  // Aisle 3 Shelves (Staples & Grains)
  '6_2', '6_4',
  // Aisle 4 Shelves (Snacks & Sweets)
  '8_2', '8_4',
  // Billing Counter blocks
  '5_6', '8_6'
]);

// Helper to check if a grid cell is walkable
export function isWalkable(x, y) {
  if (x < 0 || x >= GRID_COLS || y < 0 || y >= GRID_ROWS) return false;
  const key = `${x}_${y}`;
  return !SHELF_OBSTACLES.has(key);
}

// Find shortest walkable access point adjacent to a shelf coordinate
export function getAccessPointForShelf(shelfX, shelfY) {
  const directions = [
    { dx: 0, dy: 1 },  // below
    { dx: 0, dy: -1 }, // above
    { dx: 1, dy: 0 },  // right
    { dx: -1, dy: 0 }  // left
  ];

  for (const { dx, dy } of directions) {
    const nx = shelfX + dx;
    const ny = shelfY + dy;
    if (isWalkable(nx, ny)) {
      return { x: nx, y: ny };
    }
  }
  return { x: shelfX, y: shelfY };
}

// Breadth-First Search (BFS) / Dijkstra on 4-directional grid
export function findShortestPath(startX, startY, targetX, targetY) {
  // If target is an obstacle, route to its nearest access point
  const dest = isWalkable(targetX, targetY) 
    ? { x: targetX, y: targetY } 
    : getAccessPointForShelf(targetX, targetY);

  const startKey = `${startX}_${startY}`;
  const destKey = `${dest.x}_${dest.y}`;

  if (startKey === destKey) {
    return [{ x: startX, y: startY }];
  }

  const queue = [{ x: startX, y: startY }];
  const visited = new Set([startKey]);
  const parentMap = new Map();

  const moves = [
    { dx: 0, dy: -1 }, // North
    { dx: 0, dy: 1 },  // South
    { dx: 1, dy: 0 },  // East
    { dx: -1, dy: 0 }  // West
  ];

  let found = false;

  while (queue.length > 0) {
    const current = queue.shift();
    const currKey = `${current.x}_${current.y}`;

    if (currKey === destKey) {
      found = true;
      break;
    }

    for (const move of moves) {
      const nx = current.x + move.dx;
      const ny = current.y + move.dy;
      const nextKey = `${nx}_${ny}`;

      if (isWalkable(nx, ny) && !visited.has(nextKey)) {
        visited.add(nextKey);
        parentMap.set(nextKey, current);
        queue.push({ x: nx, y: ny });
      }
    }
  }

  if (!found) {
    return [{ x: startX, y: startY }];
  }

  // Reconstruct path
  const path = [];
  let curr = dest;
  while (curr) {
    path.push(curr);
    const key = `${curr.x}_${curr.y}`;
    curr = parentMap.get(key);
  }

  return path.reverse();
}

// Multi-Stop Path Planning (e.g. visiting multiple near-expiry items for clearance)
export function planMultiStopRoute(startPoint, productLocations) {
  if (!productLocations || productLocations.length === 0) {
    return { fullPath: [startPoint], stops: [], totalDistance: 0, walkTimeSec: 0, steps: [] };
  }

  // Greedy Nearest Neighbor to find visit order
  let currentPos = { ...startPoint };
  const remaining = [...productLocations];
  const orderedStops = [];
  let fullPath = [];
  let totalDistance = 0;

  while (remaining.length > 0) {
    let nearestIdx = 0;
    let shortestSubPath = null;
    let minLength = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const target = remaining[i];
      const subPath = findShortestPath(currentPos.x, currentPos.y, target.mapCoords.x, target.mapCoords.y);
      if (subPath.length < minLength) {
        minLength = subPath.length;
        nearestIdx = i;
        shortestSubPath = subPath;
      }
    }

    const chosen = remaining.splice(nearestIdx, 1)[0];
    orderedStops.push(chosen);

    // Append to full path without duplicating joining node
    if (fullPath.length > 0 && shortestSubPath.length > 0) {
      fullPath = fullPath.concat(shortestSubPath.slice(1));
    } else {
      fullPath = fullPath.concat(shortestSubPath);
    }

    totalDistance += (shortestSubPath.length - 1) * CELL_SCALE_METERS;
    currentPos = shortestSubPath[shortestSubPath.length - 1];
  }

  const walkTimeSec = Math.round(totalDistance / AVG_WALK_SPEED_MPS);
  const steps = generateStepDirections(fullPath, startPoint, orderedStops);

  return {
    fullPath,
    stops: orderedStops,
    totalDistance: Math.round(totalDistance * 10) / 10,
    walkTimeSec,
    steps
  };
}

// Generate natural English turn-by-turn directions from grid path
export function generateStepDirections(path, startPoint, destinationOrStops) {
  if (!path || path.length <= 1) {
    return ['You are already at the product location.'];
  }

  const directions = [];
  const startDesc = startPoint.name || 'your current starting location';
  directions.push(`Start at ${startDesc}.`);

  let currentDist = 0;
  let currentDir = null; // 'North', 'South', 'East', 'West'

  const getDirection = (p1, p2) => {
    if (p2.y < p1.y) return 'towards the Chiller Zone (North)';
    if (p2.y > p1.y) return 'towards the Checkout / Exit (South)';
    if (p2.x > p1.x) return 'towards Aisle 3 & 4 (East)';
    if (p2.x < p1.x) return 'towards Aisle 1 & Bakery (West)';
    return 'straight';
  };

  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];
    const dir = getDirection(p1, p2);

    if (currentDir === null) {
      currentDir = dir;
      currentDist = CELL_SCALE_METERS;
    } else if (currentDir === dir) {
      currentDist += CELL_SCALE_METERS;
    } else {
      directions.push(`Walk ${currentDist.toFixed(1)}m ${currentDir}.`);
      currentDir = dir;
      currentDist = CELL_SCALE_METERS;
    }
  }

  if (currentDist > 0) {
    directions.push(`Continue ${currentDist.toFixed(1)}m ${currentDir}.`);
  }

  if (Array.isArray(destinationOrStops)) {
    destinationOrStops.forEach((p, idx) => {
      directions.push(`Stop ${idx + 1}: Collect "${p.name}" at ${p.location || 'assigned shelf'}.`);
    });
  } else if (destinationOrStops) {
    directions.push(`Arrive at shelf: Locate "${destinationOrStops.name}" at ${destinationOrStops.location || 'designated shelf'}.`);
  }

  return directions;
}
