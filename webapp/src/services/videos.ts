import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { VideosQuery, VideoResponse, SearchResponse } from './types'

const path = '/videos'

export async function getAll(query: VideosQuery): Promise<SearchResponse> {
    const queryString = qs.stringify(query, {
        addQueryPrefix: true
    })
    const response = await axios.get(`${path}/${queryString}`, {
        useToken: true
    } as AxiosRequestConfig<{
        useToken: boolean
    }>)
    return response.data
}

export async function get(videoId: string): Promise<VideoResponse> {
    const response = await axios.get(`${path}/${videoId}`, {
        useToken: true
    } as AxiosRequestConfig<{
        useToken: boolean
    }>)
    return response.data
}
