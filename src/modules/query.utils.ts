/**
 * Query utils
 */
import { Knex } from "knex";

export function applyDynamicFilters<T extends Record<string, unknown>>(
  query: Knex.QueryBuilder,
  filters: T | undefined,
  filterMapping: Record<string, string>,
): void {
  if (!filters) return;

  for (const [filterKey, dbField] of Object.entries(filterMapping)) {
    const filterValue = filters[filterKey as keyof T];
    if (filterValue !== undefined) {
      query.where(dbField, filterValue);
    }
  }
}
