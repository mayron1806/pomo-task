import { Priority } from "../enum/priority"

export type TaskItemType = {
    id: string
    complete: boolean
    name: string,
    priority: Priority,
    description?: string
}