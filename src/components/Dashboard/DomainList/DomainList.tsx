import './DomainList.scss';
import { IDomainSearch } from "@/types/domain";
import { DomainItem } from "./DominItem";

interface IProps {
    domainList: Array<IDomainSearch>
}

export function DomainList({ domainList } : IProps) {
    return <div className="domain-list">
        {domainList.map(domain => {
            return <DomainItem key={domain.dname} domain={domain} />
        })}
    </div>
}