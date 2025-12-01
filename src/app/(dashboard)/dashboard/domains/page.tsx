
import SearchDomen from "@/components/Dashboard/SearchDomen/SearchDomen"
import { DomainsTable } from "@/components/Dashboard"

export default function Page() {

    return <div className="dashboard-page">
        <h1 className="dashboard-page__title h1">Менеджер доменов</h1>   
        <SearchDomen />
        <DomainsTable />
    </div>
}