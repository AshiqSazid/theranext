import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import { fetchAnalytics } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const snapshot = fetchAnalytics()
  return <AnalyticsDashboard snapshot={snapshot} />
}
