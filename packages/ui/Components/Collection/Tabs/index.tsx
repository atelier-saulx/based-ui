import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useColor } from '@based/theme'
import { Title } from '../../Text/Title'
import { TabProps, TabSizes, TabsProps } from './types'

const Tab = ({ tab, onClick, activeTab, index, tabSizes }: TabProps) => {
  const isActive = activeTab === index
  return (
    <div
      style={{
        marginRight: 30,
        cursor: 'pointer',
        display: 'flex',
        position: 'relative',
        width: tabSizes ? tabSizes[index].width : null,
      }}
      onClick={useCallback(() => {
        onClick(tab, index)
      }, [tab])}
    >
      <Title
        // singleLine
        size="small"
        style={{
          marginLeft:
            isActive && tabSizes ? -tabSizes[index].width * 0.01 : null,
          fontWeight: isActive ? 650 : 500,
        }}
      >
        {tab.title}
      </Title>
    </div>
  )
}

export const Tabs = ({
  onChange,
  active,
  tabs = [],
  style,
  noBorder,
  indicatorMargin = 0,
  color = { color: 'primary' },
}: TabsProps) => {
  const [activeTab, setActive] = useState(active)
  const [tabSizes, setTabsizes] = useState<TabSizes>()
  const ref = useRef()

  const onClick = useCallback(
    (active, index) => {
      setActive(index)
      if (tabs[index].onClick) {
        tabs[index].onClick()
      }
      if (onChange) {
        global.requestAnimationFrame(() => {
          onChange(active, index)
        })
      }
    },
    [onChange]
  )

  useEffect(() => {
    global.requestAnimationFrame(() => {
      // TODO: ugly
      const children = (ref.current || ({} as any)).childNodes
      const tabSizes: TabSizes = []
      const xTop = (ref.current || ({} as any)).getBoundingClientRect().x
      for (let i = 0; i < children.length - 1; i++) {
        const { x, width } = children[i].getBoundingClientRect()
        tabSizes.push({
          width,
          x: x - xTop,
        })
      }
      setTabsizes(tabSizes)
    })
  }, [tabs, ref.current])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        position: 'relative',
        opacity: tabSizes ? 1 : 0,
        transition: 'opacity 0.1s',
        paddingBottom: noBorder ? null : 10,
        borderBottom: noBorder
          ? null
          : '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            tab={tab}
            onClick={onClick}
            activeTab={activeTab}
            index={index}
            tabSizes={tabSizes}
            indicatorMargin={indicatorMargin}
          />
        )
      })}
      <div
        style={{
          position: 'absolute',
          bottom: -1 * indicatorMargin,
          width: tabSizes ? tabSizes[activeTab].width * 1.05 : 0,
          left: 0,
          transition: 'width 0.25s, transform 0.2s ease-in-out',
          transform: `translate3d(${
            tabSizes ? tabSizes[activeTab].x : 0
          }px,0px,0px)`,
          height: 4,
          backgroundColor: useColor(color),
        }}
      />
    </div>
  )
}
