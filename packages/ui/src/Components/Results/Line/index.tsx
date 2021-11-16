import React, { FunctionComponent, createContext } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Graph from './Graph'
import StackedGraph from './StackedGraph'
import { TextValue, TextFormat } from '../../../textParser'

type Data = { x: number; y: number }[]

type Context = { hover?: (key: string) => void }

const defaultContext: Context = {
  hover: () => {},
}

export const GraphContext = createContext(defaultContext)

GraphContext.displayName = 'GraphContext'

export type LineGraphProps = {
  data: { [key: string]: Data } | Data
  legend?: { [key: string]: TextValue }
  format?: 'date' | 'number' | 'date-time-human'
  valueFormat?: TextFormat
  spread?: boolean
  pure?: boolean
  label?: TextValue
}

const LineGraph: FunctionComponent<LineGraphProps> = ({
  data,
  label,
  spread = true,
  format = 'number',
  valueFormat = 'number-short',
  legend,
  pure,
}) => {
  const isStacked = data && typeof data === 'object' && !Array.isArray(data)

  return (
    <AutoSizer>
      {({ height, width }) => {
        return isStacked ? (
          <GraphContext.Provider value={{}}>
            <StackedGraph
              format={format}
              spread={spread}
              label={label}
              legend={legend}
              data={data}
              height={height}
              width={width}
              valueFormat={valueFormat}
            />
          </GraphContext.Provider>
        ) : (
          <Graph
            format={format}
            spread={spread}
            label={label}
            data={data}
            height={height}
            width={width}
            valueFormat={valueFormat}
            pure={pure}
          />
        )
      }}
    </AutoSizer>
  )
}

export { LineGraph }
