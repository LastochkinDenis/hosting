'use client';
import './DomainsTable.scss';
import {IDomain, IDomainTable, isIDomain} from '@/types/domain';
import { instance } from '@/lib/axios_settings';
import { GET_USER_DOMAINS } from '@/lib/api_endpoint';

import '@ant-design/v5-patch-for-react-19';
import { Table, TableProps, ConfigProvider, Input, InputRef } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import React, { useState, useRef, useEffect } from 'react';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];

const getStatusClass = (status: string) => {
    if (status === 'Активен') return <span className='domains-table__status item-successful' >{status}</span>;
    return <span className='domains-table__status item-error'>{status}</span>;
  };

  
export default function DomainsTable() {
  const [searchText, setSearchText] = useState<string>('');
  const [sizePage, setSizePage] = useState<number>(5);
  const refSearchInput = useRef<InputRef>(null);
  const [domains, setDomains] = useState<Array<IDomainTable>>([]);

  useEffect(() => {
    instance.get(GET_USER_DOMAINS)
    .then(response => {
      if(response.status == 200 && response.statusText == 'OK') {
        return response.data;
      }
      throw Error();
    })
    .then(data => {
      if(Array.isArray(data)) {
        setDomains(data.reduce((result: Array<IDomainTable>, item) => {

          if(isIDomain(item)) {
            result.push({
              key: item.id,
              domen: item.name,
              status: item.status == 'Активен' ? 'Активен' : 'Истек',
              expires: item.expires_at,
              settings: undefined
            })
          }

          return result;
        }, []));
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }, [])

  const onClickDNS = (data: IDomainTable) => {
    console.log(data);
  }

  const onClickAutorenew = (data: IDomainTable) => {
    console.log(data);
  }

  const onClickDelete = (data: IDomainTable) => {
    console.log(data);
  }

  const onClickSettings = (data: IDomainTable) => {
    console.log(data);
  }

  const onSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm']
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
  }

  const onReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  }

  const columns: ColumnsType<IDomainTable> = [
      {
        title: 'Домен',
        dataIndex: 'domen',
        filtered: true,
        width: '30%',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
          return <div className='domains-table__modal-serch'>
              <Input
                placeholder='Поиск по домену'
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => onSearch(selectedKeys as string[], confirm)}
              />
              <div className='domains-table__modal-serch-buttons'>
                <button className="btn mini"
                onClick={() => onSearch(selectedKeys as string[], confirm) }>Поиск</button>
                <button className="btn mini second"
                onClick={() => {
                  clearFilters && onReset(clearFilters);
                  onSearch(selectedKeys as string[], confirm)
                }}
                >Сбросить</button>
              </div>    
          </div>
        },
        onFilter: (value, record) => {
          return record
          .domen
          .toLocaleLowerCase()
          .includes(value.toLocaleString())
        },
        filterIcon: () => (<span className="material-symbols-outlined dashboard-header__icon">search</span>),
        filterDropdownProps: {
          onOpenChange(open) {
            if(open) {
              setTimeout(() => refSearchInput.current?.select(), 100)
            }
          },
        }
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        filters: [
          {text: 'Активен', value: 'активен'},
          {text: 'Истек', value: 'истек'},
        ],
        filterMultiple: false,
        filterIcon: () => (<span className="material-symbols-outlined dashboard-header__icon">filter_alt</span>),
        onFilter: (value, record) => {
          return record.status.toLocaleLowerCase().includes(value.toString().toLocaleLowerCase());
        },
        render: (status:string) => (getStatusClass(status))
      },
      {
        title: 'Истекает',
        dataIndex: 'expires',
        sorter: (a, b) => {
          const dataA:Date = new Date(a.expires);
          const dateB:Date = new Date(b.expires);
  
          if(dataA == dateB) return 0
          if(dataA > dateB) return 1
          return -1
        }
      },
      {
        title: 'Настройки',
        dataIndex: 'settings',
        width: '15%',
        render: (value: unknown, data:IDomainTable) => {
          return <div className='domains-table__settings'>
            <button className='domains-table__settings-btn' onClick={() => onClickDNS(data)}>
              <span className="material-symbols-outlined text-xl">dns</span>
            </button>
            <button className="domains-table__settings-btn" onClick={() => onClickAutorenew(data)}>
              <span className="material-symbols-outlined text-xl">autorenew</span>
            </button>
            <button className='domains-table__settings-btn' onClick={() => onClickDelete(data)}>
              <span className="material-symbols-outlined text-xl">move_item</span>
            </button>
            <button className='domains-table__settings-btn' onClick={() => onClickSettings(data)}>
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
          </div>
        }
      }
    ];
  

  return (
    <div className="domains-table">
      <div className="domains-table__header">
        <h3 className="domains-table__title">Домены</h3>
        <button className="domains-table__add-button">Добавить домен</button>
      </div>
      <div className="domains-table__wrapper">
        <ConfigProvider >
          <Table<IDomainTable>
            columns={columns}
            dataSource={domains}
            pagination={{
              pageSize: sizePage,
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              showSizeChanger: true,
              onShowSizeChange: (current, size) => {
                setSizePage(size);
              }
            }}
          />
        </ConfigProvider>
        {/* <table className="domains-table__table">
          <thead>
            <tr>
              <th className="domains-table__th">Домен</th>
              <th className="domains-table__th">Статус</th>
              <th className="domains-table__th">Истекает</th>
              <th className="domains-table__th domains-table__th--actions">Управление</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain) => (
              <tr key={domain.id} className="domains-table__row">
                <td className="domains-table__td domains-table__td--domain">
                  {domain.name}
                </td>
                <td className="domains-table__td">
                  <span className={`domains-table__status ${getStatusClass(domain.status)}`}>
                    {domain.status}
                  </span>
                </td>
                <td className="domains-table__td domains-table__td--date">
                  {domain.expires}
                </td>
                <td className="domains-table__td domains-table__td--actions">
                  <a className="domains-table__link" href="#">
                    {domain.status === 'Истек' ? 'Продлить' : 'Управлять'}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
