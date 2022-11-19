import { useState } from 'react'

export const useTableControls = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const hasSelection = Boolean(selected)

  return {
    selected,
    headerRadioProps: {
      isChecked: hasSelection,
      isDisabled: !hasSelection,
      onClick() {
        if (hasSelection) {
          setSelected(null)
        }
      }
    },
    getRowRadioProps(model_id: number, tenant_id: number) {
      const isChecked = `${tenant_id}/${model_id}` === selected

      return {
        isChecked,
        onClick() {
          if (isChecked) {
            setSelected(null)
          } else {
            setSelected(`${tenant_id}/${model_id}`)
          }
        }
      }
    }
  }
}
