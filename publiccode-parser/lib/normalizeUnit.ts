// Normalize the unit name like the following:
// "數位發展部" => "數位發展部"
// "數位發展部 資訊處" => "數位發展部"
// "數位發展部 數位政府司" => "數位發展部"
export function normalizeUnit(unit: string): string {
  if (unit.startsWith("數位發展部")) {
    return "數位發展部";
  }
  return unit;
}