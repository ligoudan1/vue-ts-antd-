export interface RootState {
    version: string
}

export interface CommonState {
    collapsed?: boolean
}

export interface SettingState {
    multipage?: boolean,
    // 存储不需要keepalive的页面
    includeView: any[]
}