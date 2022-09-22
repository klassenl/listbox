import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../layouts/layout'
import { Option } from '../components/listbox/types'
import {
  subHeading,
  componentHeading,
  componentGrid,
  inlineLabel
} from '../styles/app.css'
import Dropdown from '../components/dropdown/dropdown'
import { DESSERTS } from '../fake-data'

const DropdownPage: NextPage = () => {
  const [singleSelection, setSingleSelection] = useState<
    Option<number> | undefined
  >()
  return (
    <Layout pageName="Dropdowns">
      <section>
        <h2 className={subHeading}>Dropdown</h2>
        <div className={componentGrid}>
          <div>
            <h3 className={componentHeading}>Real select</h3>
            <label className={inlineLabel}>
              Select a dessert
              <select>
                {DESSERTS.map((dessert) => (
                  <option key={dessert.value} value={dessert.value}>
                    {dessert.content}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className={componentGrid}>
          <div>
            <h3 className={componentHeading}>Single</h3>
            <label className={inlineLabel}>
              Select a dessert
              <Dropdown
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
            </label>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default DropdownPage
