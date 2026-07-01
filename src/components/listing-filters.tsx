import { categories, conditions } from "@/lib/constants";

type ListingFiltersProps = {
  query?: string;
  category?: string;
  condition?: string;
  maxPrice?: string;
};

export function ListingFilters({ query, category, condition, maxPrice }: ListingFiltersProps) {
  return (
    <form className="glass-panel grid gap-4 rounded-[1rem] p-5 lg:grid-cols-[1.4fr_repeat(3,0.8fr)_auto]">
      <input className="field" defaultValue={query} name="query" placeholder="Search items, description, or seller" />

      <select className="field" defaultValue={category} name="category">
        <option value="">All categories</option>
        {categories.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select className="field" defaultValue={condition} name="condition">
        <option value="">All conditions</option>
        {conditions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <input
        className="field"
        defaultValue={maxPrice}
        min="0"
        name="maxPrice"
        placeholder="Max price"
        step="1"
        type="number"
      />

      <button className="cta-button rounded-xl px-5 py-3 font-semibold" type="submit">
        Apply
      </button>
    </form>
  );
}
