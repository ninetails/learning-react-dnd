import PropTypes from 'prop-types'

const Column = ({ column }) => column.title

Column.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default Column
