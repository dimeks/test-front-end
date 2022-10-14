import React from 'react'
import { useSearchParams } from 'react-router-dom';
import qs from 'qs'

export default function useSearch() {
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [currentQueryParameters, setSearchParams] = useSearchParams();
    const newQueryParameters: URLSearchParams = new URLSearchParams();

    /**
     * OnChangeQuery
     */
    React.useEffect(() => {
        const query: { search?: string } = qs.parse(location.search, { ignoreQueryPrefix: true })
        setSearchValue(query.search || '')
    }, [location.search])

    /**
     * On submit
     */
    const search = (value: string) => {
        newQueryParameters.set('search', value)
        setSearchParams(newQueryParameters);
    }

    /**
     * On change
     */
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    /**
     * On submit
     */
    const onSearch = (e: React.FormEvent) => {
        e.preventDefault()
        search(searchValue)
    }

    return {
        search,
        setSearchValue,
        searchValue,
        onChangeValue,
        onSearch
    } as const
}