import PatientDatabaseView from '@/components/PatientDatabaseView'
import { fetchPatients } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function DatabasePage() {
  const patients = fetchPatients()
  return (
    <div className="space-y-8">
      <PatientDatabaseView records={patients} />
    </div>
  )
}
