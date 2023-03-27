export type ChecklistItem = {
  id: number
  complete: boolean
  value: string
}

export type UpdateItemPayload = Partial<Omit<ChecklistItem, "id">>

export type ItemAddedCallback = () => void
export type ItemDeletedCallback = (id: number) => void
export type ItemUpdatedCallback = (
  id: number,
  payload: UpdateItemPayload,
) => void
