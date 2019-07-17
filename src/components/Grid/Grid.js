import PropTypes from 'prop-types'
import styled from 'styled-components'

const autoRows = ({ minRowHeight = '20px' }) => `minmax(${minRowHeight}, auto)`

const frGetter = value => (typeof value === 'number' ? `repeat(${value}, 1fr)` : value)

const gap = ({ gapValue = '8px' }) => gapValue

const flow = ({ flowValue = 'row' }) => flowValue

const formatAreas = areas => areas.map(area => `"${area}"`).join(' ')

const Grid = styled.div`
  display: grid;
  height: ${({ height = 'auto' }) => height};
  grid-auto-flow: ${flow};
  grid-auto-rows: ${autoRows};
  ${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
  grid-template-columns: ${({ columns = 12 }) => frGetter(columns)};
  grid-gap: ${gap};
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
  ${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
`

Grid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gap: PropTypes.string,
  columnGap: PropTypes.string,
  rowGap: PropTypes.string,
  height: PropTypes.string,
  minRowHeight: PropTypes.string,
  flow: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  areas: PropTypes.arrayOf(PropTypes.string),
  justifyContent: PropTypes.string,
  alignContent: PropTypes.string
}

export default Grid