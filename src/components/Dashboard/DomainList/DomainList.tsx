import './DomainList.scss';
import { IDomainSearch } from "@/types/domain";
import DomainItem from "./DominItem"

interface IProps {
    domainList: Array<IDomainSearch>,
    isLoad?: boolean
}

export default function DomainList({ domainList, isLoad } : IProps) {
    
    if(domainList.length > 0 && !isLoad) {
        return <div className="domain-list">
            {domainList.map(domain =>
                <DomainItem key={domain.dname} domain={domain} />
            )}
        </div>
    } else if(isLoad) {
        return <div className='domain-list'>
            {[1, 2, 3, 4, 5, 6].map((item) => 
                <DomainItem key={item} domain={undefined} />
            )}
        </div>
    }
}