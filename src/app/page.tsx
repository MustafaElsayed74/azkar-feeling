import { HomeClient } from '@/components/HomeClient';
import {
  getAllFeelings,
  getFeelingsWithGroups,
  getSearchDuas,
} from '@/lib/data';

export default function HomePage() {
  const groups = getFeelingsWithGroups();
  const countBySlug = new Map(groups.map((group) => [group.slug, group.items_count]));
  const feelings = getAllFeelings().map((feeling) => ({
    ...feeling,
    arabic_name: feeling.arabic_name ?? feeling.feeling_name,
    count: countBySlug.get(feeling.feeling_slug) ?? 0,
  }));

  return <HomeClient feelings={feelings} searchDuas={getSearchDuas()} />;
}
