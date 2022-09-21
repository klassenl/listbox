import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../layouts/layout'
import { Option } from '../components/listbox/types'
import { subHeading, componentHeading, componentGrid } from '../styles/app.css'
import CheckboxGroup from '../components/checkbox-group/checkbox-group'
import CheckboxMenu from '../components/checkbox-menu/checkbox-menu'
import { DESSERTS } from '../fake-data'

const ListboxPage: NextPage = () => {
  const [multiSelection, setMultiSelection] = useState<Option<number>[]>([])
  const [singleSelection, setSingleSelection] = useState<
    Option<number> | undefined
  >()
  return (
    <Layout pageName="Checkboxes">
      <section>
        <h2 className={subHeading}>List</h2>
        <div className={componentGrid}>
          <div>
            <h3 className={componentHeading}>Single</h3>
            <CheckboxGroup<number>
              name="Select one dessert"
              allowUnselected
              selectType="single"
              options={DESSERTS}
              selectedValues={singleSelection ? [singleSelection] : []}
              handleSelect={(value) => {
                const newOption = DESSERTS.find(
                  (option) => option.value === value
                )
                setSingleSelection(newOption ? newOption : undefined)
              }}
            />
          </div>
          <div>
            <h3 className={componentHeading}>Multi</h3>
            <CheckboxGroup
              name="Select multiple desserts"
              allowUnselected
              selectType="multi"
              options={DESSERTS}
              selectedValues={multiSelection}
              handleSelect={(value) => {
                const newOption = DESSERTS.find(
                  (option) => option.value === value
                )
                if (newOption) {
                  setMultiSelection(
                    multiSelection?.length
                      ? [...multiSelection, newOption]
                      : [newOption]
                  )
                }
              }}
              handleDeselect={(value) => {
                const newValues = multiSelection
                  ? multiSelection.filter((option) => option.value !== value)
                  : []
                setMultiSelection(newValues)
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <h2 className={subHeading}>Menu</h2>
        <div className={componentGrid}>
          <div>
            <h3 className={componentHeading}>Single</h3>
            <CheckboxMenu<number>
              name="Select one dessert"
              buttonText="Dessert?"
              allowUnselected
              selectType="single"
              options={DESSERTS}
              selectedValues={singleSelection ? [singleSelection] : []}
              handleSelect={(value) => {
                const newOption = DESSERTS.find(
                  (option) => option.value === value
                )
                setSingleSelection(newOption ? newOption : undefined)
              }}
            />
          </div>
          <div>
            <h3 className={componentHeading}>Multi</h3>
            <CheckboxMenu<number>
              name="Select multiple desserts"
              buttonText="Desserts?"
              allowUnselected
              selectType="multi"
              options={DESSERTS}
              selectedValues={multiSelection}
              handleSelect={(value) => {
                const newOption = DESSERTS.find(
                  (option) => option.value === value
                )
                if (newOption) {
                  setMultiSelection(
                    multiSelection?.length
                      ? [...multiSelection, newOption]
                      : [newOption]
                  )
                }
              }}
              handleDeselect={(value) => {
                const newValues = multiSelection
                  ? multiSelection.filter((option) => option.value !== value)
                  : []
                setMultiSelection(newValues)
              }}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ListboxPage
